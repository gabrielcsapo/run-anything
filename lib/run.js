const net = require('net');
const debug = require('debug')('run-anything');

const Application = require('./application');

class Run {
  constructor(applications, { port }={}) {
    this.applications = applications.map((application) => new Application(application));

    this.port = port;
  }
  start(callback) {
    const { applications } = this;

    this.server = net.createServer((socket) => {
      const address = socket.address();

      debug(`client connected at ${address.address} port ${address.port}`)
      socket.on('data', (data) => {
        debug(`client sent data from ${address.address} port ${address.port} - ${data.toString('utf8')}`);

        const input = data.toString('utf8');

        // TODO: reduce the overhead of going through the applications
        let found = applications.filter((application) => application.parse(input, socket));

        if(found.length == 0) {
          socket.write('command not found')
        }
      });
      socket.on('end', () => {
        debug(`client disconnected at ${address.address} port ${address.port}`)
      });
    }).on('error', (err) => {
      callback(err, null);
    }).listen(this.port || 0, (error) => {
      this.port = this.server.address().port;

      debug(`server started at ${this.server.address().address} on port ${this.server.address().port}`);

      callback(error);
    });
  }
  close() {
    if(this.server) {
      this.server.close();
    }
  }
}

module.exports = Run;

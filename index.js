const net = require('net');
const debug = require('debug')('run-anything');

const Application = require('./lib/application');
const parse = require('./lib/parse');

module.exports = (applications, callback) => {
    applications = applications.map((application) => Application(application));
    
    const server = net.createServer((socket) => {
        const address = socket.address();

        debug(`socket connected at ${address.address} port ${address.port}`)
        socket.on('data', (data) => {
            parse(applications, data, socket);
        });
        socket.on('end', () => {
            debug(`socket disconnected at ${address.address} port ${address.port}`)
        });
    }).on('error', (err) => {
      throw err;
    });

    return server.listen(() => {
      debug(`server opened at ${server.address().port}`);

      callback(server);
    });

}

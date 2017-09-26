const net = require('net');
const debug = require('debug')('run-anything');

const Application = require('./lib/application');
const { parseCommand } = require('./lib/util');

module.exports.State = function State(initialState) {
  let state = Object.assign(initialState, {});

  return {
    get: (key) => {
      return state[key];
    },
    set: (key, value) => {
      state[key] = value;
    },
    toString: () => {
      return JSON.stringify(state);
    }
  }
}

module.exports.Run = (applications, callback) => {
  applications = applications.map((application) => Application(application));

  const server = net.createServer((socket) => {
    const address = socket.address();

    debug(`socket connected at ${address.address} port ${address.port}`)
    socket.on('data', (data) => {
      let parsed = false;
      const input = data.toString('utf8');

      applications.forEach((application) => {
        Object.keys(application.commands).forEach((key) => {
          const command = application.commands[key];

          parseCommand(input, key, (error, func, paramaters) => {
            if(func && paramaters) {
              parsed = true;
              paramaters[0] = socket;
              command.apply(application, paramaters);
            }
          });
        });
      });
      if(!parsed) {
        socket.write('command not found')
      }
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

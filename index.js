const net = require('net');

module.exports = (applications, callback) => {

    const server = net.createServer((socket) => {
        socket.on('data', (data) => {
            const args = data.toString('utf8').trim().split(/[ ,|]+/)
            applications.forEach((application) => {
                application.commands.forEach((command) => {
                    const check = command.split(/[ ,|]+/);
                    const func = check[0];
                    if(func === args[0] && check.length === args.length) {
                        const paramaters = args.map((a) => a.replace('[', '').replace(']', ''));

                        paramaters[0] = socket;
                        application[func].apply(null, paramaters);
                    }
                });
            });
        });
        socket.on('end', () => {
          console.log('disconnected from server');
        });
    }).on('error', (err) => {
      throw err;
    });

    return server.listen(() => {
      console.log('opened server on', server.address());
      callback(server);
    });

}

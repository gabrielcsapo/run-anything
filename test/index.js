const test = require('tape');
const net = require('net');
const run = require('../index');

test('run-anything', (t) => {

    t.test('use as a module', (t) => {
        run([{
            name: 'lights',
            commands: {
                'on [id]': (socket, id) => {
                    socket.write(`turned on light ${id}`);
                },
                'off [id]': (socket, id) => {
                    socket.write(`turned off light ${id}`);
                },
                'list': (socket) => {
                    socket.write(`12356, 12357, 12341, 934123`);
                }
            }
        }], (server) => {
            const client = new net.Socket();
            client.connect(server.address().port, '127.0.0.1', () => {
            	client.write('on 12345');
            });

            client.on('data', (data) => {
            	t.equal(data.toString('utf8'), 'turned on light 12345');
                client.destroy();
                server.close();
            });

            client.on('close', () => {
                t.end();
            })
        });
    });

    t.test('use as a module using required modules', (t) => {
        run([
            require('./fixtures/lights.js')
        ], (server) => {
            const client = new net.Socket();
            client.connect(server.address().port, '127.0.0.1', () => {
            	client.write('on 12345');
            });

            client.on('data', (data) => {
            	t.equal(data.toString('utf8'), 'turned on light 12345');
                client.destroy();
                server.close();
            });

            client.on('close', () => {
                t.end();
            })
        });
    });

    t.test('test helper function on application (help)', (t) => {
        run([
            require('./fixtures/lights.js')
        ], (server) => {
            const client = new net.Socket();
            client.connect(server.address().port, '127.0.0.1', () => {
            	client.write('help');
            });

            client.on('data', (data) => {
                t.deepEqual(JSON.parse(data.toString()), ["on [id]","off [id]","list","help"]);
                client.destroy();
                server.close();
            });

            client.on('close', () => {
                t.end();
            })
        });
    });

});

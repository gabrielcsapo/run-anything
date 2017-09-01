const test = require('tape');
const net = require('net');

const { Run, State } = require('../index');

test('run-anything', (t) => {
  t.plan(3);

  t.test('tes basic functionality', (t) => {
    Run([{
      state: new State({
        on: 0,
        color: '#efefef'
      }),
      name: 'light',
      commands: {
        'on': function(socket) {
          this.state.set('on', 1);

          socket.write('turned light on');
        },
        'off': function(socket) {
          this.state.set('on', 0);

          socket.write('turned light off');
        },
        'color [color]': function(socket, color) {
          this.state.set('color', color);

          socket.write(`changed color of light to ${color}`)
        }
      }
    }], (server) => {
      const client = new net.Socket();
      client.connect(server.address().port, '127.0.0.1', () => {
        client.write('on');
      });

      client.on('data', (data) => {
        t.equal(data.toString('utf8'), 'turned light on');
        client.destroy();
        server.close();
      });

      client.on('close', () => {
        t.end();
      })
    });
  });

  t.test('test helper function on application (help)', (t) => {
    Run([{
      state: new State({
        on: 0,
        color: '#efefef'
      }),
      name: 'light',
      commands: {
        'on': function(socket) {
          this.state.set('on', 1);

          socket.write('turned light on');
        },
        'off': function(socket) {
          this.state.set('on', 0);

          socket.write('turned light off');
        },
        'color [color]': function(socket, color) {
          this.state.set('color', color);

          socket.write(`changed color of light to ${color}`)
        }
      }
    }], (server) => {
      const client = new net.Socket();
      client.connect(server.address().port, '127.0.0.1', () => {
        client.write('help');
      });

      client.on('data', (data) => {
        t.deepEqual(JSON.parse(data.toString()), ['on', 'off', 'color [color]', 'help', 'state']);
        client.destroy();
        server.close();
      });

      client.on('close', () => {
        t.end();
      })
    });
  });

  t.test('test state functionality', (t) => {
    let state = new State({
      on: 0,
      color: '#efefef'
    });

    Run([{
      state,
      name: 'light',
      commands: {
        'on': function(socket) {
          this.state.set('on', 1);

          socket.write('turned light on');
        },
        'off': function(socket) {
          this.state.set('on', 0);

          socket.write('turned light off');
        },
        'color [color]': function(socket, color) {
          this.state.set('color', color);

          socket.write(`changed color of light to ${color}`)
        }
      }
    }], (server) => {
      let received = 0;
      let expect = [
        '{"on":0,"color":"#efefef"}',
        'turned light on',
        '{"on":1,"color":"#efefef"}',
      ];
      let command = [
        '',
        'state',
        'on'
      ];

      const client = new net.Socket();
      client.connect(server.address().port, '127.0.0.1', () => {
        client.write('state');
      });

      client.on('data', (data) => {
        t.deepEqual(data.toString(), expect[received]);
        received += 1;

        let newCommand = command.pop();
        client.write(newCommand);

        if(expect.length == received) {
          client.destroy();
          server.close();
        }
      });

      client.on('close', () => {
        t.end();
      });
    });
  });

});

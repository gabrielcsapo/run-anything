const test = require('tape');
const net = require('net');

const { Run } = require('../index');

test('Run', (t) => {
  t.plan(3);

  t.test('tes basic functionality', (t) => {
    const instance = new Run([{
      state: {
        on: 0,
        color: '#efefef'
      },
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
    }])
    instance.start(() => {
      const client = new net.Socket();
      client.connect(instance.port, '127.0.0.1', () => {
        client.write('on');
      });

      client.on('data', (data) => {
        t.equal(data.toString('utf8'), 'turned light on');
        client.destroy();
        instance.close();
      });

      client.on('close', () => {
        t.end();
      })
    });
  });

  t.test('test helper function on application (help)', (t) => {
    const instance = new Run([{
      state: {
        on: 0,
        color: '#efefef'
      },
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
    }]);
    instance.start(() => {
      const client = new net.Socket();
      client.connect(instance.port, '127.0.0.1', () => {
        client.write('help');
      });

      client.on('data', (data) => {
        t.deepEqual(JSON.parse(data.toString()),  [ 'help', 'state', 'on', 'off', 'color [color]' ]);
        client.destroy();
        instance.close();
      });

      client.on('close', () => {
        t.end();
      })
    });
  });

  t.test('test state functionality', (t) => {
    const instance = new Run([{
      state: {
        on: 0,
        color: '#efefef'
      },
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
    }]);
    instance.start(() => {
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
      client.connect(instance.port, '127.0.0.1', () => {
        client.write('state');
      });

      client.on('data', (data) => {
        t.deepEqual(data.toString(), expect[received]);
        received += 1;

        let newCommand = command.pop();
        client.write(newCommand);

        if(expect.length == received) {
          client.destroy();
          instance.close();
        }
      });

      client.on('close', () => {
        t.end();
      });
    });
  });

});

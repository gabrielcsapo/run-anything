const test = require('tape');

const Application = require('../lib/application');

test('Application', (t) => {
  t.plan(2);

  t.test('invocation', (t) => {
    const application = new Application({
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
    });
    t.ok(application instanceof Application);
    t.equal(application.name, 'light');
    t.equal(application.state.get('on'), 0);
    t.equal(application.state.get('color'), '#efefef');
    t.equal(typeof application.commands['help'], 'function');
    t.equal(typeof application.commands['state'], 'function');
    t.equal(typeof application.commands['on'], 'function');
    t.equal(typeof application.commands['off'], 'function');
    t.equal(typeof application.commands['color [color]'], 'function');
    t.end();
  });

  t.test('parse', (t) => {
    const application = new Application({
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
    });
    var socket = {
      write: function(data) {
        socket.data = data;
      }
    }
    application.parse('color blue', socket);
    t.equal(socket.data, 'changed color of light to blue');
    t.equal(application.state.get('color'), 'blue');
    t.end();
  });

});

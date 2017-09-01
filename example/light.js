const { Run, State } = require('../index');

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
  console.log(`run-anything running at port ${server.address().port}`); // eslint-disable-line

  process.on('exit', () => {
    server.close();
  });
});

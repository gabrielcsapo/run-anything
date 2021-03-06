const { Run } = require('../index');

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
  console.log(`run-anything running at port ${instance.port}`); // eslint-disable-line

  process.on('exit', () => {
    instance.close();
  });
});

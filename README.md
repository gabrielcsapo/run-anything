# run-anywhere

> 🏃 configuration based application development for IOT

## Installation

```
npm install run-anywhere
```

## Usage

```javascript
const { Run, State } = require('run-anything');

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
  console.log(`run-anything running at port ${server.address().port}`)

  process.on('exit', () => {
    server.close();
  });
});
```
## Direction

What if building a IOT device could automatically generate a UI. Where you could ask a device for the functions and state of the device and it would respond with it.

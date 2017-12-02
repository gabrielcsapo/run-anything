# run-anywhere

> 🏃 configuration based application development for IOT

## Installation

```
npm install run-anywhere
```

## Usage

> to get more information use `DEBUG=run-anything` before starting the process 

> programmatic usage of run-anything

```javascript
const { Run } = require('run-anything');

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

instance.start((server) => {
  console.log(`run-anything running at port ${instance.port}`)

  process.on('exit', () => {
    instance.close();
  });
});
```

> running run-anything as a binary

```
Usage: run-anything [options]

Command:
  -h, --help, help     outputs this screen and exists the process

Options:
  -p, --port [port]     overrides the randomized port for serving application
  -c, --config [path]   the config that is to be run
```

The config file for `run-anything` would look something like:

```javascript
module.exports = {
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
};
```

## Direction

What if building a IOT device could automatically generate a UI. Where you could ask a device for the functions and state of the device and it would respond with it.

# run-anywhere

> configuration based application development for IOT

## Installation

```
npm install run-anywhere
```

## Usage

```javascript
const run = require('run-anything');

run([{
    name: 'lights',
    commands: ['on [id]', 'off [id]', 'list'],
    on: (socket, id) => {
        socket.write(`turned on light ${id}`);
    },
    off: (socket, id) => {
        socket.write(`turned off light ${id}`);
    },
    list: (socket) => {
        socket.write(`12356, 12357, 12341, 934123`);
    }
}]);
```
## Direction

What if building a IOT device could automatically generate a UI. Where you could ask a device for the functions and state of the device and it would respond with it.

## TODO

- [ ] document and outline a data format that could be used
- [ ] create a javascript example of generating a interacting UI that could read from an example IOT device
- [ ] add functionality to extend an application to emit devices and their interfaces and state

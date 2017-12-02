#!/usr/bin/env node

const path = require('path');

const { Run } = require('../index');

const args = process.argv.slice(2);

let program = {};

args.forEach((a, i) => {
  switch(a) {
  case '-v':
  case '--version':
      console.log(require('../package.json').version); // eslint-disable-line
    break;
  case '-c':
  case '--config':
    if(args[i + 1]) {
      program.config = args[i + 1];
    }
    break;
  case '-p':
  case '--port':
    program.port = args[i + 1];
    break;
  case 'help':
  case '-h':
  case '--help':
        console.log(`` + // eslint-disable-line
`
Usage: run-anything [options]

Command:
  -h, --help, help     outputs this screen and exists the process

Options:
  -p, --port [port]     overrides the randomized port for serving application
  -c, --config [path]   the config that is to be run

`);
    process.exit(0);
    break;
  }
})

if(program.config) {
  const config = require(path.resolve(process.cwd(), args[1]));
  const instance = new Run([config], {
    port: program.port
  });
  instance.start((error) => {
    if(error) {
      console.log(`run-anything failed to start with error \n ${error.toString()}`); // eslint-disable-line
    } else {
      console.log(`run-anything started on ${instance.port}`); // eslint-disable-line
    }
  });
}

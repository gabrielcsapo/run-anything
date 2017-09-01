#!/usr/bin/env node

const program = require('commander');
const path = require('path');

const run = require('../index');

program
  .version(require('../package.json'))
  .option('-c, --config <config>', 'A path to a config file that points to entry points for run-anywhere configs')
  .parse(process.argv);

const config = require(path.resolve(process.cwd(), program.config));
run([config], (server) => {
  console.log(`run-anything started on ${server.address().port}`); // eslint-disable-line
});

const program = require('commander');

program
  .version(require('../package.json'))
  .option('-c, --config [config]', 'A path to a config file that points to entry points for run-anywhere configs')
  .parse(process.argv);

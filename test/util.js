const test = require('tape');

const { parseCommand } = require('../lib/util');

test('@util', (t) => {
  t.plan(2);

  t.test('should be able to parse command', (t) => {
    parseCommand('color blue', 'color [blue]', (error, func, paramaters) => {
      t.ok(!error);
      t.equal(func, 'color');
      t.deepEqual(paramaters, ['color', 'blue'])
      t.end();
    });
  });

  t.test('should be able unable to parse command', (t) => {
    parseCommand('color blue', 'bluse', (error, func, paramaters) => {
      t.ok(error);
      t.ok(!func);
      t.ok(!paramaters);
      t.end();
    });
  });
});

module.exports.parseCommand = function parseCommand(input, command, callback) {
  const args = input.trim().split(/[ ,|]+/)

  const check = command.split(/[ ,|]+/);
  const func = check[0];

  if(func === args[0] && check.length === args.length) {
    const paramaters = args.map((a) => a.replace('[', '').replace(']', ''));
    return callback(null, func, paramaters);
  } else {
    return callback('not parseable');
  }
}

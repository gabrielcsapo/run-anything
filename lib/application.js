const State = require('./state');

class Application {
  constructor({ state={}, name, commands }={}) {
    this.name = name;
    this.state = new State(state);
    this._commands = commands;
  }
  /**
   * parses the given command against stored commands
   * @method parse
   * @param  {String} command [description]
   */
  parse(input, socket) {
    let found = false;
    const self = this;
    const args = input.trim().split(/[ ,|]+/)

    Object.keys(this.commands).map((command) => {
      const check = command.split(/[ ,|]+/);
      const func = check[0];

      if(func === args[0] && check.length === args.length) {
        const paramaters = args.map((a) => a.replace('[', '').replace(']', ''));
        if(func && paramaters) {
          paramaters[0] = socket;
          self.commands[command].apply(self, paramaters);
        }
        found = true;
      }
    });

    return found;
  }
  set commands(newCommands) {
    this._commands = newCommands;
  }
  get commands() {
    return Object.assign({
      'help': (socket) => {
        socket.write(JSON.stringify(Object.keys(this.commands)))
      },
      'state': (socket) => {
        socket.write(this.state.toString());
      }
    }, this._commands);
  }
}

module.exports = Application

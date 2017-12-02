class State {
  constructor(initialState) {
    this.state = initialState || {};
  }
  get(key) {
    return this.state[key];
  }
  set(key, value) {
    this.state[key] = value;
  }
  toString() {
    return JSON.stringify(this.state);
  }
}

module.exports = State;

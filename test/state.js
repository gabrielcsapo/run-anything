const test = require('tape');

const State = require('../lib/state');

test('State', (t) => {
  t.plan(3);

  t.test('invocation', (t) => {
    const state = new State({
      foo: 'bar',
      person: {
        age: '23',
        name: 'Gabriel J. Csapo'
      }
    });
    t.ok(state instanceof State);
    t.deepEqual(state.state, {
      foo: 'bar',
      person: {
        age: '23',
        name: 'Gabriel J. Csapo'
      }
    });
    t.end();
  });

  t.test('get', (t) => {
    const state = new State({
      foo: 'bar',
      person: {
        age: '23',
        name: 'Gabriel J. Csapo'
      }
    });
    t.deepEqual(state.get('person'), {
      age: '23',
      name: 'Gabriel J. Csapo'
    });
    t.end();
  });

  t.test('set', (t) => {
    const state = new State({
      foo: 'bar',
      person: {
        age: '23',
        name: 'Gabriel J. Csapo'
      }
    });

    state.set('person', {
      birthdate: '11/11/2017',
      name: 'Foo Bar'
    });
    t.deepEqual(state.get('person'), {
      birthdate: '11/11/2017',
      name: 'Foo Bar'
    });
    t.end();
  });

});

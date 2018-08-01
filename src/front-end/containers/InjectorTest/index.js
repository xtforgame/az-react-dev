import React from 'react';
import { connect } from 'react-redux';
import { makeModule } from 'rrw-module';
import { compose } from 'recompose';
import {
  ping,
} from './actions';
import reducer from './reducer';
import epic from './epic';

const InjectorTest = ({ isPinging, ping }) => (
  <div>
    <h1>
is pinging:
      {isPinging.toString()}
    </h1>
    <button type="button" onClick={ping}>
Start PING
    </button>
  </div>
);

export default compose(
  makeModule('InjectorTest', {
    reducer,
    epic,
  }),
  connect(
    state => ({ isPinging: state.get('InjectorTest').isPinging }),
    { ping }
  ),
)(InjectorTest);

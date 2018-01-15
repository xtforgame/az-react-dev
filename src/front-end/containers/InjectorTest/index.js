import React from 'react';
import { connect } from 'react-redux';
import {
  ping,
} from './actions';
import { makeModule } from 'rrw-module';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'recompose';

let InjectorTest = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
);

export default compose(
  makeModule('InjectorTest', {
    reducer,
    saga,
  }),
  connect(
    state => ({ isPinging: state.get('InjectorTest').isPinging }),
    { ping }
  ),
)(InjectorTest);

import React from 'react';
import EnhancedRoute from '~/components/routes/EnhancedRoute';
import PrivateRoute from '~/containers/routes/PrivateRoute';

import App from '~/containers/App';
import Home from '~/containers/Home';
import AsyncPage from '~/containers/AsyncPage';
import RoTest from '~/containers/RoTest';
import RoTestReducer from '~/containers/RoTest/reducer';
import RoTestEpic from '~/containers/RoTest/epic';

let routeDefine = [
  {
    name: 'app',
    path: '/',
    component: App,
    exact: true,
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: AsyncPage,
  },
  {
    name: 'ro-test',
    path: '/ro-test',
    componentName: 'RoTest',
    component: RoTest,
    reducer: RoTestReducer,
    epic: RoTestEpic,
  },
  {
    name: 'login',
    path: '/login',
    component: RoTest,
    onEnter: ({history}) => {
      console.log('onEnter');
      history.replace({ pathname: '/' });
    },
    onLeave: () => {
      console.log('onLeave');
    },
  },
  {
    name: 'private',
    path: '/v',
    routeClass: PrivateRoute,
    component: App,
    onEnter: ({history}) => {
      console.log('onEnter');
      history.replace({ pathname: '/' });
    },
    onLeave: () => {
      console.log('onLeave');
    },
  },
];

export default (store) => {
  return (
    <div>
      {
        routeDefine.map(routeDef => {
          let { name, routeClass, ...rest } = routeDef;
          let Route = routeDef.routeClass || EnhancedRoute;
          return (
            <Route key={name} {...rest} store={store}/>
          );
        })
      }
    </div>
  );
}

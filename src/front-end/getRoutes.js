import React from 'react';
import { Switch } from 'react-router';
import EnhancedRoute from '~/components/routes/EnhancedRoute';
import PrivateRoute from '~/containers/routes/PrivateRoute';
import withRouteEvents from '~/components/withRouteEvents';

import MainFrame from '~/containers/MainFrame';
import Home from '~/containers/Home';
import AsyncPage from '~/containers/AsyncPage';
import Login from '~/containers/Login';
import InjectorTest from '~/containers/InjectorTest';

let routesDefine = {
  name: 'root',
  component: props => props.routeView, // or props => props.routeViews.default
  routeViews: [{
    switch: true,
    name: 'default',
    routes: [
      {
        name: 'redirect',
        path: '/',
        component: withRouteEvents({
          onEnter: ({history}) => {
            console.log('On enter root');
            history.replace({ pathname: '/home' });
          },
          onLeave: () => {
            console.log('On leave root');
          },
        })(null),
        exact: true,
      },
      {
        name: 'async',
        path: '/async',
        component: AsyncPage,
      },
      {
        name: 'injector-test',
        path: '/injector-test',
        routeClass: PrivateRoute,
        component: InjectorTest,
      },
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        name: 'main',
        path: '/',
        routeClass: PrivateRoute,
        component: MainFrame,
        routeViews: [{
          switch: true,
          name: 'default',
          routes: [
            {
              name: 'home',
              path: '/home',
              component: Home,
            },
            {
              name: 'async-in-main',
              path: '/async-in-main',
              component: AsyncPage,
            },
          ]
        }],
      },
    ]
  }]
};

function createRouteViewsFromDefine(childViewsDefine){
  let result = {};
  childViewsDefine.map(childViewDefine => {
    let switchChildren = childViewDefine.switch;
    let name = childViewDefine.name || 'default';
    result[name] = childViewDefine.routes.map(routeDefine => {
      return createRouteFromDefine(routeDefine);
    });
    if(switchChildren){
      result[name] = (
        <Switch>
          {result[name]}
        </Switch>
      );
    }
  });
  return result;
}

function createRouteFromDefine(routeDefine){
  let { name, routeClass, routeViews, ...rest } = routeDefine;
  let Route = routeDefine.routeClass || EnhancedRoute;
  routeViews = (routeViews && createRouteViewsFromDefine(routeViews)) || {};
  let routeView = routeViews.default;
  return (
    <Route key={name} {...rest} routeName={name} routeView={routeView} routeViews={routeViews}/>
  );
}

export default () => {
  return createRouteFromDefine(routesDefine);
}


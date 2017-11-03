import React from 'react';
import { Switch } from 'react-router';
import EnhancedRoute from '~/components/routes/EnhancedRoute';
import PrivateRoute from '~/containers/routes/PrivateRoute';

import MainFrame from '~/containers/MainFrame';
import Home from '~/containers/Home';
import AsyncPage from '~/containers/AsyncPage';
import Login from '~/containers/Login';
import InjectorTest from '~/containers/InjectorTest';
import InjectorTestReducer from '~/containers/InjectorTest/reducer';
import InjectorTestEpic from '~/containers/InjectorTest/epic';

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
        onEnter: ({history}) => {
          console.log('On enter root');
          history.replace({ pathname: '/home' });
        },
        onLeave: () => {
          console.log('On leave root');
        },
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
        componentName: 'InjectorTest',
        component: InjectorTest,
        reducer: InjectorTestReducer,
        epic: InjectorTestEpic,
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

function createRouteViewsFromDefine(store, childViewsDefine){
  let result = {};
  childViewsDefine.map(childViewDefine => {
    let switchChildren = childViewDefine.switch;
    let name = childViewDefine.name || 'default';
    result[name] = childViewDefine.routes.map(routeDefine => {
      return createRouteFromDefine(store, routeDefine);
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

function createRouteFromDefine(store, routeDefine){
  let { name, routeClass, routeViews, ...rest } = routeDefine;
  let Route = routeDefine.routeClass || EnhancedRoute;
  routeViews = (routeViews && createRouteViewsFromDefine(store, routeViews)) || {};
  let routeView = routeViews.default;
  return (
    <Route key={name} {...rest} store={store} routeName={name} routeView={routeView} routeViews={routeViews}/>
  );
}

export default (store) => {
  return createRouteFromDefine(store, routesDefine);
}


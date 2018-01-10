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

const defaultName = 'default';

const globalRouteConfig = {
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
            {
              // Basically, the `name` should be unique in the same level,
              // but if you want to treat routes(with the same component) are the same in a `Switch` component
              // (it means that react will not re-mount the component while switching between those reoutes),
              // you can provide the same key like this.
              // (While naviagting from `/async-in-main2` to `/async-in-main`(and vice versa), `AsyncPage` will not re-mount)
              name: 'async-in-main',
              path: '/async-in-main2',
              component: AsyncPage,
            },
          ]
        }],
      },
    ]
  }]
};


function createRouteViews(routeViewsConfigs) {
  const result = {};
  routeViewsConfigs.forEach((v) => {
    const isSwitch = v.switch;
    const name = v.name || defaultName;

    result[name] = v.routes.map(routeConfig => createRoute(routeConfig));

    if (isSwitch) {
      result[name] = (
        <Switch>
          {result[name]}
        </Switch>
      );
    }
  });
  return result;
}

function createRoute(routeConfig) {
  const {
    name,
    routeClass,
    routeViews: routeViewsConfigs,
    ...rest
  } = routeConfig;

  const CustomRoute = routeClass || EnhancedRoute;
  const routeViews = (routeViewsConfigs && createRouteViews(routeViewsConfigs)) || {};
  const routeView = routeViews[defaultName];
  return (
    <CustomRoute
      // do not provide key; this is a bug(?) of react-router v4
      key={name}
      {...rest}
      routeName={name}
      routeView={routeView}
      routeViews={routeViews}
    />
  );
}

export default () => createRoute(globalRouteConfig);


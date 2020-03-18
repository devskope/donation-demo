import React from 'react';
import { Route, Switch } from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component
        {...props}
        {...route.componentProps}
        routes={route.routes}
      />
    )}
  />
);

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes key={route.key} {...route} />;
    })}
    <Route render={() => <h1>Requested resource not found!</h1>} />
  </Switch>
);

export const routes = [
  { path: '/', key: 'home', component: () => 'Home page', exact: true }
];

import React from 'react';
import { Route, Switch } from  'react-router-dom';
import App from './App.js';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Home from './containers/Home';
import Events from './containers/Events';
import Profile from './containers/Profile';
import Signup from './containers/Signup';

const Routes = () => (
    <App>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/events" component={Events} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
    </App>
)

export default Routes;

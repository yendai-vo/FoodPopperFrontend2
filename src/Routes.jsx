import React from 'react';
import { Route, Switch, Redirect } from  'react-router-dom';
import App from './App.js';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Home from './containers/Home';
import Events from './containers/Events';
import Profile from './containers/Profile';
import Signup from './containers/Signup';


function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            localStorage.getItem('jwt') ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  

const Routes = () => (
    <App>
        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/home" component={Home} exact />
          <PrivateRoute path="/events" component={Events} exact />
          <PrivateRoute path="/profile" component={Profile} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
    </App>
)



export default Routes;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import LoginPage from './components/auth/login'
import RegisterPage from './components/auth/register'
import LandingPage from './components/landing/landing'
import MainUserPage from './components/profile/mainuser'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/main' component={MainUserPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route path='/' component={LandingPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import LoginPage from './components/auth/login'
import RegisterPage from './components/auth/register'
import LandingPage from './components/landing/landing'
import MainUserPage from './components/profile/mainuser'

class App extends Component {
  render() {
    const isLoggedIn = localStorage.getItem('User')
    return (
      <div>
        <Switch>
          <Route exact path='/main' render={() => (
              !isLoggedIn ? (<Redirect to='/'/>) : (<MainUserPage/>)
            )}/>
          <Route exact path='/login' render={() => (
              isLoggedIn ? (<Redirect to='/main'/>) : (<LoginPage/>)
            )}/>
          <Route exact path='/register' render={() => (
              isLoggedIn ? (<Redirect to='/main'/>) : (<RegisterPage/>)
            )}/>
          <Route path='/' component={LandingPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;

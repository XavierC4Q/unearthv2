import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './components/auth/login'
import RegisterPage from './components/auth/register'
import LandingPage from './components/landing/landing'
import ProfilePage from './components/profile/profilepage'

class App extends Component {
  renderProfiles = props => {
    const {username} = props.match.params
    return (<ProfilePage username={username}/>)
  }

  render() {
    const loggedInUser = localStorage.getItem('User')
    const profilepath = `/profile/${loggedInUser}`
    return (<div>
      <Switch>
        <Route exact="exact" path='/profile/:username' render={this.renderProfiles}/>
        <Route exact="exact" path='/login' render={() => (
            loggedInUser
            ? (<Redirect to={profilepath}/>)
            : (<LoginPage/>))}/>
        <Route exact="exact" path='/register' render={() => (
            loggedInUser
            ? (<Redirect to={profilepath}/>)
            : (<RegisterPage/>))}/>
        <Route path='/' component={LandingPage}/>
      </Switch>
    </div>);
  }
}

export default App;

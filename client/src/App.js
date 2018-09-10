import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import LoginPage from './components/auth/login'
import RegisterPage from './components/auth/register'
import LandingPage from './components/landing/landing'
import ProfilePage from './components/profile/profilepage'

const CurrentUserFragment = gql`
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

class App extends Component {

  render() {
    const currentUser = this.props.client.readFragment({
      id: 'CurrentUser',
      fragment: CurrentUserFragment
    })
    console.log('SAFARI',currentUser)
    const isLoggedIn = !!currentUser
    return (<div>
      <Switch>
        <Route exact="exact" path='/profile/:username' render={props => {
            const { username } = props.match.params
            return(<ProfilePage user={currentUser} username={username}/>)
          }}/>
        <Route exact="exact" path='/login' render={() => (
            isLoggedIn
            ? (<Redirect to='/'/>)
            : (<LoginPage client={this.props.client}/>))}/>
        <Route exact="exact" path='/register' render={() => (
            isLoggedIn
            ? (<Redirect to='/'/>)
            : (<RegisterPage client={this.props.client}/>))}/>
          <Route path='/' render={() => <LandingPage currentUser={currentUser}/>}/>
      </Switch>
    </div>);
  }
}

export default withApollo(App);

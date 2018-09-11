import React from 'react'
import {Redirect} from 'react-router-dom'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import inputs from 'react-stateless-input'


const CurrentUser = gql `
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

const SET_CURRENT_USER = gql `
  mutation setCurrentUser($username: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    setCurrentUser(username: $username, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName) @client
  }
`

const LOGIN_USER = gql `
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      ...CurrentUser
    }
  }
  ${CurrentUser}
`

class LoginPage extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      success: false
    }
  }

  loginUser = (e) => {
    e.preventDefault()
    const { username, password } = inputs()
    const { login, setCurrentUser } = this.props
    login(username, password).then((res) => {
      const { username, email, photo, firstName, lastName } = res
      setCurrentUser(username, email, photo, firstName, lastName).then(() => {
        this.setState({ success: true })
      })
      .catch((err) => {
        console.log('error setting the user', err)
      })
    })
    .catch((err) => {
      console.log('error logging in sir', err)
    })
  }

  render() {
    if(this.state.success){
      return(<Redirect to='/'/>)
    }
    return (<div>
      <form onSubmit={this.loginUser}>
        <div>
          <h3>Username</h3>
          <input type='text' name='username' placeholder='Enter username'></input>
        </div>
        <div>
          <h3>Password</h3>
          <input type='text' name='password' placeholder='Enter password'></input>
        </div>
        <button type='submit'>Submit Sir</button>
      </form>
    </div>)
  }
}

export default compose(graphql(SET_CURRENT_USER, {
  props: ({mutate}) => ({
    setCurrentUser: (username, email, photo, firstName, lastName) => mutate({
      variables: {
        username,
        email,
        photo,
        firstName,
        lastName
      }
    })
  })
}), graphql(LOGIN_USER, {
  props: ({mutate}) => ({
    login: (username, password) => mutate({
      variables: {
        username,
        password
      }
    })
  })
}))(LoginPage)

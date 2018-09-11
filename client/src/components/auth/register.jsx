import React from 'react'
import {graphql, compose} from 'react-apollo'
import {Redirect} from 'react-router-dom'
import inputs from 'react-stateless-input'
import gql from 'graphql-tag'

const CurrentUser = gql `
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

const REGISTER_USER = gql `
  mutation register($username: String!, $password: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    register(username: $username, password: $password, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName){
      ...CurrentUser
    }
  }
  ${CurrentUser}
`

const SET_CURRENT_USER = gql `
  mutation setCurrentUser($username: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    setCurrentUser(username: $username, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName) @client
  }
`

class RegisterPage extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      success: false
    }
  }

  registerUser = (e) => {
    e.preventDefault()
    const {
      username,
      password,
      email,
      photo,
      firstName,
      lastName
    } = inputs()
    const {register, setCurrentUser} = this.props
    register(username, password, email, photo, firstName, lastName).then((res) => {
      const {username, email, photo, firstName, lastName} = res
      setCurrentUser(username, email, photo, firstName, lastName).then(() => {
        this.setState({success: true})
      }).catch((err) => {
        console.log('error setting the user', err)
        return err
      })
    }).catch((err) => {
      console.log('error logging in sir', err)
      return err
    })
  }

  render() {
    if (this.state.success) {
      return (<Redirect to='/'/>)
    }
    return (<div>
      <form onSubmit={this.registerUser}>
        <div>
          <h3>Username</h3>
          <input type='text' name='username' placeholder='Enter username'></input>
        </div>
        <div>
          <h3>Password</h3>
          <input type='text' name='password' placeholder='Enter password'></input>
        </div>
        <div>
          <h3>Email</h3>
          <input type='text' name='email' placeholder='Enter email'></input>
        </div>
        <div>
          <h3>Photo</h3>
          <input type='text' name='photo' placeholder='Enter photo'></input>
        </div>
        <div>
          <h3>First Name</h3>
          <input type='text' name='firstName' placeholder='Enter your first name'></input>
        </div>
        <div>
          <h3>Last Name</h3>
          <input type='text' name='lastName' placeholder='Enter your last name'></input>
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
}), graphql(REGISTER_USER, {
  props: ({mutate}) => ({
    register: (username, password, email, photo, firstName, lastName) => mutate({
      variables: {
        username,
        password,
        email,
        photo,
        firstName,
        lastName
      }
    })
  })
}))(RegisterPage)

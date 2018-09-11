import React from 'react'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import inputs from 'react-stateless-input'
import gql from 'graphql-tag'

const REGISTER_USER = gql `
  mutation register($username: String!, $password: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    register(username: $username, password: $password, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName){
      username
      email
    }
  }
`

const CurrentUserFragment = gql `
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

class RegisterPage extends React.PureComponent{
  constructor(){
    super()
    this.state = {loggedIn: false}
  }
  render() {
    const {client} = this.props

    if(this.state.loggedIn){
      return(<Redirect to='/'/>)
    }
    return (<Mutation mutation={REGISTER_USER}>
      {
        (register, {data}) => (<div>
          <form onSubmit={e => {
              e.preventDefault()
              const {username, password, email, firstName, lastName, photo} = inputs()
              register({
                variables: {
                  username: username,
                  password: password,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  photo: photo
                }
              }).then(({data}) => {
                const { register } = data
                const {username, email, photo, firstName, lastName} = register
                const info = {
                  __typename: 'User',
                  username: username,
                  email: email,
                  photo: photo,
                  firstName: firstName,
                  lastName: lastName
                }
                client.writeFragment({id: 'CurrentUser', fragment: CurrentUserFragment, data: info})
              }).then(() => {
                this.setState({ loggedIn: true })
              }).catch((error) => {
                return error
              })
            }}>
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
              <h3>First Name</h3>
              <input type='text' name='firstName' placeholder='Enter first name'></input>
            </div>
            <div>
              <h3>Last Name</h3>
              <input type='text' name='lastName' placeholder='Enter last name'></input>
            </div>
            <div>
              <h3>Photo</h3>
              <input type='text' name='photo' placeholder='Enter photo'></input>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>)
      }
    </Mutation>)
  }
}

export default RegisterPage

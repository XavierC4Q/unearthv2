import React from 'react'
import {Redirect} from 'react-router-dom'
import {Mutation} from 'react-apollo'
import {LOGIN_USER} from '../../graphql/mutation'
import gql from 'graphql-tag'
import inputs from 'react-stateless-input'

const CurrentUserFragment = gql `
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

class LoginPage extends React.PureComponent {
  constructor(){
    super()
    this.state = {loggedIn: false}
  }
  render() {
    const {client} = this.props

    if(this.state.loggedIn){
      return(<Redirect to='/'/>)
    }
    return (<Mutation mutation={LOGIN_USER}>
      {
        (login) => (<div>
          <form onSubmit={e => {
              e.preventDefault()
              const {username, password} = inputs()
              login({
                variables: {
                  username: username,
                  password: password
                }
              }).then(({data}) => {
                const {login} = data
                const {username, email, photo, firstName, lastName} = login
                const info = {
                  __typename: 'User',
                  username: username,
                  email: email,
                  photo: photo,
                  firstName: firstName,
                  lastName: lastName
                }
                client.writeFragment({id: 'CurrentUser', fragment: CurrentUserFragment, data: info})
              })
              .then(() => {
                this.setState({ loggedIn: true })
              }).catch((error) => {
                return error
              })
            }}>
            <div>
              <div>
                <h3>Username</h3>
                <input type='text' name='username' placeholder='Enter your username'></input>
              </div>
              <div>
                <h3>Password</h3>
                <input type='text' name='password' placeholder='Enter your password'></input>
              </div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>)
      }
    </Mutation>)
  }
}

export default LoginPage

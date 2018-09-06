import React from 'react'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { LOGIN_USER } from '../../graphql/mutation'
import inputs from 'react-stateless-input'

const LoginPage = () => {
  return(
    <Mutation mutation={LOGIN_USER}>
      {
        (login) => (
          <div>
            <form onSubmit={e => {
                e.preventDefault()
                const { username, password } = inputs()
                login({
                  variables: { username: username, password: password }
                })
                .then(({ data }) => {
                  const { login } = data
                  return login
                })
                .catch((error) => {
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
          </div>
        )
      }
    </Mutation>
  )
}

export default LoginPage
import React from 'react'
import { Mutation } from 'react-apollo'
import inputs from 'react-stateless-input'
import {REGISTER_USER} from '../../graphql/mutation'

const RegisterPage = () => {
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
              return register
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

export default RegisterPage

import gql from 'graphql-tag'

export const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    register(username: $username, password: $password, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName){
      username
      email
    }
  }
`
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      username
      email
      photo
      firstName
      lastName
    }
  }
`

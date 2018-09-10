import gql from 'graphql-tag'

const fragments = {
  currentUser: gql `
    fragment CurrentUser on User {
      username
      email
      photo
      firstName
      lastName
    }
  `
}

export const REGISTER_USER = gql `
  mutation register($username: String!, $password: String!, $email: String!, $photo: String, $firstName: String, $lastName: String){
    register(username: $username, password: $password, email: $email, photo: $photo, firstName: $firstName, lastName: $lastName){
      ...CurrentUser
    }
  }
  ${fragments.currentUser}
`
export const LOGIN_USER = gql `
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      ...CurrentUser
    }
  }
  ${fragments.currentUser}
`

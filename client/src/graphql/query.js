import gql from 'graphql-tag'

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      username
      photo
      firstName
    }
  }
`
export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username){
      username
      email
      photo
      firstName
      lastName
    }
  }
`
export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn
  }
`
export const LOGOUT = gql`
  query logout {
    logout
  }
`

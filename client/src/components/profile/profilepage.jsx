import React from 'react'
import {Redirect} from 'react-router-dom'
import {Query, compose, withApollo, graphql} from 'react-apollo'
import gql from 'graphql-tag'

import LogOut from './logout'

const CurrentUser = gql `
  fragment CurrentUser on User {
    username
    email
    photo
    firstName
    lastName
  }
`

const GET_USER = gql `
  query getUser($username: String!) {
    getUser(username: $username){
      ...CurrentUser
    }
  }
  ${CurrentUser}
`

const GET_CURRENT_USER = gql `
  query getCurrentUser {
    getCurrentUser @client
  }
`

class ProfilePage extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: false,
      pageOwner: false
    }
  }

  render() {
    console.log("STATE", this.props)
    return (<div>The profile profile</div>)
  }
}

export default compose(graphql(GET_CURRENT_USER, {
  props: ({data: {
      getCurrentUser
    }}) => {
    return {getCurrentUser}
  }
}), graphql(GET_USER, {
  props: ({
    data: {
      loading,
      error,
      getUser
    }
  }) => {
    return {getUser}
  }
}))(withApollo(ProfilePage))

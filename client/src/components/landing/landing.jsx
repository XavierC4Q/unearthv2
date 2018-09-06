import React from 'react'
import {Query} from 'react-apollo'
import {ALL_USERS} from '../../graphql/query'

const LandingPage = () => {
  return (<Query query={ALL_USERS}>
    {
      ({loading, error, data}) => {
        const {allUsers} = data
        if (error)
          return <div>error loading users</div>
        if (loading && !allUsers)
          return <div>loading loading</div>

        return (<div>
          <h1>Landing Page</h1>
          {
            allUsers.map(user => (
              <p>{user.username}</p>
            ))
          }
        </div>)
      }
    }
  </Query>)
}

export default LandingPage

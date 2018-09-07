import React from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'
import {ALL_USERS} from '../../graphql/query'

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem('User')
  return (<Query query={ALL_USERS}>
    {
      ({loading, error, data}) => {
        const {allUsers} = data
        if (error)
          return <div>error loading users</div>
        if (loading && !allUsers)
          return <div>loading loading</div>

        return (<div>
          {
            isLoggedIn ? <nav>
            <Link to='/main'>MAIN</Link>
          </nav>
          :
          <nav>
            <Link to='/login'>LOGIN</Link>
            {" "}
            <Link to='/register'>REGISTER</Link>
            {" "}
          </nav>
          }
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

import React from 'react'
import {Query} from 'react-apollo'
import {GET_USER} from '../../graphql/query'

import {LogOut} from './logout'

class ProfilePage extends React.Component {
  render() {
    const {username} = this.props
    const isOwnProfile = localStorage.User === username
    return (<Query query={GET_USER} variables={{
        username: username
      }}>
      {
        ({loading, error, data}) => {
          if (error)
            return (<div>error userpage</div>)
          if (loading && !data)
            return (<div>loading user page</div>)
          if (data) {
            const {getUser} = data
            if (getUser) {
              const {username, email, photo, firstName, lastName} = getUser
              return (<div>
                <h1>USERPAGE of {username}</h1>
                {
                  isOwnProfile ? <LogOut/> : ''
                }
              </div>)
            } else {
              return (<div>no such user</div>)
            }
          }
        }
      }
    </Query>)
  }
}

export default ProfilePage

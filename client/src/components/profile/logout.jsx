import React from 'react'
import { Redirect } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'
import { LOGOUT } from '../../graphql/query'

export const LogOut = () => {
  return(
    <ApolloConsumer>
      {client => (
        <button onClick={async () =>{
            const { success } = await client.query({
              query: LOGOUT
            })
            localStorage.removeItem('User')
            return success
          }}>LOGOUT</button>
      )}
    </ApolloConsumer>
  )
}

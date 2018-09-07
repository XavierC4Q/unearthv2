import React from 'react'
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

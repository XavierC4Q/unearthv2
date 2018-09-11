import React from 'react'
import { Redirect } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const LOGOUT = gql`
  query logout {
    logout
  }
`

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

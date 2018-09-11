import React from 'react'
import { Redirect } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const LOGOUT = gql`
  query logout {
    logout
  }
`

const LogOut = ({ user }) => {
  return(
    <ApolloConsumer>
      {client => (
        <button onClick={async () =>{
            const { success } = await client.query({
              query: LOGOUT
            })
            await client.resetStore()
            return success
          }}>LOGOUT</button>
      )}
    </ApolloConsumer>
  )
}

export default LogOut

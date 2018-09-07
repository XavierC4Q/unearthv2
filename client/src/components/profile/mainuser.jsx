import React from 'react'
import { graphql } from 'react-apollo'
import { GET_USER } from '../../graphql/query'

import { LogOut } from './logout'

class MainUserPage extends React.Component{
  render(){
    console.log(localStorage)
    const username = localStorage.getItem('User')
    return(
      <div>
        <h1>HELLO {username}</h1>
        <LogOut/>
      </div>
    )
  }
}


export default MainUserPage

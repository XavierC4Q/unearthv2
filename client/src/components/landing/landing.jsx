import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  const loggedInUser = localStorage.getItem('User')
  const profilepath = `/profile/${loggedInUser}`
  return (<div>
    {
      loggedInUser
        ? <nav>
            <Link to={profilepath}>PROFILE</Link>
          </nav>
        : <nav>
            <Link to='/login'>LOGIN</Link>
            {" "}
            <Link to='/register'>REGISTER</Link>
            {" "}
          </nav>
    }
    <h1>Landing Page</h1>
  </div>)
}

export default LandingPage

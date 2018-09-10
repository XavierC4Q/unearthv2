import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = ({ currentUser }) => {
  const profilepath = currentUser ? `/profile/${currentUser.username}` : null
  return (<div>
    {
      currentUser
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

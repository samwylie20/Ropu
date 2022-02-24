import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Create header component with logo, navlinks and New post button #4
// Logo, Top, Jobs, Code, Events, New post

function Header () {
  return (
    <>
      <Box>
        <img src='./ropu-log.png'></img>
        <h1>Rōpū</h1>
        <nav>
          <Link to='/'>Top</Link>
          <Link to='/jobs'>Jobs</Link>
          <Link to='/code'>Code</Link>
          <Link to='/events'>Events</Link>
        </nav>
        <button>New Post</button>
      </Box>
    </>
  )
}

export default Header

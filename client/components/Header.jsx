import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Button } from '@chakra-ui/react'

import Logo from './Logo'

// Create header component with logo, navlinks and New post button #4
// Logo, Top, Jobs, Code, Events, New post

function Header () {
  return (
    <>
      <Box padding='16px'>
        <Flex direction='right' justify='space-around'>
          <Box>
            <Logo />
          </Box>
          <nav>
            <Link to='/'>Top</Link>
          </nav>
          <nav>
            <Link to='/jobs'>Jobs</Link>
          </nav>
          <nav>
            <Link to='/code'>Code</Link>
          </nav>
          <nav>
            <Link to='/events'>Events</Link>
          </nav>
          <Button>New Post</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Header

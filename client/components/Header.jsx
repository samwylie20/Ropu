import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon } from '@heroicons/react/solid'

import Logo from './Logo'
import NewPost from './posts/newPost'

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
            < ArrowSmUpIcon />
            <Link to='/'>Top</Link>
          </nav>
          <nav>
            <LinkIcon />
            <Link to='/jobs'>Jobs</Link>
          </nav>
          <nav>
            < CodeIcon />
            <Link to='/code'>Code</Link>
          </nav>
          <nav>
            <OfficeBuildingIcon />
            <Link to='/events'>Events</Link>
          </nav>
          <NewPost />
        </Flex>
      </Box>
    </>
  )
}

export default Header

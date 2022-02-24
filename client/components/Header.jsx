import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, TrendingUpIcon, CalendarIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import NewPost from './posts/newPost'

function Header () {
  return (
    <>
      <Box padding='16px'>
        <Flex direction='left' justify='space-around'>
          <HStack spacing='12'>
            <Box>
              <Logo />
            </Box>
            <HStack spacing='2' align='left'>
              <nav>
                <Button background='none'>
                  <TrendingUpIcon height='24px' />
                  <Box marginLeft='2'>
                    <Link to='/'>Top</Link>
                  </Box>
                </Button>
              </nav>
              <nav>
                <Button background='none'>
                  <OfficeBuildingIcon height='24px'/>
                  <Box marginLeft='2'>
                    <Link to='/jobs'>Jobs</Link>
                  </Box>
                </Button>
              </nav>
              <nav>
                <Button background='none'>
                  <CodeIcon height='24px'/>
                  <Box marginLeft='2'>
                    <Link to='/code'>Code</Link>
                  </Box>
                </Button>
              </nav>
              <nav>
                <Button background='none'>
                  <CalendarIcon height='24px'/>
                  <Box marginLeft='2'>
                    <Link to='/events'>Events</Link>
                  </Box>
                </Button>
              </nav>
            </HStack>
          </HStack>
          <NewPost />
        </Flex>
      </Box>
    </>
  )
}

export default Header

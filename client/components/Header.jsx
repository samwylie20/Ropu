import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, TrendingUpIcon, CalendarIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import NewPost from './posts/newPost'

function Header ({ session }) {
  return (
    <>
      <Box padding='16px'>
        <Flex direction='left' justify='space-around'>
          <HStack spacing='12'>
            <Box>
              <Link to='/'><Logo /></Link>
            </Box>
            <HStack spacing='2' align='left'>
              <nav>
                <Link to='/top'>
                  <Button background='none'>
                    <TrendingUpIcon height='24px' />
                    <Box marginLeft='2'>
                    Top
                    </Box>
                  </Button>
                </Link>
              </nav>
              <nav>
                <Link to='/jobs'><Button background='none'>
                  <OfficeBuildingIcon height='24px'/>
                  <Box marginLeft='2'>
                    Jobs
                  </Box>
                </Button>
                </Link>
              </nav>
              <nav>
                <Link to='/code'><Button background='none'>
                  <CodeIcon height='24px'/>
                  <Box marginLeft='2'>
                    Code
                  </Box>
                </Button>
                </Link>
              </nav>
              <nav>
                <Link to='/events'><Button background='none'>
                  <CalendarIcon height='24px'/>
                  <Box marginLeft='2'>
                    Events
                  </Box>
                </Button>
                </Link>
              </nav>
            </HStack>
          </HStack>
          <HStack>
            {!session ? <Link to='/login'><Button borderRadius='24'>Log in</Button></Link>
              : <NewPost session={session} />
            }
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Header

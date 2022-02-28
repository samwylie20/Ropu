import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, TrendingUpIcon, CalendarIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import NewPost from './posts/newPost'
import SearchBar from './Search/SearchBar'

function Header ({ session }) {
  return (
    <>
      <Box backgroundColor='white' zIndex='sticky' position='fixed' top='0' width='full' shadow='sm'>
        <Flex paddingX='6' paddingY='4'>
          <Box flex='1'>
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
          </Box>
          <HStack spacing='4'>
            <SearchBar/>
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

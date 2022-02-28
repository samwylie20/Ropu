import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { OfficeBuildingIcon, CodeIcon, TrendingUpIcon, CalendarIcon, UserIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import NewPost from './posts/newPost'
import Search from './Search/Search'

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
                  <Link to='/events'>
                    <Button background='none'>
                      <CalendarIcon height='24px'/>
                      <Box marginLeft='2'>
                        Events
                      </Box>
                     </Button>
                  </Link>
                </nav>
                <nav>
                <Link to='/account'><Button background='none'>
                <UserIcon height='24px'/>
                  <Box marginLeft='2'>
                    Account
                  </Box>
                </Button>
                </Link>
                </nav>
              </HStack>
            </HStack>
          </Box>
          <HStack spacing='2'>
            <Box paddingRight='4'>
              <Search/>
            </Box>
            {!session ? <Link to='/login'><Button borderRadius='24'>Log in</Button></Link>
              : <NewPost session={session} />
            }
            {session && <Text fontWeight='semibold' as='button' onClick={() => supabase.auth.signOut()}>Sign Out</Text>}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Header

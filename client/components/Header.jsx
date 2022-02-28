import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Box, Button, Flex, HStack, IconButton } from '@chakra-ui/react'
import { OfficeBuildingIcon, CodeIcon, TrendingUpIcon, CalendarIcon, UserGroupIcon, UserIcon, LogoutIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import NewPost from './posts/newPost'
import Search from './Search/Search'

function Header ({ session }) {
  const [userCohort, setUserCohort] = useState()

  useEffect(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', session?.user.id)

    setUserCohort(data[0])
  }, [session])

  useEffect(() => {
    console.log(userCohort)
  }, [userCohort])

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
                {userCohort && <nav>
                  <Link to={`/cohort/${userCohort.cohort_id}`}><Button background='none'>
                    <UserGroupIcon height='24px'/>
                    <Box marginLeft='2'>
                    My Cohort
                    </Box>
                  </Button>
                  </Link>
                </nav>}

              </HStack>
            </HStack>
          </Box>
          <HStack spacing='2'>
            <Box paddingRight='4'>
              <Search/>
            </Box>
            {session && <nav>
              <Link to='/account'><Button background='none'>
                <UserIcon height='24px' />
                <Box marginLeft='2'>
                  My Account
                </Box>
              </Button>
              </Link>
            </nav> }
            {!session ? <Link to='/login'><Button borderRadius='24'>Log in</Button></Link> : <NewPost session={session} />}
            {session && <IconButton width='10' background='none' onClick={() => supabase.auth.signOut()} icon={<LogoutIcon width='24px' style={{ color: 'gray.500' }}/> }/>}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Header

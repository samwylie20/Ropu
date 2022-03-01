import React, { useState, useEffect } from 'react'
import { Stack, Flex, Box, Heading, List, ListItem, Center, Spinner } from '@chakra-ui/react'

import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'

function Account () {
  const [data, setData] = useState([])
  const [user, setUser] = useState()
  const [userData, setUserData] = useState()

  useEffect(async () => {
    const user = await supabase.auth.user()

    if (user) {
      console.log(user.id, 'user id')
      console.log('This is the user', user, 'This is their email', user.email)

      setUser(user)

      const { data: posts, error } = await supabase
        .from('posts')
        .select()
        .eq('auth_id', user.id)
      // Need to get posts by user ID here
      setData(posts)
      console.log(posts, 'Post Data')

      const { data: userInfo, err } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
      // Need to get posts by user ID here
      console.log(user.id, 'ID Being passed to .eq')
      setUserData(userInfo)
      console.log(userInfo, 'User Data')
    }
  }, [])
  
  console.log(userData, 'User Data State')
  if (!data) {
    return (
      <Center height='100vh'>
        <Spinner onl
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
      </Center>)
  } else {
    return (
      <Box padding='24'>
        <Flex justify='center'>
          <List padding='4'>
          
            <ListItem>Email: {user?.email}</ListItem>
            <ListItem>Member since: {user?.created_at}</ListItem>
          </List>
          <Stack spacing='12'>
            <Flex justify='center'>
              {userData?.map((user) => {
                return <Heading> Posts by {user.user_name} </Heading> })}
            </Flex>
            {data?.map((post, index) => {
              return <Post key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author={user?.email} authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} id={post.id} />
            })
            }
          </Stack>
        </Flex>
      </Box>

    )
  }
}
export default Account

import React, { useState, useEffect } from 'react'
import { SimpleGrid, Stack, Editable, EditableInput, EditablePreview, Flex, ButtonGroup, IconButton, Box, Text, Link, LinkBox, LinkOverlay, Heading } from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'


function Account() {
  const [data, setData] = useState([])

  const [user, setUser] = useState()

  useEffect(async () => {
    const user = await supabase.auth.user()
    
    if (user) {
      console.log( user.id, 'user id' )
      console.log('This is the user', user, 'This is their email', user.email)
      
      setUser(user)
      
      const { data: posts, error } = await supabase
      .from('posts')
      .select()
      .eq( 'auth_id', user.id )
      // Need to get posts by user ID here
      setData(posts)
      console.log(posts, 'sss')
    }
    
  }, [])
  
  return (
    <Box padding='24'>
      <Flex justify='center'>
        <List padding='4'>
          <Heading padding='2'>USER ACCOUNT</Heading>
          <ListItem>Email: {user?.email}</ListItem>
          <ListItem>Member since: {user?.created_at}</ListItem>
            </List>
        <Stack spacing='12'>
          <Flex justify='center'>
            <Heading padding='4'> Posts by user.name</Heading>
            </Flex>
        {data?.map((post) => {
          return <Post key={post.id} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} />
        })
        }
      </Stack>
      </Flex>
    </Box>

  )
}

export default Account

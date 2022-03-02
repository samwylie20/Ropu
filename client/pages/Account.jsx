import React, { useState, useEffect } from 'react'
import {
  Stack,
  Flex, 
  Heading, 
  SimpleGrid,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Box,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
  Button,
  List,
  ListItem,
  Center,
  Spinner
} from '@chakra-ui/react'

import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'
import EditProfile from '../components/profile/editProfile'

function Account({ session }) {
  const [data, setData] = useState([])
  const [user, setUser] = useState()
  const [userData, setUserData] = useState()

  useEffect(async () => {
    const user = await supabase.auth.user()

    if (user) {
      console.log(user.id, 'user id')
      console.log('This is the user', user, 'This is their email', user.email)

      setUser(user)

      const { data: posts } = await supabase
        .from('posts')
        .select()
        .eq('auth_id', user.id)
      // Need to get posts by user ID here
      setData(posts)
      console.log(posts, 'Post Data')

      const { data: userInfo } = await supabase
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
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
      </Center>
    )
  } else {
    return (
      <Box padding='24'>
        <Flex justify='center'>
          {
            userData?.map((user, i, arr) => {
              if (arr.length - 1 === i) {
                return <List>
                  <Heading> {user?.user_name} </Heading>
                  <ListItem>Cohort: {user?.cohort_id}</ListItem>
                  <ListItem>Pronouns: {user?.pronouns}</ListItem>
                  <ListItem>Location: {user?.location}</ListItem>
                  <ListItem>Interests: {user?.interests}</ListItem>
                  <ListItem>GitHub: {user?.github_link}</ListItem>
                  <ListItem>LinkedIn {user?.linkedin_link}</ListItem>
                </List>
              }
            })}
          <EditProfile />
          <Stack spacing='12'>
            <Flex justify='center'>
              {
                userData?.map((user, i, arr) => {
                  if (arr.length - 1 === i) {
                    return <Heading> Posts by {user.user_name} </Heading>
                  }
                })}
            </Flex>
            {data?.map((post, index) => {
              return <Post id={post.id} session={session} key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} authorId={post.auth_id} type={post.post_type} url={post.post_url} postCreated={post.created_at} commentsNum={post.no_comments} />
            })
            }
          </Stack>
        </Flex>
      </Box>
    )
  }
}
export default Account

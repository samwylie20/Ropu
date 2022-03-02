import React, { useState, useEffect } from 'react'
import {
  Stack,
  Flex, 
  Heading, 
  SimpleGrid,
  Editable,
  EditableInput,
  EditablePreview,
  Container,
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
      setUserData(userInfo)
    }
  }, [])

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
      <Center>
        <Container maxW='container.xl' >
          <Flex justify='center'>
            {
              userData?.map((user, i, arr) => {
                if (arr.length - 1 === i) {
                  return <Stack spacing='2'>
                    <Text>{user?.user_name}</Text>
                    <EditProfile />
                    Cohort: {user?.cohort_id} | Pronouns: {user?.pronouns} | Location: {user?.location} | Interests: {user?.interests} | GitHub: {user?.github_link} | LinkedIn {user?.linkedin_link}
                  </Stack>
                }
              })}
          </Flex>
          <Stack spacing='12'>
            <Flex justify='center'>
              {
                userData?.map((user, i, arr) => {
                  if (arr.length - 1 === i) {
                    return <Text>Posts by {user.user_name}</Text>
                  }
                })}
            </Flex>
            {data?.map((post, index) => {
              return <Post id={post.id} session={session} key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} authorId={post.auth_id} type={post.post_type} url={post.post_url} postCreated={post.created_at} commentsNum={post.no_comments} />
            })
            }
          </Stack>
        </Container>
      </Center>
    )
  }
}
export default Account

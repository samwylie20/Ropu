import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stack, Center, Spinner, Text, Heading, List, ListItem, Container, Box, HStack } from '@chakra-ui/react'
import Account from '../pages/Account'
import Post from '../components/posts/postItem'

export default function Cohort ({ session }) {
  const param = useParams()
  const [data, setData] = useState()
  const [cohort, setCohort] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    console.log(param)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data: cohort } = await supabase
      .from('users')
      .select()
      .eq('cohort_id', param.id)
    setCohort(cohort)
  }, [])

  useEffect(async () => {
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .eq('user_cohort', param.id)
    setData(postsData)
  }, [])

  useEffect(async () => {
    const { users } = await supabase
      .from('users')
      .select('*')
      .eq('cohort', cohort)
    setUsers(users)
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
      </Center>)
  } else {
    return (
      <Center>
        <Container maxW='container.xl'>
          <Box>
            <Text fontWeight='bold'>Cohort Members:</Text>
            <Text>
              {cohort?.map((name) => {
                return (name.user_name)
              })
              }
            </Text>
          </Box>
          <Stack spacing='6'>
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

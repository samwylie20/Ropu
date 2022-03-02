import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stack, Center, Spinner, Heading, List, ListItem } from '@chakra-ui/react'
import Account from '../pages/Account'
import Post from '../components/posts/postItem'

export default function Cohort ({ cohort, session }) {
  const param = useParams()
  const [data, setData] = useState()
  const [cohort, setCohort] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    console.log(param)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data: cohort, error } = await supabase
      .from('users')
      .select()
      .eq('cohort_id', param.id)
    setCohort(cohort)
  }, [])

  useEffect(async () => {
    const { data, error } = await supabase
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_cohort', param.id)
    setData(data)
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
      <Stack spacing='6'>
        {data?.map((post, index) => {
          return <Post id={post.id} session={session} key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} authorId={post.auth_id} type={post.post_type} url={post.post_url} postCreated={post.created_at} commentsNum={post.no_comments} />
        })
        }
        <Heading> Cohort Members: </Heading>
        {cohort?.map((name) => {
          return <List> <ListItem>{name.user_name}</ListItem> </List>
        }
        )}
      </Stack>
    )
  }
}

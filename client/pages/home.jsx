import React, { useState, useEffect } from 'react'
import { Stack, Spinner, Center } from '@chakra-ui/react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'

export default function Home ({ session }) {
  const [data, setData] = useState()

  useEffect(async () => {
    const { data: posts } = await supabase
      .from('posts')
      .select('*')

    setData(posts)
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
        {
          data?.sort((postA, postB) => {
            return postB.post_votes - postA.post_votes
          })
            .map((post, index) => {
              return <Post session={session} key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} id={post.id}/>
            })
        }
      </Stack>
    )
  }
}

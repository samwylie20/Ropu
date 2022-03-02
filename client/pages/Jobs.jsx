import React, { useState, useEffect } from 'react'
import { Stack, Center, Spinner, Text } from '@chakra-ui/react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'

function Jobs () {
  const [data, setData] = useState([])

  useEffect(async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_type', 'job')
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
  } else if (data.length === 0) {
    return (
      <Center height='100vh'>
        <Text fontWeight='bold' fontSize='lg'>No data</Text>
      </Center>
    )
  } else {
    return (
      <Stack spacing='6'>
        {data?.map((post, index) => {
          return <Post key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} id={post.id} />
        })
        }
      </Stack>
    )
  }
}

export default Jobs

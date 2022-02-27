import React, { useState, useEffect } from 'react'
import { Box, Stack } from '@chakra-ui/react'
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

  return (
    <Stack spacing='6'>
      {data?.map((post, index) => {
        return <Post key={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} />
      })
      }
    </Stack>
  )
}

export default Jobs

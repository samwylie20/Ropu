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

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Box padding="24">
      <Stack spacing='12'>
        {data?.map((posts, index) => {
          return <Post key={posts.id} index= {index} title={posts.post_title} content={posts.post_content} description={posts.post_description} commentsNum={posts.no_comments} url={posts.post_url} />
        })
        }
      </Stack>
    </Box>
  )
}

export default Jobs

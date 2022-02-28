import React, { useEffect, useState } from 'react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'
import { Box, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function Search () {
  const params = useParams()
  const [data, setData] = useState()

  useEffect(async () => {
    console.log(params)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .textSearch('post_title', params.query)

    setData(posts)
  }, [])

  return (

    <Box>
      <Stack spacing='6'>
        {
          data?.sort((postA, postB) => {
            return postB.post_votes - postA.post_votes
          })
            .map((post, index) => {
              return <Post key={post.id} id={post.id} index={index + 1} votes={post.post_votes} title={post.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated={post.created_at} commentsNum={post.no_comments} id={post.id} />
            })
        }
      </Stack>
    </Box>
  )
}

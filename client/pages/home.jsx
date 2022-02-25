import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'

export default function Home () {
  const [data, setData] = useState([])

  useEffect(async () => {
    let { data: post, error } = await supabase
      .from('post')
      .select('*')
    
    setData(post)
  },[])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Box padding="24">
      {data.length > 0 && data?.map((post, index) => {
        <Post index={index} votes="100" title={data.post_title} author='Ryan' authorCohort='Harakeke' type='link' postCreated='23/2/2022' commentsNum="12"/>
      })}
    </Box>
  )
}

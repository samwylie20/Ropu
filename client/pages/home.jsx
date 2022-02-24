import React from 'react'
import { Box } from '@chakra-ui/react'
import Post from '../components/posts/postItem'

export default function Home () {
  return (
    <Box padding="24">
      <Post index='1' votes="100" title="Things you notice when you quit the news (2016)" author='Ryan' authorCohort='Harakeke' type='link' postCreated='23/2/2022' commentsNum="12"/>
    </Box>
  )
}

import React, { useState } from 'react'
import Box from '@chakra-ui/react'

import postItem from '../components/posts/postItem'
import NewPost from '../components/posts/newPost'

const fakePost = {
  type: 'job',
  author: 'Sam',
  description: 'I have covid'
}

const fakePosts = [{}, {}]

// The page should have the ability to make posts to external links (e.g. job posting on other websites) and/or the ability to post details about jobs
// display each element of the object after being mapped

function Jobs () {
  return (
    <Box>
    </Box>
  )
}

export default Jobs

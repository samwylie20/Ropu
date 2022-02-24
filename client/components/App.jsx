import React from 'react'
import Header from './Header'

import { Box } from '@chakra-ui/react'

import Post from './posts/postItem'

function App () {
  return (
    <>
      <Header />
    </>
    <Box padding="24">
      <Post index='1' votes="100" title="Things you notice when you quit the news (2016)" author='Ryan' authorCohort='Harakeke' postCreated='23/2/2022'  commentsNum="12"/>
    </Box>

  )
}

export default App





import React from 'react'

import { Box, Text, Stack, HStack, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, CalendarIcon } from '@heroicons/react/solid'

export default function postItem ({ index, votes, title, author, type, authorCohort, postCreated, commentsNum, description, url }) {
  function handleUpVote (e) {
    console.log('Fired')
  }

  return (
    <HStack spacing='6' width='full'>
      <Box>
        <Text fontSize='xl' fontWeight='bold'>{index}.</Text>
      </Box>
      <Box as='button' paddingX='4' paddingY='2' borderRadius='12' _hover={{
        background: 'gray.50'
      }} onClick={handleUpVote}>
        <HStack>
          <ArrowSmUpIcon height='32px' style={{ marginRight: '5px', marginTop: '-2px' }} />
          <Text fontSize='xl' fontWeight='bold'>{votes}</Text>
        </HStack>
      </Box>
      <LinkBox as='article' width='full' border='1px' borderColor='gray.200' padding='6' borderRadius='16'>
        <HStack align='start' spacing='4'>
          <Box marginTop='1'>
            {type === 'link' && <LinkIcon height='24px' />}
            {type === 'job' && <OfficeBuildingIcon height='24px' />}
            {type === 'code' && <CodeIcon height='24px' />}
            {type === 'events' && <CalendarIcon height='24px' />}
          </Box>
          <Stack>
            <LinkOverlay href='#posturl' target="_blank">
              <Text fontSize='lg' fontWeight='bold'>{title}</Text>
            </LinkOverlay>
            <Text fontSize='md' fontWeight='normal' as='i'>{description}</Text>
            <Text fontSize='sm'>{url}</Text>
            <Text fontSize='sm'>Posted by <Link href='#profilelink' fontWeight='bold' textColor='orange.500'>{author}</Link> from {authorCohort} on {postCreated} | <Link fontWeight='bold' textColor='orange.500' href='#comments'>{commentsNum} comments</Link></Text>
          </Stack>
        </HStack>
      </LinkBox>
    </HStack>
  )
}

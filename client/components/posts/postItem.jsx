import React from 'react'

import { Flex, Box, Text, Stack, HStack, Link } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { ArrowSmUpIcon } from '@heroicons/react/solid'

export default function postItem ({ index, votes, title, author, authorCohort, postCreated, commentsNum }) {
  return (
    <HStack spacing='8' width='full'>
      <Box>
        <Text fontSize='xl' fontWeight='bold'>{index}.</Text>
      </Box>
      <Box as='button' _focus={{
        boxShadow:
      '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
      }}>
        <HStack>
          <ArrowSmUpIcon marginTop='-1' height='32px' marginRight='1' />
          <Text fontSize='xl' fontWeight='bold'>{votes}</Text>
        </HStack>
      </Box>
      <Box width='full' border='1px' borderColor='gray.200' padding='6' borderRadius='16'>
        <Stack>
          <Text fontSize='lg' fontWeight='bold'>{title}</Text>
          <Text>Posted by {author} from {authorCohort} on {postCreated} | <Link>{commentsNum}</Link> comments</Text>
        </Stack>
      </Box>
    </HStack>
  )
}

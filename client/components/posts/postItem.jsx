import React, { useEffect, useState } from 'react'

import { Box, Text, Stack, HStack, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, CalendarIcon } from '@heroicons/react/solid'
import { supabase } from '../../supabaseClient'

export default function postItem ({ session, index, title, author, votes, type, authorCohort, postCreated, commentsNum, description, url, id }) {
  const [countVote, setCountVote] = useState()

  useEffect(async () => {
    const { count } = await supabase
      .from('upvotes')
      .select('post_id', { count: 'exact' })
      .eq('post_id', id)

    setCountVote(count)
  }, [])

  function formatDate (date) {
    const newDate = new Date(date)
    return (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`)
  }

  async function handleUpVote () {
    await supabase
      .from('upvotes')
      .insert([{ post_id: id, auth_id: session.user.id }])
      .eq('id', id)

    const { count } = await supabase
      .from('upvotes')
      .select('post_id', { count: 'exact' })
      .eq('post_id', id)

    setCountVote(count)

    await supabase
      .from('posts')
      .update({ post_votes: count })
      .match({ id: id })
  }

  if (!countVote) {
    return null
  } else {
    return (
      <HStack spacing='6' width='full'>
        <Box>
          <Text fontSize='xl' fontWeight='bold'>{index}.</Text>
        </Box>
        <Box as='button' paddingX='4' paddingY='2' borderRadius='12' _hover={{
          background: 'gray.50'
        }} onClick={(e) => handleUpVote()}>
          <HStack>
            <ArrowSmUpIcon height='32px' style={{ marginRight: '5px', marginTop: '-2px' }} />
            <Text fontSize='xl' fontWeight='bold'>{countVote}</Text>
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
              <Text fontSize='sm'>Posted by <Link href='#profilelink' fontWeight='bold' textColor='orange.500'>{author}</Link> from {authorCohort} on {formatDate(postCreated)} | <Link fontWeight='bold' textColor='orange.500' href='#comments'>{commentsNum} comments</Link></Text>
            </Stack>
          </HStack>
        </LinkBox>
      </HStack>
    )
  }
}

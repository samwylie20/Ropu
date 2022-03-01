import React, { useEffect, useState } from 'react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'
import { Box, Text, HStack, Input, Link, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, CalendarIcon } from '@heroicons/react/solid'

export default function Posts () {
  const params = useParams()
  const [data, setData] = useState()
  const [user, setUser] = useState()
  const [countVote, setCountVote] = useState()

  useEffect(async () => {
    console.log(params)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select()
      .eq('id', params.id

      )

    setData(post[0])
    console.log(post)
  }, [])

  async function handleUpVote (e) {
    const { data, error } = await supabase
      .from('upvotes')
      .insert([
        { auth_id: user.id, post_id: id }
      ])
    setUser()

    if (data) {
      const { data, error, count } = await supabase
        .from('upvotes')
        .select('post_id', { count: 'exact' })
        .eq('post_id', id)
      setCountVote(count)
    }
  }

  function formatDate (date) {
    const newDate = new Date(date)
    return (
        `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    )
  }
  // async function getUser () {
  //   const { data: user, error } = await supabase
  //     .from('users')
  //     .select(`
  //         user_id,
  //         posts (
  //           auth_id
  //           )
  //           `)

  //   console.log(user)
  // }

  return (
    <HStack spacing='6' width='60%'>

      <Box as='button' paddingX='4' paddingY='2' borderRadius='12' _hover={{
        background: 'gray.50'
      }} onClick={handleUpVote}>
        <HStack>
          <ArrowSmUpIcon height='32px' style={{ marginRight: '5px', marginTop: '-2px' }} />
          <Text fontSize='xl' fontWeight='bold'>{data?.post_votes}</Text>
        </HStack>
      </Box>

      <Box marginTop='1'>
        {data?.post_type === 'link' && <LinkIcon height='24px' />}
        {data?.post_type === 'job' && <OfficeBuildingIcon height='24px' />}
        {data?.post_type === 'code' && <CodeIcon height='24px' />}
        {data?.post_type === 'events' && <CalendarIcon height='24px' />}
      </Box>

      <Box>
        <Text fontSize='lg' fontWeight='bold'> {data?.post_title} </Text>
        <Text fontSize='sm' fontWeight='normal' marginTop='2'> {data?.post_description} </Text>
        <Link fontSize='md' textDecoration={'underline'}>{data?.post_url}</Link>
        {/* <Text fontSize='sm'>Posted by <Text fontWeight='bold' textColor='orange.500'>{getUser(data?.user_name)}</Text></Text> */}

        <Box paddingTop='4'>
          <Text fontSize='sm' fontWeight='bold' textColor='orange.500' >Posted: {formatDate(data?.created_at)}</Text>
          <Text fontSize='md'>{data?.post_content}</Text>
        </Box>
        <Box marginTop='4'>
          <Text fontSize='sm' fontWeight='bold' textColor='orange.500' >comments:</Text>
          <Box border='solid' background='gray.50' padding='2' marginBottom='2' borderRadius='8'>
            <Text fontSize='sm' fontWeight='bold'>Gus Hawke</Text>
            <Text fontSize='sm' >{data?.post_comments} </Text>
          </Box>

        </Box>
        <Box width='50%'>
          <Input placeholder='add comment' /><Button>comment</Button>

        </Box>

      </Box>
    </HStack>

  )
}

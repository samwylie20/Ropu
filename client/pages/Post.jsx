import React, { useEffect, useState } from 'react'
import Post from '../components/posts/postItem'
import { supabase } from '../supabaseClient'
import { Stack, Box, Text, HStack, Input, Link, Button, Container, Center, Spinner, Textarea } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ArrowSmUpIcon, LinkIcon, OfficeBuildingIcon, CodeIcon, CalendarIcon } from '@heroicons/react/solid'
import PostComment from '../components/PostComment'

export default function Posts ({ session }) {
  const params = useParams()
  const [data, setData] = useState()
  const [user, setUser] = useState()
  const [comment, setComment] = useState('')
  const [commments, setComments] = useState()

  useEffect(async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select()
      .eq('id', params.id)

    setData(post[0])
    console.log(post)

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', post[0].auth_id)

    const { data: comments } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post[0].id)

    setComments(comments)
    setUser(user[0].user_name)
  }, [])

  useEffect(() => {
    console.log(commments)
  }, [commments])

  function formatDate (date) {
    const newDate = new Date(date)
    return (
        `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    )
  }
  if (!data) {
    return (<Center height='100vh'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='orange.500'
        size='xl'
      />
    </Center>)
  } else {
    return (
      <Center>
        <Container maxW='container.lg'>
          <Stack spacing='4'>
            <HStack>
              {data?.post_type === 'link' && <LinkIcon height='24px' />}
              {data?.post_type === 'job' && <OfficeBuildingIcon height='24px' />}
              {data?.post_type === 'code' && <CodeIcon height='24px' />}
              {data?.post_type === 'events' && <CalendarIcon height='24px' />}
              <Link href={'data?.post_url'} target='_blank'><Text fontSize='lg' fontWeight='bold'> {data?.post_title} </Text></Link>
            </HStack>
            <Text fontWeight='normal' marginTop='2'> {data?.post_description} </Text>
            <Text>Posted by {user}</Text>
            <Text>Posted: {formatDate(data?.created_at)}</Text>
            <Text fontSize='md'>{data?.post_content}</Text>
          </Stack>
          <Stack spacing='4'>
            <Textarea value={comment} onChange={(e) => {
              setComment(e.target.value)
            }}/>
            <Button onClick={async (e) => {
              await supabase
                .from('comments')
                .insert([
                  { auth_id: session.user.id, post_id: data.id, body: comment }
                ])
              setComment('')

              const { data: comments } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', data.id)

              setComments(comments)
              return null
            }}>Add a comment</Button>
          </Stack>
          <Stack marginTop='4'>
            {commments?.map(comment => {
              return (
                <PostComment key={comment.id} id={comment.id} authId={comment.auth_id} comment={comment.body} />
              )
            })}
          </Stack>
        </Container>
      </Center>
    )
  }
}

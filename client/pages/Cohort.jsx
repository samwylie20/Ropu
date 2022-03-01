import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stack, Center, Spinner } from '@chakra-ui/react'
import Account from '../pages/Account'

export default function Cohort ({ cohort }) {
  const param = useParams()
  const [data, setData] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    console.log(param)
    console.log(data)
  }, [data])

  useEffect(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_cohort', param.id)

    setData(data)
  }, [])

  useEffect(async () => {
    const { users, error } = await supabase
      .from('users')
      .select('*')
      .eq('cohort', cohort)
    setUsers(users)
  }, [])

  if (!data) {
    return (
      <Center height='100vh'>
        <Spinner onl
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
      </Center>)
  } else {
    return (
      <Stack spacing='6'>
        {users?.map((users) => {
          return <Account key={users.id} name={users.user_name} />
        })
        }
      </Stack>
    )
  }
}

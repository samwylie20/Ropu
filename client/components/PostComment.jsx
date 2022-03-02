import React, { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'
import { supabase } from '../supabaseClient'

export default function PostComment ({ id, authId, comment }) {
  const [user, setUser] = useState()

  useEffect(async () => {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', authId)
    setUser(user[0])
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  if (!user) {
    return null
  } else {
    return (
      <Text key={id}>{user?.user_name} | {comment}</Text>
    )
  }
}

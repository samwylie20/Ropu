import { Input, Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function Search () {
  const [searchQuery, setSearchQuery] = useState()
  const [data, setData] = useState()

  async function handleSubmit (event) {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .textSearch('post_title', searchQuery)

    console.log(data, error)
    setData(data)
    setSearchQuery()
  }

  return (

    <>
      <HStack>
        <Input
          type={'text'}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          placeholder={'Search for anything'}
        />

        <Button onClick={handleSubmit} paddingX='6'>Search</Button>
      </HStack>

    </>

  )
}

import { Input, Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar () {
  const [searchParams, setSearchParams] = useState()
  const navigate = useNavigate()

  async function handleSubmit (event) {
    navigate(`search/${searchParams}`)
  }

  return (
    <>
      <HStack>
        <Input
          type={'text'}
          onChange={(e) => {
            setSearchParams(e.target.value)
          }}
          placeholder={'Search for anything'}
        />

        <Button onClick={() => {
          handleSubmit()
        }} >Search</Button>
      </HStack>

    </>

  )
}

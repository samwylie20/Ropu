import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Box, Text, Input, Button, Stack } from '@chakra-ui/react'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google'
    })
  }
  return (
    <Box spacing='6' marginTop='6'>
      <Stack spacing='6'>
        <Text fontSize='lg' fontWeight='bold'>
          Sign in via magic link with your email below
        </Text>
        <Box>
          <Input
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            disabled={loading}
          >
            {loading ? <Text>Loading</Text> : <Text>Send magic link</Text>}
          </Button>
        </Box>
        <Box>
          <Button onClick={(e) => signInWithGoogle()}>login with google</Button>
        </Box>
      </Stack>
    </Box>
  )
}

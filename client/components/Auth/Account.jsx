import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function Account ({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile () {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile ({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date()
      }

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal' // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box>
        <FormLabel>Email</FormLabel>
        <Input id='email' type='text' value={session.user.email} disabled />
      </Box>
      <Box>
        <FormLabel htmlFor='username'>Name</FormLabel>
        <Input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box>
        <FormLabel htmlFor='website'>Website</FormLabel>
        <Input
          id='website'
          type='website'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Box>

      <Box>
        <Button
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </Box>

      <Box>
        <Button
          className='button block'
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  )
}

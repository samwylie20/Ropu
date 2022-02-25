import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Box, Container } from '@chakra-ui/react'

import Header from './Header'
// import Home from '../pages/Home'
import Auth from './Auth/Auth'
import Account from './Auth/Account'

function App () {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <Header />
      {/* <Auth />
      <Account /> */}
      {/* <Home /> */}
      <Container>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </Container>
    </>

  )
}

export default App

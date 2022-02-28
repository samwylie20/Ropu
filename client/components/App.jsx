import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Route, Routes } from 'react-router-dom'
import { Box, Divider } from '@chakra-ui/react'
import Header from './Header'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Jobs from '../pages/Jobs'
import Code from '../pages/Code'
import Events from '../pages/Events'
import Top from '../pages/Top'
import Search from '../pages/Search'

function App () {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Box>
      <Header session={session} />
      <Box marginTop='20' paddingY='6' paddingX='12'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='/login' element={<Login key={session?.user?.id} session={session} />} />
          <Route path='/top' element={<Top />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/code' element={<Code />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App

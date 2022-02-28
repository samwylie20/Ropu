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
import Cohort from '../pages/Cohort'
import Account from '../pages/Account'

function App () {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Box marginTop='20' paddingY='6' paddingX='12'>
      <Header session={session} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login key={session?.user?.id} session={session} />} />
          <Route path='/top' element={<Top />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/code' element={<Code />} />
          <Route path='/events' element={<Events />} />
           <Route path='/account' element={<Account  />}  />
          <Route path='cohort'>
            <Route path=":id" element={<Cohort />} />
          </Route>
        </Routes>
      </Box>
    </Box>

  )
}

export default App

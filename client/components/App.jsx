import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from '../pages/home'
import Login from '../pages/Login'
import Jobs from '../pages/Jobs'
import Code from '../pages/Code'
import Events from '../pages/Events'

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login key={session.user.id} session={session} />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/code' element={<Code />} />
        <Route path='/events' element={<Events />} />
      </Routes>
    </>
  )
}

export default App

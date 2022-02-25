import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Login from '../pages/Login'

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
      <Routes>
        <Route path='/login' element={<Login key={session.user.id} session={session} />} />
      </Routes>
    </>

  )
}

export default App

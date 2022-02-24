import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

function App() {
  return (
    <>
      <div className='app'>
        <h1>Ropu</h1>
      </div>
    </>
  )
}

export default App

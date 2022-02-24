import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../helpers/SupabaseClient'
import Auth from './Auth/Auth'
import Account from './Auth/Account'
function AuthHome() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className='container' style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}

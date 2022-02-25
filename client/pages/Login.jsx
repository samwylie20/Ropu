import React from 'react'
import Auth from '../components/Auth/Auth'
import Account from '../components/Auth/Account'
import { Container } from '@chakra-ui/react'

export default function Login ({ session, key }) {
  return (
    <Container>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </Container>
  )
}

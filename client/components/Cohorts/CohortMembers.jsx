import React, { useEffect, useState } from 'react'

import { Box, Text, Stack, HStack, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'
import Account from '../../pages/Account'

// go into the users table - select the users with the same cohort id and display them in the component

// Add a component in the cohorts page that shows other people in the cohort #76

export default function CohortMembers ({ name, cohort }) {
  const [users, setUsers] = useState()

  useEffect(async () => {
    const { users, error } = await supabase
      .from('users')
      .select('*')
      .eq('cohort', cohort)
    setUsers(users)
  }, [])

  return (

    <Stack>
      {users?.map((users) => {
        return <Account key={users.id} users={users.user_name} />
      })
      }
    </Stack>
  )
}

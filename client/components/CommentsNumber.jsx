import React, { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'
import { supabase } from '../supabaseClient'

export default function CommentsNumber ({ postId }) {
  const [commentNum, setCommentNum] = useState()

  useEffect(async () => {
    const { count } = await supabase
      .from('comments')
      .select('post_id', { count: 'exact' })
      .eq('post_id', postId)

    setCommentNum(count)
  })

  return (
    <span>{commentNum} comments</span>
  )
}

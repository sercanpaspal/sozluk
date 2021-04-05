import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import agent, { echo } from '../agent'

const EntryLikeButton = ({ entry }) => {
  const [loading, setLoading] = useState(false)
  const [isLike, setIsLike] = useState(entry.is_like)
  const [likesCount, setLikesCount] = useState(entry.likes_count)

  const channel = `like-${entry.id}`

  useEffect(() => {
    echo.channel(channel).listen('LikeEvent', ({ likesCount }) => {
      setLikesCount(likesCount)
    })

    return () => echo.leaveChannel(channel)
  }, [])

  const like = () => {
    setLoading(true)
    agent.Like.toggle({ entry_id: entry.id })
      .then(() => {
        setIsLike(!isLike)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Button
      onClick={like}
      disabled={loading}
      size="xs"
      colorScheme="blue"
      variant={isLike ? 'solid' : 'outline'}
    >
      {likesCount} beğeni
    </Button>
  )
}

export default EntryLikeButton

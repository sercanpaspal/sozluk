import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import agent from '../agent'
import { useStore } from '../store'

const UserFollowButton = ({ user, size = 'sm' }) => {
  const [state] = useStore()
  const [loading, setLoading] = useState(false)
  const [isFollow, setIsFollow] = useState(!!user.is_follow)

  const follow = () => {
    setLoading(true)
    agent.User.follow(user.username)
      .then(() => setIsFollow(!isFollow))
      .finally(() => setLoading(false))
  }

  return state.user && user.username != state.user.username ? (
    <Button
      disabled={loading}
      onClick={follow}
      colorScheme="green"
      variant={isFollow ? 'solid' : 'outline'}
      size={size}
    >
      {isFollow ? 'Takipten Çık' : 'Takip et'}
    </Button>
  ) : (
    ''
  )
}

export default UserFollowButton

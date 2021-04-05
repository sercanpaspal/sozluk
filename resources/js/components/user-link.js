import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

const UserLink = ({ user }) => {
  return (
    <Link
      as={RouterLink}
      to={`/biri/${user.username}`}
      fontSize="sm"
      fontWeight="semibold"
      color="blue.700"
    >
      {user.name}
    </Link>
  )
}

export default UserLink

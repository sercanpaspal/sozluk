import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

const TopicTag = ({ title }) => (
  <Link
    borderBottom="solid"
    borderBottomColor="green.200"
    _hover={{ bg: 'green.200' }}
    as={RouterLink}
    to={`/ara/${encodeURI(title.trim())}`}
  >
    {title}
  </Link>
)

export default TopicTag

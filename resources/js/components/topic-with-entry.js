import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Entry from './entry'

const TopicWithEntry = ({ topic, entry }) => {
  return (
    <Box
      shadow="sm"
      padding="3"
      bg="blue.50"
      borderRadius="lg"
      border="1px"
      mt="4"
      borderColor="blue.200"
    >
      <Flex>
        <Link to={`/${topic.slug}`}>
          <Heading fontSize="xl">{topic.title}</Heading>
        </Link>
        <Text>({topic.entries_count})</Text>
      </Flex>
      <Box>
        <Entry entry={entry} />
      </Box>
    </Box>
  )
}

export default TopicWithEntry

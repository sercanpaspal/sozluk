import React, { useEffect, useState } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import agent from '../agent'
import LoadingSkeleton from '../components/loading-skeleton'
import TopicWithEntry from './topic-with-entry'
import { usePagination } from '../hooks'

const TopicList = ({ type }) => {
  const [data, loading, meta, page, setPage] = usePagination(() =>
    agent.Topic.get(type, page),
  )

  return loading && page === 1 ? (
    <LoadingSkeleton />
  ) : (
    <Box>
      {data.map((topic) => (
        <TopicWithEntry key={topic.id} topic={topic} entry={topic.entry} />
      ))}
      {((meta && page < meta.last_page) || loading) && (
        <Box p="2">
          <Center>
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Daha da
            </Button>
          </Center>
        </Box>
      )}
    </Box>
  )
}

export default TopicList

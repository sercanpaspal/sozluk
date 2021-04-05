import React, { useEffect } from 'react'
import { Box, List, ListItem, Heading, Button, Center } from '@chakra-ui/react'
import agent, { echo } from '../agent'
import Entry from './entry'
import { usePagination } from '../hooks'
import LoadingSkeleton from './loading-skeleton'

const EntryList = ({ slug }) => {
  const [data, loading, meta, page, setPage, setData] = usePagination(() =>
    agent.Topic.entries(slug, page),
  )

  useEffect(() => {
    echo.channel(slug).listen('EntryEvent', ({ entry }) => {
      setData((d) => [entry, ...d])
    })

    return () => echo.leaveChannel(slug)
  }, [slug])

  return loading && page === 1 ? (
    <LoadingSkeleton />
  ) : (
    <Box>
      <List>
        {data &&
          data.map((entry) => (
            <ListItem key={entry.id}>
              <Entry entry={entry} />
            </ListItem>
          ))}
      </List>
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

export default EntryList

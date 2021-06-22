import React, { useEffect, useState } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import EntryForm from '../components/entry-form'
import LoadingSkeleton from '../components/loading-skeleton'
import { useStore } from '../store'
import agent from '../agent'
import Topic from '../components/topic'

const QueryPage = ({ match }) => {
  const [state] = useStore()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState()
  const query = match.params.q.replace(/\W^ç/gim, ' ').trim()

  useEffect(() => {
    setTopic(null)
    setLoading(true)
    agent.Topic.search(query)
      .then((topic) => setTopic(topic))
      .finally(() => setLoading(false))
  }, [query])

  useEffect(() => {
    document.title = query + ' - Sözlük'
  }, [query])

  return (
    <Container maxW="container.lg" mt="4">
      {loading ? (
        <LoadingSkeleton />
      ) : topic ? (
        <Topic topic={topic} />
      ) : (
        <Box>
          <Heading mb="2">{query}</Heading>
          <Box>Burada bir şey yok</Box>
          {state.user && (
            <EntryForm
              onSuccess={(topic) => setTopic(topic)}
              action={(data) => agent.Topic.store({ ...data, title: query })}
            />
          )}
        </Box>
      )}
    </Container>
  )
}

export default QueryPage

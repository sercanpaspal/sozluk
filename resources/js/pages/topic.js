import React, { useState, useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import Topic from '../components/topic'
import NotFound from '../components/not-found'
import agent from '../agent'
import LoadingSkeleton from '../components/loading-skeleton'

const TopicPage = ({ match }) => {
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    setLoading(true)
    agent.Topic.show(match.params.slug)
      .then((response) => setTopic(response))
      .finally(() => setLoading(false))
  }, [match.params.slug])

  return (
    <Container maxW="container.lg" mt="4">
      {loading ? (
        <LoadingSkeleton />
      ) : topic ? (
        <Topic topic={topic} />
      ) : (
        <NotFound />
      )}
    </Container>
  )
}

export default TopicPage

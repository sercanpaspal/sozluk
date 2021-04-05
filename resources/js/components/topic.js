import React, { useState, useEffect } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import EntryForm from './entry-form'
import agent, { echo } from '../agent'
import LoadingSkeleton from './loading-skeleton'
import EntryList from './entry-list'
import NotFound from './not-found'

const Topic = ({ slug }) => {
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    setLoading(true)
    agent.Topic.show(slug)
      .then((response) => setTopic(response))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (topic) {
      document.title = topic.title + ' - Sözlük'
    }
  }, [topic])

  return loading ? (
    <LoadingSkeleton />
  ) : topic ? (
    <Box>
      <Heading>{topic.title}</Heading>
      <EntryForm
        action={(data) => agent.Entry.store({ ...data, topic_id: topic.id })}
      />

      <EntryList slug={slug} />
    </Box>
  ) : (
    <NotFound />
  )
}

export default Topic

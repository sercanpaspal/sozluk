import React, { useEffect } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import EntryForm from './entry-form'
import agent from '../agent'
import EntryList from './entry-list'

const Topic = ({ topic }) => {
  useEffect(() => {
    if (topic) {
      document.title = topic.title + ' - Sözlük'
    }
  }, [topic])

  return (
    <Box>
      <Heading>{topic.title}</Heading>
      <EntryForm
        action={(data) => agent.Entry.store({ ...data, topic_id: topic.id })}
      />

      <EntryList slug={topic.slug} />
    </Box>
  )
}

export default Topic

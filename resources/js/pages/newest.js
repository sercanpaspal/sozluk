import React, { useEffect } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import TopicList from '../components/topic-list'

const NewestPage = () => {
  useEffect(() => {
    document.title = 'Yeni - Sözlük'
  }, [])

  return (
    <Container maxW="container.lg" mt="4">
      <Heading mb="2">Yeni</Heading>
      <TopicList type="newest" />
    </Container>
  )
}

export default NewestPage

import React, { useEffect } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import TopicList from '../components/topic-list'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Gündem - Sözlük'
  }, [])
  return (
    <Container maxW="container.lg" mt="4">
      <Heading mb="2">Gündem</Heading>
      <TopicList type="latest" />
    </Container>
  )
}

export default HomePage

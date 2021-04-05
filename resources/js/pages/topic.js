import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import Topic from '../components/topic'

const TopicPage = ({ match }) => (
  <Container maxW="container.lg" mt="4">
    <Topic slug={match.params.slug} />
  </Container>
)

export default TopicPage

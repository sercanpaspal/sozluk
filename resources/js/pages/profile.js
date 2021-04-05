import React, { useEffect, useState } from 'react'
import agent from '../agent'
import {
  Container,
  Text,
  Box,
  Heading,
  TabPanels,
  TabPanel,
  Tabs,
  TabList,
  Tab,
  Flex,
  HStack,
} from '@chakra-ui/react'
import LoadingSkeleton from '../components/loading-skeleton'
import TopicWithEntry from '../components/topic-with-entry'
import UserFollowButton from '../components/user-follow-button'
import FollowListButton from '../components/follow-list-button'
import NotFound from '../components/not-found'

const ProfilePage = ({ match }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const username = match.params.username

  useEffect(() => {
    setLoading(true)
    agent.User.show(username)
      .then((user) => setUser(user))
      .finally(() => setLoading(false))
  }, [username])

  useEffect(() => {
    if (user) {
      document.title = user.name + ' - Sözlük'
    }
  }, [user])

  return (
    <Container maxW="container.lg" mt="4">
      {loading ? (
        <LoadingSkeleton />
      ) : user ? (
        <Box>
          <Heading mb="4">
            <Flex alignItems="center">
              <Text mr="3">{user.name}</Text>
              <UserFollowButton user={user} />
            </Flex>
          </Heading>
          <HStack spacing="24px" mb="4">
            <FollowListButton
              listAgent={(page) => agent.User.followers(username, page)}
              title="Takipçiler"
            >
              <Text>Takipçi</Text>
              <Text fontWeight="bold" fontSize="xl">
                {user.followers_count}
              </Text>
            </FollowListButton>
            <FollowListButton
              listAgent={(page) => agent.User.followeds(username, page)}
              title="Takip Edilenler"
            >
              <Text>Takip Edilen</Text>
              <Text fontWeight="bold" fontSize="xl">
                {user.followeds_count}
              </Text>
            </FollowListButton>
          </HStack>
          <Tabs variant="soft-rounded" colorScheme="green" size="sm">
            <TabList>
              <Tab>Girdiler ({user.entries.length})</Tab>
              <Tab>Beğenilenler ({user.likes.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel borderColor="orange" p={0}>
                {user.entries.map((entry, _i) => (
                  <TopicWithEntry key={_i} topic={entry.topic} entry={entry} />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {user.likes.map((like, _i) => (
                  <TopicWithEntry
                    key={_i}
                    topic={like.entry.topic}
                    entry={like.entry}
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <NotFound />
      )}
    </Container>
  )
}

export default ProfilePage

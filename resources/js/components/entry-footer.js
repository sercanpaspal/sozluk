import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import EntryLikeButton from './entry-like-button'
import { useStore } from '../store'
import UserLink from './user-link'
import EntryFooterMenu from './entry-footer-menu'

const EntryFooter = ({ entry, setEntry }) => {
  const [state] = useStore()

  return (
    <Flex>
      <Box>
        <Center>{state.user && <EntryLikeButton entry={entry} />}</Center>
      </Box>
      <Spacer />
      <HStack spacing="2">
        <Text color="gray.500" fontSize="sm">
          {moment(entry.created_at).format('Y.MM.DD H:mm:ss')}
        </Text>
        <UserLink user={entry.user} />

        {state.user && (
          <EntryFooterMenu
            user={state.user}
            entry={entry}
            setEntry={setEntry}
          />
        )}
      </HStack>
    </Flex>
  )
}

export default EntryFooter

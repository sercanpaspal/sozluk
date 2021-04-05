import React, { useState } from 'react'
import { Box, Center, Link, Text } from '@chakra-ui/react'
import EntryFooter from './entry-footer'
import TopicTag from './topic-tag'
import { ExternalLinkIcon } from '@chakra-ui/icons'

var replace = require('string-replace-to-array')

const Entry = ({ entry }) => {
  const [e, setEntry] = useState(entry)

  let content = e.content

  content = replace(content, /`([\w\sşŞöÖçÇğĞüÜı]+)`/gim, (match, group) => (
    <TopicTag title={group} />
  ))

  content = replace(
    content,
    /\[([\w\sşŞöÖçÇğĞüÜı]+)\]\((.+)\)/gim,
    (match, groupOne, groupTwo) => {
      return (
        <>
          <Link
            borderBottom="solid"
            borderBottomColor="blue.200"
            _hover={{ bg: 'blue.200' }}
            target={'_blank'}
            href={groupTwo}
          >
            {groupOne}
          </Link>
          <ExternalLinkIcon fontSize="xs" />
        </>
      )
    },
  )

  content = replace(content, /(?:\r\n|\r|\n)/g, () => <br />)

  return (
    <Box
      padding="2"
      bg={e.deleted ? 'red.100' : 'gray.50'}
      borderRadius="lg"
      border="1px"
      mt="2"
      borderColor="gray.200"
    >
      {e.deleted ? (
        <Center>
          <Text fontSize="lg">
            <strong>Silindi</strong>, belki ileride buraya geri al seçeneği
            koyulabilir.
          </Text>
        </Center>
      ) : (
        <Box>
          <Box mb="3">
            {content.map((c, _i) => (
              <span key={_i}>{c}</span>
            ))}
          </Box>
          <EntryFooter entry={e} setEntry={setEntry} />
        </Box>
      )}
    </Box>
  )
}

export default Entry

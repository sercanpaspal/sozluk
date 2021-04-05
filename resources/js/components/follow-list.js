import React, { useState, useEffect } from 'react'
import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import UserFollowButton from './user-follow-button'
import LoadingSkeleton from './loading-skeleton'
import UserLink from './user-link'
import { usePagination } from '../hooks'

const FollowList = ({ listAgent }) => {
  const [data, loading, meta, page, setPage] = usePagination(() =>
    listAgent(page),
  )

  return loading && page === 1 ? (
    <LoadingSkeleton />
  ) : (
    <Table variant="striped" colorScheme="gray" size="sm" mb="2">
      <TableCaption>
        {((meta && page < meta.last_page) || loading) && (
          <Button
            size="sm"
            colorScheme="blue"
            isLoading={loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Daha da
          </Button>
        )}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Kullanıcı ismi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((user, _i) => (
          <Tr key={_i}>
            <Td>
              <UserLink user={user} />
            </Td>
            <Td textAlign="right">
              <UserFollowButton size="xs" user={user} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default FollowList

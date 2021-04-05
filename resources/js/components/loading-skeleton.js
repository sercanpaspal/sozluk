import { Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'

const LoadingSkeleton = () => (
  <Stack>
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
  </Stack>
)

export default LoadingSkeleton

import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link, withRouter } from 'react-router-dom'

const LinkButton = withRouter(
  ({ children, to, location, colorScheme, variant, size }) => (
    <Button
      as={Link}
      to={to}
      isActive={location.pathname === to}
      colorScheme={colorScheme}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  ),
)

export default LinkButton

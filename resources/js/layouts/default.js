import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Heading,
  Flex,
  Link,
  Button,
  ButtonGroup,
  MenuGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  LinkBox,
} from '@chakra-ui/react'
import { useStore, LOGOUT } from '../store'
import LinkButton from '../components/link-button'
import Search from '../components/search'

const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(false)
  const [{ user }, dispatch] = useStore()

  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="gray.100"
        color="dark"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            <Link as={RouterLink} to="/" color="blue.600">
              Sözlük
            </Link>
          </Heading>
        </Flex>

        <Box
          display={{ base: 'block', md: 'none' }}
          onClick={() => setShow((s) => !s)}
        >
          <svg
            fill="black"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', md: 'auto' }}
          mr="3"
          alignItems="center"
        >
          <ButtonGroup>
            <LinkButton
              to="/"
              size="sm"
              colorScheme="blackAlpha"
              variant="ghost"
            >
              Gündem
            </LinkButton>
            <LinkButton
              to="/yeni"
              size="sm"
              colorScheme="blackAlpha"
              variant="ghost"
            >
              Yeni
            </LinkButton>
          </ButtonGroup>
        </Box>

        <Box flexGrow={1}>
          <Search />
        </Box>

        <Box
          ml="3"
          display={{ sm: show ? 'block' : 'none', md: 'block' }}
          mt={{ base: 4, md: 0 }}
        >
          {user ? (
            <Flex alignItems="center">
              <Menu>
                <MenuButton as={Button} colorScheme="blue">
                  {user.name}
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profil">
                    <MenuItem as={RouterLink} to={`/biri/${user.username}`}>
                      Hesabım
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={() => dispatch({ type: LOGOUT })}>
                    Çıkış Yap
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <ButtonGroup>
              <LinkButton to="/giris" colorScheme="blue" variant="ghost">
                Giriş Yap
              </LinkButton>
              <LinkButton to="/kayit" colorScheme="blue" variant="outline">
                Kayıt Ol
              </LinkButton>
            </ButtonGroup>
          )}
        </Box>
      </Flex>
      {children}
    </div>
  )
}

export default DefaultLayout

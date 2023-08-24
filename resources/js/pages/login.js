import React, { useEffect } from 'react'
import {
  useToast,
  Container,
  Heading,
  Box,
  Text,
  Button,
} from '@chakra-ui/react'
import Form from '../components/form'
import agent from '../agent'
import { Link as RouterLink } from 'react-router-dom'
import { useStore, LOGIN } from '../store'

const LoginPage = (props) => {
  const toast = useToast()
  const [, dispatch] = useStore()

  useEffect(() => {
    document.title = 'Giriş Yap - Sözlük'
  }, [])

  const onSubmit = (data, { setSubmitting, setErrors }) => {
    agent.Auth.login(data)
      .then((response) => {
        dispatch({ type: LOGIN, payload: response })
      })
      .catch(({ message, errors }) => {
        if (errors) {
          setErrors(errors)
        } else if (message) {
          toast({
            title: 'Hata!',
            description: message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .then(() => setSubmitting(false))
  }

  const fields = [
    { name: 'email', label: 'E-Posta Adresi', type: 'email', value: '' },
    { name: 'password', label: 'Şifre', type: 'password', value: '' },
  ]

  return (
    <Container>
      <Box maxW="3xl" p="6">
        <Heading>Giriş Yap</Heading>
        <Text fontSize="lg">
          Henüz bir hesabın yok mu?{' '}
          <Button colorScheme="blue" variant="link" as={RouterLink} to="/kayit">
            Kayıt ol
          </Button>
        </Text>
        <Form onSubmit={onSubmit} fields={fields} submitButtonText="Giriş" />
      </Box>
    </Container>
  )
}

export default LoginPage

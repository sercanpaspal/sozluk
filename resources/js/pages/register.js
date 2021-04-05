import React, { useEffect } from 'react'
import {
  useToast,
  Container,
  Heading,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import agent from '../agent'
import Form from '../components/form'
import { Link as RouterLink } from 'react-router-dom'
import { useStore, LOGIN } from '../store'

const RegisterPage = () => {
  const toast = useToast()
  const [state, dispatch] = useStore()

  useEffect(() => {
    document.title = 'Kayıt Ol - Sözlük'
  }, [])

  const onSubmit = (data, { setSubmitting, setErrors }) => {
    agent.Auth.register(data)
      .then(function (response) {
        toast({
          title: 'Success!',
          description: 'Account created!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        dispatch({ type: LOGIN, payload: response })
      })
      .catch(function ({ message, errors = null }) {
        if (errors) {
          setErrors(errors)
        } else if (message) {
          toast({
            title: 'Error!',
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
    { name: 'name', label: 'İsim', type: 'text', value: '' },
    { name: 'email', label: 'E-Posta adresi', type: 'email', value: '' },
    { name: 'password', label: 'Şifre', type: 'password', value: '' },
    {
      name: 'password_confirmation',
      label: 'Şifre onayı',
      type: 'password',
      value: '',
    },
  ]

  return (
    <Container>
      <Box maxW="3xl" p="6">
        <Heading>Kayıt Ol</Heading>
        <Text fontSize="lg">
          Zaten bir hesabın var mı?{' '}
          <Button colorScheme="blue" variant="link" as={RouterLink} to="/giris">
            Giriş yap
          </Button>{' '}
          madem.
        </Text>
        <Form onSubmit={onSubmit} fields={fields} submitButtonText="Kayıt ol" />
      </Box>
    </Container>
  )
}

export default RegisterPage

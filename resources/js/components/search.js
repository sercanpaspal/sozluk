import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import history from '../history'
import { SearchIcon } from '@chakra-ui/icons'

const Search = () => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false)
          history.push('/ara/' + values.query)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field
            name="query"
            validate={(value) => (!value ? 'Required' : false)}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.query && form.touched.query}>
                <InputGroup size="md">
                  <Input
                    {...field}
                    id="query"
                    borderColor="blue"
                    pr="3rem"
                    placeholder="Ara bir şeyler.."
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      icon={<SearchIcon />}
                      type="submit"
                      isLoading={props.isSubmitting}
                      h="1.75rem"
                      size="sm"
                      colorScheme="blue"
                    >
                      ara
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default Search

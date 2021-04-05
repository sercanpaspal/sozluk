import React from 'react'
import { useStore } from '../store'
import { Formik, Form as FormikForm, Field } from 'formik'
import FormField from './form-field'
import { Box, Button, ButtonGroup, Flex, Spacer } from '@chakra-ui/react'

const EntryForm = ({ action, onSuccess, initialValues = { content: '' } }) => {
  const [state] = useStore()
  const onSubmit = (data, { setSubmitting, setErrors, resetForm }) => {
    action({ ...data })
      .then((response) => {
        onSuccess && onSuccess(response)
        resetForm()
      })
      .catch(({ errors }) => {
        if (errors) {
          setErrors(errors)
        }
      })
      .finally(() => setSubmitting(false))
  }

  return state.user ? (
    <Box mb="5">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, values }) => (
          <FormikForm>
            <Field name="content">
              {({ field, form }) => (
                <FormField
                  field={{
                    type: 'textarea',
                    name: 'content',
                    label: 'İçerik',
                    value: '',
                    isInvalid:
                      form.errors[field.name] && form.touched[field.name],
                    error: form.errors[field.name],
                    ...field,
                  }}
                />
              )}
            </Field>
            <Flex mt={4}>
              <ButtonGroup size="xs">
                <Button
                  onClick={() =>
                    setFieldValue('content', values.content + '(bkz: `başlık`)')
                  }
                >
                  bkz
                </Button>
                <Button
                  onClick={() =>
                    setFieldValue(
                      'content',
                      values.content + '[bağlantı adı](http://)',
                    )
                  }
                >
                  link
                </Button>
              </ButtonGroup>
              <Spacer />
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Yolla
              </Button>
            </Flex>
          </FormikForm>
        )}
      </Formik>
    </Box>
  ) : (
    ''
  )
}

export default EntryForm

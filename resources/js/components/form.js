import React from 'react'
import { Formik, Form as FormikForm, Field } from 'formik'
import FormField from './form-field'
import { Button } from '@chakra-ui/react'

const Form = ({
  fields,
  onSubmit,
  initialValues = {},
  submitButtonText = 'Submit',
}) => {
  return (
    <Formik
      initialValues={{
        ...Object.fromEntries(fields.map((field) => [field.name, field.value])),
        ...initialValues,
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          {fields.map((fieldItem) => (
            <Field name={fieldItem.name} key={fieldItem.name}>
              {({ field, form }) => (
                <FormField
                  field={{
                    ...fieldItem,
                    isInvalid:
                      form.errors[field.name] && form.touched[field.name],
                    error: form.errors[field.name],
                    ...field,
                  }}
                />
              )}
            </Field>
          ))}

          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default Form

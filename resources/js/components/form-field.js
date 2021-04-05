import React from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react'
import FormFieldSelect from './form-field-select'

const FormField = ({ field }) => {
  const FieldComponent = () => {
    switch (field.type) {
      case 'textarea':
        return Textarea
      case 'select':
        return FormFieldSelect
      default:
        return Input
    }
  }

  return (
    <FormControl id={field.name} mt={4} isInvalid={field.isInvalid}>
      <FormLabel>{field.label}</FormLabel>
      {React.createElement(FieldComponent(), { ...field })}
      <FormErrorMessage>{field.error}</FormErrorMessage>
      {field.helperText && <FormHelperText>{field.helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FormField

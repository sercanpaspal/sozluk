import { Select } from '@chakra-ui/select'
import React from 'react'

const FormFieldSelect = ({ options = [], ...props }) => {
  return (
    <Select {...props}>
      {options.map((option, _i) => (
        <option value={option.value} key={_i}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default FormFieldSelect

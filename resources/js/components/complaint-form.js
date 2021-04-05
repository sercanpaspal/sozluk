import { Box } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import React, { useEffect, useState } from 'react'
import agent from '../agent'
import Form from './form'

const ComplaintForm = ({ complaint, onSuccess }) => {
  const toast = useToast()
  const [complaintSubjects, setComplaintSubjects] = useState([])

  useEffect(() => {
    agent.ComplaintSubject.options().then((response) =>
      setComplaintSubjects(response),
    )
  }, [])

  const onSubmit = (data, { setSubmitting, setErrors }) => {
    agent.Complaint.store(data)
      .then((response) => {
        onSuccess(response)
        toast({
          title: 'Başarılı!',
          description: 'Şikayet iletildi!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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
      .finally(() => setSubmitting(false))
  }

  const fields = [
    {
      name: 'complaint_subject_id',
      label: 'Şikayet Konusu',
      type: 'select',
      options: complaintSubjects,
      value: '',
      placeholder: 'Lütfen şikayet konusu seçiniz',
    },
    { name: 'content', label: 'Şikayet İçeriği', type: 'textarea', value: '' },
  ]

  return (
    <Box mb="5">
      <Form
        initialValues={complaint}
        onSubmit={onSubmit}
        fields={fields}
        submitButtonText="Oluştur"
      />
    </Box>
  )
}

export default ComplaintForm

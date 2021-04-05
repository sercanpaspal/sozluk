import React, { useRef } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import ComplaintForm from './complaint-form'

const CompliantCreateModal = ({ children, entry }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef()
  const finalRef = useRef()

  return (
    <>
      {children(onOpen)}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Şikayet Oluştur</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ComplaintForm
              complaint={{ entry_id: entry.id }}
              onSuccess={() => onClose()}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CompliantCreateModal

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
import EntryForm from './entry-form'
import agent from '../agent'

const EntryEditModal = ({ children, entry, setEntry }) => {
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
          <ModalHeader>Düzenle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EntryForm
              initialValues={entry}
              action={(data) => agent.Entry.update(entry.id, data)}
              onSuccess={(entry) => {
                setEntry((e) => ({ ...e, ...entry }))
                onClose()
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EntryEditModal

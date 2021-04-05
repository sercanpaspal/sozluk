import React, { useState, useRef } from 'react'
import {
  useDisclosure,
  useToast,
  Button,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'

const DeleteButton = ({ children, title, message, action, onDeleted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = useRef()
  const [loading, setLoading] = useState(false)

  const onDelete = () => {
    setLoading(true)
    action().then(() => {
      setLoading(false)
      onClose()
      toast({ title: 'Silindi!', status: 'info' })
      onDeleted()
    })
  }

  return (
    <>
      {children(onOpen, loading)}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button size="sm" ref={cancelRef} onClick={onClose}>
              Hayır
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              ml={3}
              onClick={onDelete}
              isLoading={loading}
            >
              Evet
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteButton

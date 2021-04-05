import React from 'react'
import {
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import FollowList from './follow-list'
import { useStore } from '../store'

const FollowListButton = ({ children, title, listAgent }) => {
  const [state] = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return state.user ? (
    <>
      <Link onClick={onOpen} colorScheme="blue">
        {children}
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FollowList listAgent={listAgent} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : (
    children
  )
}

export default FollowListButton

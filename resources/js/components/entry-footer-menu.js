import React from 'react'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import EntryEditModal from './entry-edit-modal'
import CompliantCreateModal from './complaint-create-modal'
import EntryDeleteButton from './entry-delete-button'

const EntryFooterMenu = ({ user, entry, setEntry }) => (
  <Box>
    {user.username === entry.user.username ? (
      <ButtonGroup>
        <EntryEditModal entry={entry} setEntry={setEntry}>
          {(onOpen) => (
            <Button size="xs" onClick={onOpen} variant="outline">
              düzenle
            </Button>
          )}
        </EntryEditModal>
        <EntryDeleteButton
          entry={entry}
          onDeleted={() => setEntry({ ...entry, deleted: true })}
        >
          {(onDelete, loading) => (
            <Button
              onClick={onDelete}
              isLoading={loading}
              size="xs"
              colorScheme="red"
              variant="ghost"
            >
              sil
            </Button>
          )}
        </EntryDeleteButton>
      </ButtonGroup>
    ) : (
      <CompliantCreateModal entry={entry}>
        {(onOpen) => (
          <Button size="xs" onClick={onOpen} variant="outline">
            şikayet et
          </Button>
        )}
      </CompliantCreateModal>
    )}
  </Box>
)

export default EntryFooterMenu

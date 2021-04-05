import React from 'react'
import agent from '../agent'
import DeleteButton from './delete-button'

const EntryDeleteButton = ({ entry, ...props }) => {
  return (
    <DeleteButton
      title="Girdiyi Sil"
      message={`Giridinizi silmek istediğinizden emin misiniz?`}
      action={() => agent.Entry.destroy(entry.id)}
      {...props}
    />
  )
}

export default EntryDeleteButton

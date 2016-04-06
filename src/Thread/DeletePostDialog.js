import React from 'react'
import SettingsModal from '../Admin/SettingsModal'

const DeletePostDialog = ({ visible, save, hide }) => {
  return (
    <SettingsModal
      title="Delete post?"
      visible={visible}
      hide={hide}
      save={save}
      saveText="Delete"
      width="small">
      Do you really want to delete this post?
    </SettingsModal>
  )
}

export default DeletePostDialog

import React from 'react'
import { Button } from 'elemental'
import { styles } from 'refire-app'
import SettingsModal from '../Admin/SettingsModal'

const DeletePostDialog = ({ visible, save, hide, styles }) => {
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

export default styles({
}, DeletePostDialog)

import React from 'react'
import { Button } from 'elemental'
import { styles } from 'refire-app'
import SettingsModal from '../Admin/SettingsModal'

const DeleteDialog = ({ visible, save, hide, title="", styles }) => {
  return (
    <SettingsModal
      title="Delete thread?"
      visible={visible}
      hide={hide}
      save={save}
      saveText="Delete"
      width="small">
      Do you really want to delete thread <strong>{title}</strong>?
    </SettingsModal>
  )
}

export default styles({
}, DeleteDialog)

import React from 'react'
import SettingsModal from '../Admin/SettingsModal'

const LockDialog = ({ visible, save, hide, locked, title="" }) => {
  const text = locked ? "Unlock" : "Lock"
  const confirmText = locked ? "unlock" : "lock"
  return (
    <SettingsModal
      title={`${text} thread?`}
      visible={visible}
      hide={hide}
      save={save}
      saveText={text}
      width="small">
      Do you really want to {confirmText} thread <strong>{title}</strong>?
    </SettingsModal>
  )
}

export default LockDialog

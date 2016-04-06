import React from 'react'
import SettingsModal from '../Admin/SettingsModal'

const Settings = ({ visible, toggleVisible }) => {
  return (
    <SettingsModal
      title="Board settings"
      visible={visible}
      hide={toggleVisible}
      save={toggleVisible}>
      Not implemented yet.
    </SettingsModal>
  )
}

export default Settings

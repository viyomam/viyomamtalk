import React from 'react'
import SettingsModal from '../Admin/SettingsModal'

const UserSettings = ({ visible, toggleVisible }) => {
  return (
    <SettingsModal
      title="Settings"
      visible={visible}
      hide={toggleVisible}
      save={toggleVisible}>
      Not implemented yet.
    </SettingsModal>
  )
}

export default UserSettings

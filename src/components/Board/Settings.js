import React from 'react'
import { Button } from 'elemental'
import { styles } from 'refire-app'
import SettingsModal from '../Admin/SettingsModal'

const Settings = ({ visible, toggleVisible, styles }) => {
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

export default styles({
}, Settings)

import React from 'react'
import { styles } from 'refire-app'
import { FormField, FormInput, Radio } from 'elemental'
import SettingsModal from '../Admin/SettingsModal'

const UserSettings = ({ visible, toggleVisible, user, styles }) => {
  if (!user) {
    return <div />
  }
  return (
    <SettingsModal
      title="Settings"
      visible={visible}
      hide={toggleVisible}
      save={toggleVisible}
      saveText="Apply"
      Footer={() => <div/>}>

      <div>
        <FormField label="Theme">
          <Radio name="inline_radios" label="Light (default)" defaultChecked />
          <Radio name="inline_radios" label="Dark" />
        </FormField>
      </div>

    </SettingsModal>
  )
}

export default UserSettings

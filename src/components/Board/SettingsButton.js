import React from 'react'
import { Button } from 'elemental'
import { styles } from 'refire-app'

const SettingsButton = ({ visible, toggleVisible, styles }) => {
  if (visible) {
    return (
      <Button className={styles.button} onClick={() => toggleVisible()}>
        Settings
      </Button>
    )
  } else {
    return <span />
  }
}

export default styles({
  button: {
    width: "100%",
    "@media (min-width: 480px)": {
      width: "auto",
      marginRight: "10px"
    }
  }
}, SettingsButton)

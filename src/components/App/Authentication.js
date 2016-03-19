import React from 'react'
import { FirebaseOAuth, FirebaseLogout, styles } from 'refire-app'
import { Button } from 'elemental'

const Authentication = ({ user, styles }) => {
  if (user) {
    return (
      <FirebaseLogout>
        <Button className={styles.button}>Logout</Button>
      </FirebaseLogout>
    )
  } else {
    return (
      <FirebaseOAuth provider="google" flow="authWithOAuthPopup">
        <Button className={styles.button}>Login with Google</Button>
      </FirebaseOAuth>
    )
  }
}

const css = {
  button: {
    position: "absolute",
    right: "20px"
  }
}

export default styles(css, Authentication)

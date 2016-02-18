import React from 'react'
import { Firebase, FirebaseOAuth, FirebaseLogout, styles } from 'refire-app'
import { Button } from 'elemental'
import url from '../../url'

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

export default styles({
  button: {
    position: "absolute",
    right: "20px"
  }
}, Authentication)

import React from 'react'
import { Firebase, FirebaseOAuth, styles } from 'refire-app'
import { Button } from 'elemental'
import url from '../../url'

function logout() {
  new Firebase(url).unauth()
}

const Authentication = ({ user, styles }) => {
  if (user) {
    return (
      <Button className={styles.button} onClick={() => logout()}>Logout</Button>
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

import React from 'react'
import { Button } from 'elemental'
import { styles } from 'refire-app'

const NewTopicButton = ({ user, newTopic, styles }) => {
  if (user) {
    return (
      <Button className={styles.button} onClick={() => newTopic()}>
        New topic
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
      position: "absolute",
      right: "0px"
    }
  }
}, NewTopicButton)

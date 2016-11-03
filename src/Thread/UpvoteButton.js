import React from 'react'
import { styles } from 'refire-app'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'

const UpvoteButton = ({ user, upvotes, liked, onClick, styles }) => {
  if (user) {
    if (!liked) {
      return (
        <span onClick={onClick} title="Upvote">
          <span className={styles.button}>
            <FaThumbsOUp size="20px" /> {upvotes}
          </span>
        </span>
      )
    } else {
      return (
        <span onClick={onClick} title="Upvote">
          <span className={styles.buttonActive}>
            <FaThumbsUp size="20px" /> {upvotes}
          </span>
        </span>
      )
    }
  } else {
    return <span />
  }
}

const css = {
  button: {
    cursor: "pointer",
    color: "#555",
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
  },

  buttonActive: {
    cursor: "pointer",
    color: "#55f",
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
  },
}

export default styles(css, UpvoteButton)

import React from 'react'
import { Link, styles } from 'refire-app'
import Authentication from './Authentication'
import BoardLink from './BoardLink'

const TopBar = (props) => {
  const { authenticatedUser, board, boardKey, threadKey, styles } = props
  return (
    <div className={styles.topBarContainer}>
      <div className={styles.topbar}>
        <h1 className={styles.header}>
          <Link to="/">refire</Link>
          <BoardLink
            board={board}
            boardKey={boardKey}
            threadKey={threadKey} />
        </h1>
        <Authentication user={authenticatedUser} />
      </div>
    </div>
  )
}

const css = {
  topBarContainer: {
    position: "fixed",
    left: 0,
    right: 0,
    height: "50px",
    zIndex: 1,
    background: "#fdfdfd",
  },
  topbar: {
    position: "relative",
    maxWidth: "940px",
    margin: "0 auto",
    height: "50px",
    padding: "7px 20px"
  },
  header: {
    display: "inline-block",
    margin: 0,
    paddingTop: "12px",
    fontSize: "14px",
    "@media (min-width: 480px)": {
      paddingTop: "5px",
      fontSize: "20px",
    }
  }
}

export default styles(css, TopBar)

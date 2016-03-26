import React from 'react'
import { Link, styles } from 'refire-app'
import AuthenticationButton from './AuthenticationButton'
import BoardLink from './BoardLink'
import SettingsButton from './SettingsButton'

const TopBar = ({
  authenticatedUser,
  board,
  boardKey,
  threadKey,
  toggleSettings,
  user,
  styles
}) => {
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
        <div className={styles.buttonsContainer}>
          <SettingsButton user={user} toggleVisible={toggleSettings} />
          <AuthenticationButton user={authenticatedUser} />
        </div>
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
  },
  buttonsContainer: {
    position: "absolute",
    right: "20px",
    top: "8px"
  }
}

export default styles(css, TopBar)

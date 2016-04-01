import React, { Component } from 'react'
import { bindings, styles } from 'refire-app'
import TopBar from './App/TopBar'
import LoadingSpinner from './App/LoadingSpinner'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { _status: { connected, initialFetchDone }, authenticatedUser, styles } = this.props
    const { key: boardKey, value: board = {} } = this.props.board || {}
    const { key: threadKey } = this.props.thread || {}
    const { value: settings } = this.props.settings || {}
    const loading = !connected || !initialFetchDone || !settings

    if (loading) {
      return <LoadingSpinner />
    }

    return (
      <div className={styles.app}>
        <TopBar
          authenticatedUser={authenticatedUser}
          board={board}
          boardKey={boardKey}
          threadKey={threadKey} />
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const css = {
  app: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "0 20px"
  },
  body: {
    paddingTop: "60px"
  }
}

export default styles(
  css,
  bindings(
    ["_status", "board", "thread", "settings"],
    ["authenticatedUser"]
  )(App)
)

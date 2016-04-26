import React, { Component } from 'react'
import { bindings } from 'refire-app'
import themes from '../themes'

import App from './App'

class Index extends Component {
  render() {
    const { _status: { connected, initialFetchDone }, authenticatedUser, children } = this.props
    const { key: boardKey, value: board = {} } = this.props.board || {}
    const { key: threadKey } = this.props.thread || {}
    const { value: settings } = this.props.settings || {}
    const { value: user } = this.props.user || {}
    const { settings: { theme = "light" } = {} } = user || {}
    const loading = !connected || !initialFetchDone || !settings
    const currentTheme = themes[theme]

    return (
      <App
        loading={loading}
        user={user}
        board={board}
        boardKey={boardKey}
        threadKey={threadKey}
        authenticatedUser={authenticatedUser}
        theme={currentTheme.App}
        styles={currentTheme.App.App}
      >
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, { theme: currentTheme })
          })
        }
      </App>
    )
  }
}

export default bindings(
  ["_status", "board", "thread", "settings", "user"],
  ["authenticatedUser"]
)(Index)

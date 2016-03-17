import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { bindings, Link, FirebaseWrite, styles } from 'refire-app'
import { Button, Card, Spinner, Pagination } from 'elemental'
import sortBy from 'lodash/collection/sortBy'
import drop from 'lodash/array/drop'
import take from 'lodash/array/take'
import find from 'lodash/collection/find'
import { isUserAdmin } from '../utils'

import NewThreadsAvailable from './Board/NewThreadsAvailable'
import NewThreadButton from './Board/NewThreadButton'
import PostNewThread from './Board/PostNewThread'
import Threads from './Board/Threads'
import ShowPagination from './Board/ShowPagination'
import SettingsButton from './Board/SettingsButton'
import BoardSettings from './Board/Settings'

class Board extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      threads: null,
      settingsVisible: false
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.focusNewThread = this.focusNewThread.bind(this)
    this.showNewThreads = this.showNewThreads.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  componentWillMount() {
    if (this.props.boardThreads && this.props.boardThreads.value) {
      this.setState({ threads: this.props.boardThreads.value })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boardThreads && nextProps.boardThreads.value) {
      if (this.state.threads) {
        const nextThreads = nextProps.boardThreads.value
        this.setState({
          threads: this.state.threads.reduce((result, thread) => {
            const nextThread = find(nextThreads, (next) => thread.key === next.key)
            if (nextThread && nextThread.value) {
                // update only posts count
                // TODO: update timestamp, but how to keep the sorting?
                return [
                  ...result,
                  {
                    ...thread,
                    value: {
                      ...thread.value,
                      posts: nextThread.value.posts
                    }
                  }
                ]
            } else {
              return result
            }
          }, [])
        })
      } else {
        this.setState({ threads: nextProps.boardThreads.value })
      }
    }
  }

  handlePageSelect(page) {
    this.setState({ currentPage: page })
  }

  focusNewThread() {
    if (this.titleInput) {
      this.titleInput.focus()
    }
  }

  showNewThreads() {
    this.setState({ threads: this.props.boardThreads.value, currentPage: 1 })
  }

  toggleSettings() {
    this.setState({ settingsVisible: !this.state.settingsVisible })
  }

  render() {
    const { key: boardId, value: board = [] } = this.props.board || {}
    const { value: boardThreads } = this.props.boardThreads || {}
    const { value: settings = {} } = this.props.settings || {}
    const { authenticatedUser: user, styles } = this.props
    const { BOARD_PAGE_SIZE } = settings
    const threads = this.state.threads || []
    const isAdmin = isUserAdmin(this.props.adminUsers, this.props.authenticatedUser)

    const pagedThreads = take(
      drop(
        sortBy(
          threads,
          (thread) => (thread.value || {}).lastPostAt
        ).reverse(),
        (this.state.currentPage - 1) * BOARD_PAGE_SIZE
      ),
      BOARD_PAGE_SIZE
    )

    return (
      <div>
        <BoardSettings
          visible={this.state.settingsVisible}
          toggleVisible={this.toggleSettings} />
        <Card>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>
              {board.title}
            </h2>
            <div className={styles.buttonsContainer}>
              <SettingsButton visible={isAdmin} toggleVisible={this.toggleSettings} />
              <NewThreadButton user={user} newThread={this.focusNewThread} />
            </div>
          </div>
          <NewThreadsAvailable
            threads={threads}
            nextThreads={boardThreads}
            showNewThreads={this.showNewThreads} />
          <Threads
            boardId={boardId}
            threads={pagedThreads}
            loaded={!!boardThreads} />
          <ShowPagination
            currentPage={this.state.currentPage}
            handlePageSelect={this.handlePageSelect}
            threads={threads}
            pageSize={BOARD_PAGE_SIZE} />
        </Card>
        <PostNewThread
          boardId={boardId}
          user={user}
          inputRef={(input) => { this.titleInput = input}}
          showNewThreads={this.showNewThreads} />
      </div>
    )
  }
}

export default styles({
  buttonsContainer: {
    "@media (min-width: 480px)": {
      position: "absolute",
      right: "0px",
      top: "0px"
    }
  },
  headerContainer: {
    position: "relative"
  },
  header: {
    minHeight: "28px",
    "@media (min-width: 480px)": {
      display: "inline-block"
    }
  }
}, bindings(["board", "boardThreads", "adminUsers", "settings"], ["authenticatedUser"])(Board))

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { bindings, Link, FirebaseWrite, styles } from 'refire-app'
import { Button, Card, Spinner, Pagination } from 'elemental'
import sortBy from 'lodash/collection/sortBy'
import drop from 'lodash/array/drop'
import take from 'lodash/array/take'
import find from 'lodash/collection/find'

import NewThreadsAvailable from './Board/NewThreadsAvailable'
import NewTopicButton from './Board/NewTopicButton'
import PostNewTopic from './Board/PostNewTopic'
import Threads from './Board/Threads'
import ShowPagination from './Board/ShowPagination'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5

class Board extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      threads: null
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.focusNewTopic = this.focusNewTopic.bind(this)
    this.showNewThreads = this.showNewThreads.bind(this)
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
            if (nextThread) {
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

  focusNewTopic() {
    if (this.titleInput) {
      this.titleInput.focus()
    }
  }

  showNewThreads() {
    this.setState({ threads: this.props.boardThreads.value, currentPage: 1 })
  }

  render() {
    const {key: boardId, value: board = []} = this.props.board || {}
    const {value: boardThreads } = this.props.boardThreads || {}
    const { authenticatedUser: user, styles } = this.props
    const threads = this.state.threads || []

    const pagedThreads = take(
      drop(
        sortBy(
          threads,
          (thread) => thread.value.lastPostAt
        ).reverse(),
        (this.state.currentPage - 1) * PAGE_SIZE
      ),
      PAGE_SIZE
    )

    return (
      <div>
        <Card>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>
              {board.title}
            </h2>
            <NewTopicButton user={user} newTopic={this.focusNewTopic} />
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
            threads={threads} />
        </Card>
        <PostNewTopic
          boardId={boardId}
          user={user}
          inputRef={(input) => { this.titleInput = input}}
          showNewThreads={this.showNewThreads} />
      </div>
    )
  }
}

export default styles({
  headerContainer: {
    position: "relative"
  },
  header: {
    minHeight: "28px",
    "@media (min-width: 480px)": {
      display: "inline-block"
    }
  }
}, bindings(["board", "boardThreads"], ["authenticatedUser"])(Board))

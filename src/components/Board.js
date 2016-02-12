import React, { Component, PropTypes } from 'react'
import { bindings, Link, FirebaseWrite, styles } from 'refire-app'
import { Card, Spinner, Pagination } from 'elemental'
import sortBy from 'lodash/collection/sortBy'
import drop from 'lodash/array/drop'
import take from 'lodash/array/take'

import PostNewTopic from './Board/PostNewTopic'
import Threads from './Board/Threads'
import ShowPagination from './Board/ShowPagination'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5

class Board extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect(page) {
    this.setState({ currentPage: page })
  }

  render() {
    const {key: boardId, value: board = []} = this.props.board || {}
    const {value: boardThreads = []} = this.props.boardThreads || {}
    const { authenticatedUser: user, styles } = this.props

    const pagedThreads = take(
      drop(
        sortBy(
          boardThreads,
          (thread) => thread.value.lastPostAt
        ).reverse(),
        (this.state.currentPage - 1) * PAGE_SIZE
      ),
      PAGE_SIZE
    )

    return (
      <div>
        <Card>
          <h2 className={styles.header}>{board.title}</h2>
          <Threads boardId={boardId} threads={pagedThreads} />
          <ShowPagination
            currentPage={this.state.currentPage}
            handlePageSelect={this.handlePageSelect}
            threads={boardThreads} />
        </Card>
        <PostNewTopic user={user} boardId={boardId} />
      </div>
    )
  }
}

export default styles({
  header: {
    minHeight: "28px"
  }
}, bindings(["board", "boardThreads"], ["authenticatedUser"])(Board))

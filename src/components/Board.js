import React, { Component, PropTypes } from 'react'
import { bindings, Link, FirebaseWrite } from 'refire-app'
import { Card, Spinner } from 'elemental'
import sortBy from 'lodash/collection/sortBy'

import PostNewTopic from './PostNewTopic'

class Board extends Component {
  render() {
    const {key: boardId, value: board = []} = this.props.board || {}
    const {value: boardThreads = []} = this.props.boardThreads || {}
    const { authenticatedUser: user } = this.props._status

    return (
      <div>
        <Card>
          <h2>{board.title}</h2>
          <div>
            {
              sortBy(boardThreads, (thread) => thread.value.lastPostAt).reverse().map(({ key, value: thread }) => {
                console.log( "replies", Object.keys(thread.posts).length - 1 )
                return (
                  <h3 key={key}>
                    <Link to={`/board/${boardId}/${key}`}>
                      {thread.title}
                    </Link>
                  </h3>
                )
              })
            }
          </div>
        </Card>
        <PostNewTopic user={user} boardId={boardId} />
      </div>
    )
  }
}

export default bindings("board", "boardThreads", "_status")(Board)

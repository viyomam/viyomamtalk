import React, { Component, PropTypes } from 'react'
import { bindings, Link } from 'refire-app'
import { Card, Spinner } from 'elemental'

class Board extends Component {
  render() {
    const {key: boardId, value: board = []} = this.props.board || {}
    const {value: boardThreads = []} = this.props.boardThreads || {}

    return (
      <Card>
        <h2>{board.title}</h2>
        <div>
          {
            boardThreads.map(({ key, value: thread }) => {
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
    )
  }
}

export default bindings("board", "boardThreads")(Board)

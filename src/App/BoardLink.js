import React from 'react'
import { Link } from 'refire-app'

const BoardLink = ({ board, boardKey, threadKey }) => {
  if (board && boardKey && threadKey) {
    return (
      <span>
        <strong> &gt; </strong>
        <Link to={`/board/${boardKey}`}>{board.title}</Link>
      </span>
    )
  } else {
    return <span />
  }
}

export default BoardLink

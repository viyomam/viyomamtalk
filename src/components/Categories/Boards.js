import React from 'react'
import { Link } from 'refire-app'
import find from 'lodash/collection/find'

function findBoard(boards, boardId) {
  return find(boards, (board) => {
    return board.key === boardId
  }) || { value: {} }
}

const Boards = ({ boards, category }) => {
  return (
    <div>
      {
        Object.keys(category.boards).map((boardId) => {
          const board = findBoard(boards, boardId)
          return (
            <h3 key={boardId}>
              <Link to={`board/${board.key}`}>
                {board.value.title}
              </Link>
            </h3>
          )
        })
      }
    </div>
  )
}

export default Boards

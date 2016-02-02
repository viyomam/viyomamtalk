import React from 'react'
import { Link } from 'refire-app'
import { Card, Spinner } from 'elemental'
import find from 'lodash/collection/find'

function findBoard(boards, boardId) {
  return find(boards, (board) => {
    return board.key === boardId
  }) || { value: {} }
}

const LoadingSpinner = ({ categories, boards }) => {
  return (
    <Card>
      <Spinner />
    </Card>
  )
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

const Categories = ({ categories, boards }) => {

  if (!boards.length || !categories.length) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {
        categories.map(({ key, value: category }) => {
          return (
            <Card key={key}>
              <h2>{category.title}</h2>
              <Boards category={category} boards={boards} />
            </Card>
          )
        })
      }
    </div>
  )
}

export default Categories

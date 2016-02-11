import React from 'react'
import { Link, styles } from 'refire-app'
import { Card, Spinner } from 'elemental'
import find from 'lodash/collection/find'

function findBoard(boards, boardId) {
  return find(boards, (board) => {
    return board.key === boardId
  }) || { value: {} }
}

const LoadingSpinner = ({ styles }) => {
  return (
    <Card>
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
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

const Categories = ({ categories, boards, styles }) => {

  if (!boards.length || !categories.length) {
    return <LoadingSpinner styles={styles} />
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

export default styles({
  spinnerContainer: {
    padding: "30px 0",
  }
}, Categories)

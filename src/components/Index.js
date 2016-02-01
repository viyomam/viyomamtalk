import React, { Component, PropTypes } from 'react'
import { bindings, routeActions, Link } from 'refire-app'
import find from 'lodash/collection/find'
import { Card } from 'elemental'

const Categories = ({ categories, boards }) => {
  return (
    <div>
      {
        categories.map(({ key, value: category }) => {
          return (
            <Card key={key}>
              <h2>{category.title}</h2>
              <div>
                {
                  Object.keys(category.boards).map((boardId) => {
                    const board = find(boards, (board) => {
                      return board.key === boardId
                    }) || { value: {} }
                    return (
                      <h3 key={boardId}>
                        <Link to={`board/${board.key}`}>{board.value.title}</Link>
                      </h3>
                    )
                  })
                }
              </div>
            </Card>
          )
        })
      }
    </div>
  )
}

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {  }
  }

  render() {
    const {value: categories = []} = this.props.categories || {}
    const {value: boards = []} = this.props.boards || {}

    return (
      <div className="Index">
        <Categories categories={categories} boards={boards} />
      </div>
    )
  }
}

export default bindings("categories", "boards")(Index)

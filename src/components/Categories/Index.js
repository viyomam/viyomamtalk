import React, { Component } from 'react'
import { bindings } from 'refire-app'

import Categories from './Categories'

class Index extends Component {
  render() {
    const {value: categories = []} = this.props.categories || {}
    const {value: boards = []} = this.props.boards || {}

    return (
      <div>
        <Categories categories={categories} boards={boards} />
      </div>
    )
  }
}

export default bindings(["categories", "boards"])(Index)

import React, { Component, PropTypes } from 'react'
import { bindings, Link } from 'refire-app'
import { Card } from 'elemental'

import Categories from './Categories'

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

export default bindings(["categories", "boards"])(Index)

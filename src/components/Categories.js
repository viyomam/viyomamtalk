import React from 'react'
import { Card } from 'elemental'

import LoadingSpinner from './Categories/LoadingSpinner'
import Boards from './Categories/Boards'

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

export default Categories

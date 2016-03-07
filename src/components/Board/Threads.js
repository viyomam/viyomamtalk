import React from 'react'
import { Spinner } from 'elemental'
import { Link, styles } from 'refire-app'
import moment from 'moment'

import Thread from './Thread'

const Threads = ({ boardId, threads, loaded, styles }) => {
  if (!threads.length) {
    if (!loaded) {
      return (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )
    } else {
      return (
        <div>
          No threads here yet
        </div>
      )
    }
  } else {
    return (
      <div>
        {
          threads.map(({ key, value: thread }) => {
            return (
              <Thread
                key={key}
                threadKey={key}
                thread={thread}
                boardId={boardId} />
            )
          })
        }
      </div>
    )
  }
}

export default styles({
  spinnerContainer: {
    padding: "30px 0",
  }
}, Threads)

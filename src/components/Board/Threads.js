import React from 'react'
import { Spinner } from 'elemental'
import { Link, styles } from 'refire-app'

const Threads = ({ boardId, threads, styles }) => {
  if (!threads.length) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />  
      </div>
    )
  } else {
    return (
      <div>
        {
          threads.map(({ key, value: thread }) => {
            return (
              <h3 key={key}>
                <Link to={`/board/${boardId}/${key}`}>
                  {thread.title}
                </Link>
                {Object.keys(thread.posts).length - 1}
              </h3>
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

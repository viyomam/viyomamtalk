import React from 'react'
import Post from './Post'
import { styles } from 'refire-app'
import { Spinner } from 'elemental'

const Posts = ({ posts, user, updateQuote, styles }) => {
  if (!posts.length) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    )
  } else {
    return (
      <div>
        {
          posts.map(({ key, value: post}) => {
            return (
              <Post
                key={key}
                postKey={key}
                post={post}
                user={user}
                updateQuote={updateQuote} />
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
}, Posts)

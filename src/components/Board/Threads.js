import React from 'react'
import { Glyph, Spinner } from 'elemental'
import { Link, styles } from 'refire-app'
import moment from 'moment'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5

// TODO: extract to a helper and use in Thread.js
function lastPage(length) {
  const remainder = length % PAGE_SIZE
  const pages = Math.floor(length / PAGE_SIZE)
  return remainder === 0 ? pages : pages + 1
}

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
              <div className={styles.threadContainer} key={key}>
                <Link to={`/board/${boardId}/${key}`} className={styles.title}>
                  {thread.title}
                </Link>
                <div className={styles.metaContainer}>
                  <div className={styles.profileContainer}>
                    <Link to={`/profile/${thread.user.id}`} title={thread.user.displayName}>
                      <img src={thread.user.image} className={styles.image} />
                    </Link>
                  </div>
                  <Link to={`/board/${boardId}/${key}`} className={styles.commentsContainer}>
                    <span className={styles.commentsCount}>
                      {Object.keys(thread.posts).length - 1}
                    </span>
                    <Glyph icon="comment" />
                  </Link>
                  <div className={styles.lastPost}>
                    {moment(thread.lastPostAt, "x").fromNow()}
                  </div>
                </div>
              </div>
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
  },
  threadContainer: {
    position: "relative",
    padding: "15px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    "&:last-child": {
      borderBottom: 0
    }
  },
  title: {
    margin: "0",
    paddingRight: "100px",
    fontWeight: 500,
    display: "block"
  },
  image: {
    display: "none",
    "@media (min-width: 480px)": {
      display: "inline-block",
      width: "20px",
      height: "20px",
      borderRadius: "10px"
    }
  },
  profileContainer: {
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle"
  },
  metaContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: "13px 0",
  },
  commentsContainer: {
    display: "inline-block",
    minWidth: "40px",
    textAlign: "right",
    verticalAlign: "middle"
  },
  commentsCount: {
    display: "inline-block",
    margin: "0 5px 0 0"
  },
  lastPost: {
    display: "inline-block",
    minWidth: "40px",
    textAlign: "right",
    verticalAlign: "middle"
  }
}, Threads)

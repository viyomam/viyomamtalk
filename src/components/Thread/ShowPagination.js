import React from 'react'
import { styles } from 'refire-app'
import { Pagination } from 'elemental'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5
const PAGE_LIMIT = 5

const ShowPagination = ({ currentPage, handlePageSelect, posts, styles }) => {
  if (posts.length > PAGE_SIZE) {
    return (
      <Pagination
        currentPage={currentPage}
        onPageSelect={handlePageSelect}
        pageSize={PAGE_SIZE}
        total={posts.length}
        limit={PAGE_LIMIT}
        className={styles.pagination} />
    )
  } else {
    return <div />
  }
}

export default styles({
  pagination: {
    display: "block",
    marginBottom: "10px",
    "@media (min-width: 600px)": {
      display: "inline-block",
      position: "absolute",
      right: 0,
      top: 0
    }
  }
}, ShowPagination)

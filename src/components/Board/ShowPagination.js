import React from 'react'
import { Pagination } from 'elemental'
import { styles } from 'refire-app'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5

const ShowPagination = ({ currentPage, handlePageSelect, threads, styles }) => {
  if (threads.length > PAGE_SIZE) {
    return (
      <Pagination
        currentPage={currentPage}
        onPageSelect={handlePageSelect}
        pageSize={PAGE_SIZE}
        total={threads.length}
        className={styles.pagination} />
    )
  } else {
    return <div />
  }
}

export default styles({
  pagination: {
    display: "block",
    margin: "10px 0 0 0"
  }
}, ShowPagination)

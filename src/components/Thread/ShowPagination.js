import React from 'react'
import { styles } from 'refire-app'
import { Pagination } from 'elemental'

const ShowPagination = ({
  pageSize,
  pageLimit,
  currentPage,
  handlePageSelect,
  posts,
  styles
}) => {
  if (posts.length > pageSize) {
    return (
      <Pagination
        currentPage={currentPage}
        onPageSelect={handlePageSelect}
        pageSize={pageSize}
        total={posts.length}
        limit={pageLimit}
        className={styles.pagination} />
    )
  } else {
    return <div />
  }
}

export default styles({
  pagination: {
    display: "inline-block"
  }
}, ShowPagination)

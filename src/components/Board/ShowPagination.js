import React from 'react'
import { Pagination } from 'elemental'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5

const ShowPagination = ({ currentPage, handlePageSelect, threads }) => {
  if (threads.length > PAGE_SIZE) {
    return (
      <Pagination
        currentPage={currentPage}
        onPageSelect={handlePageSelect}
        pageSize={PAGE_SIZE}
        total={threads.length} />
    )
  } else {
    return <div />
  }
}

export default ShowPagination

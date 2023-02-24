import React, { useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PaginationBar = ({ currentPage = 1, nextPage, prevPage, totalPages = 1 }) => {
  const paginationNumbers = useMemo(() => {
    let paginationItems = []
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item key={number} active={number === currentPage} href={`?page=${number}`}>
          {number}
        </Pagination.Item>
      );
    }
    return paginationItems
  }, [totalPages, currentPage])

  return (
    <div className="d-flex flex-row justify-content-center">
      <Pagination>
        {prevPage && <Pagination.Prev href={`?page=${prevPage}`}/>}
        {paginationNumbers}
        {nextPage && <Pagination.Next href={`?page=${nextPage}`}/>}
      </Pagination>
    </div>
  )
}

export default PaginationBar
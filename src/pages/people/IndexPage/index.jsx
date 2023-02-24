import React, { useEffect, useCallback, useState, useMemo } from 'react'
import {
  useQuery,
} from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../../hooks/useAuth'
import useQueryParams from '../../../hooks/useQueryParams'
import api from '../../../lib/api'
import PaginationBar from '../../../components/PaginationBar'

import { RESOURCE } from '../constants'

const IndexPage = ({}) => {
  const { authToken, logout } = useAuth()
  const navigate = useNavigate();
  
  // Pagination
  const [pagination, setPagination] = useState({ currentPage: 1, nextPage: null, prevPage: null, totalPages: 1 })
  const queryParams = useQueryParams()
  const activePage = useMemo(() => {
    return queryParams?.page || pagination.currentPage
  }, [pagination, queryParams])

  const { isLoading, isError, data, error } = useQuery(RESOURCE.plural, () => api.jsonResponse(api.authenticated(api.paginated(api[RESOURCE.plural].get, {page: activePage}), authToken)))
  
  useEffect(() => {
    if (data) {
      setPagination({
        currentPage: data.meta?.current_page,
        prevPage: data.meta?.prev_page,
        nextPage: data.meta?.next_page,
        totalPages: data.meta?.total_pages,
      })
    }
  }, [data])
  
  const onNew = () => {
    navigate(`/app/${RESOURCE.plural}/new`)
  }
  
  const renderTable = useCallback(() => {
    return (
      <Table variant='dark' striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data && data.data.map((item) => {
            return (
              <tr key={`${RESOURCE.singular}-${item.attributes.id}`}>
                <td>{item.attributes.id}</td>
                <td><Link to={`/app/${RESOURCE.plural}/${item.attributes.id}`}>{item.attributes.name}</Link></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }, [data])

  return (
    <div id={RESOURCE.plural}>
      <h2>People</h2>
      <div className='mt-3 d-flex flex-column'>
        {!isLoading && (
          <div className="text-end">
            <Button className='mb-2' variant='primary' onClick={onNew}>
              New Person
            </Button>
          </div>
        )}
        {isLoading ? <Spinner animation="border" variant="primary" className="align-self-center" /> : (
          <>
            {renderTable()}
            {data?.data?.length ? <PaginationBar {...pagination}/> : null}
          </>
        )}
      </div>
    </div>
  )
}

export default IndexPage
import React, { useEffect, useCallback } from 'react'
import {
  useQuery,
} from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const PlanetsPage = ({}) => {
  const { authToken, logout } = useAuth()
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery('planets', () => api.jsonResponse(api.authenticated(api.paginated(api.planets.get, {per_page: 100}), authToken)))
  
  const onNew = () => {
    navigate('/app/planets/new')
  }
  
  const renderTable = useCallback(() => {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data && data.data.map((planet) => {
            return (
              <tr key={`planet-${planet.attributes.id}`}>
                <td>{planet.attributes.id}</td>
                <td><Link to={`/app/planets/${planet.attributes.id}`}>{planet.attributes.name}</Link></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }, [data])

  return (
    <div id="planets">
      <h2>Planets</h2>
      <div className='mt-3 d-flex flex-column'>
        {!isLoading && (
          <div className="text-end">
            <Button variant='primary' onClick={onNew}>
              New Planet
            </Button>
          </div>
        )}
        {isLoading ? <Spinner animation="border" variant="primary" className="align-self-center" /> : renderTable()}
      </div>
    </div>
  )
}

export default PlanetsPage
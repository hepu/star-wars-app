import React, { useEffect } from 'react'
import {
  useQuery,
} from 'react-query'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const PlanetsPage = ({}) => {
  const { authToken } = useAuth()
  const { isLoading, isError, data, error } = useQuery('planets', () => api.jsonResponse(api.authenticated(api.planets.get, authToken)))

  return (
    <div id="planets">
      <h2>Planets</h2>
      <Table striped bordered hover>
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
    </div>
  )
}

export default PlanetsPage
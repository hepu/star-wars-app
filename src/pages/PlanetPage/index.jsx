import React, { useMemo } from 'react'
import {
  useQuery,
} from 'react-query'
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const PlanetPage = ({}) => {
  let { id } = useParams();
  const { authToken } = useAuth()
  const { isLoading, isError, data, error } = useQuery(['planet', id], () => api.jsonResponse(api.authenticated(api.planets.show, authToken), { pathParams: { id } }))
  
  const planetName = useMemo(() => {
    return data && data.data && data.data.attributes.name
  }, [data])

  return (
    <div id="planets">
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/app/planets">
          Planets
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{planetName}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Planet: {planetName}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data && Object.keys(data.data.attributes).map((attribute) => {
            return (
              <tr key={`planet-attr-${attribute}`}>
                <td>{attribute}</td>
                <td>{data.data.attributes[attribute]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default PlanetPage
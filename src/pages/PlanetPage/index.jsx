import React, { useMemo, useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const PlanetPage = ({}) => {
  const { authToken } = useAuth()
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  let { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['planet', id], () => api.jsonResponse(api.authenticated(api.planets.show, authToken), { pathParams: { id } }))
  const [attributes, setAttributes] = useState({})

  const initialAttributes = useMemo(() => {
    return data?.data?.attributes
  }, [data?.data?.attributes])
  
  const destroyMutation = useMutation({
    mutationFn: () => api.authenticated(api.planets.destroy, authToken)({ pathParams: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planet', id] })
      queryClient.invalidateQueries({ queryKey: ['planets'] })
    },
  })
  
  const onEdit = () => {
    navigate(`/app/planets/${id}/edit`);
  }
  
  const onDelete = () => {
    const confirmation = window.confirm('Do you want to destroy this planet?')
    if (confirmation) {
      destroyMutation.mutate()
      navigate(`/app/planets`);
    }
  }
  
  useEffect(() => {
    setAttributes(initialAttributes)
  }, [initialAttributes])

  return (
    <div id="planets">
      <Breadcrumb>
        <Breadcrumb.Item href="/app/planets">
          Planets
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{attributes?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Planet: {attributes?.name}</h2>
      <div className='d-flex flex-row justify-content-end mb-3'>
        <Button variant='primary' className='mx-2' onClick={onEdit}>
          Edit
        </Button>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {attributes && Object.keys(attributes).map((attribute) => {
            return (
              <tr key={`planet-attr-${attribute}`}>
                <td>{attribute}</td>
                <td>{attributes[attribute]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default PlanetPage
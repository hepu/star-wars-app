import React, { useMemo, useState, useEffect } from 'react'
import {
  useQuery,
  useQueryClient,
  useMutation
} from 'react-query'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const EditPlanetPage = ({}) => {
  const { authToken } = useAuth()
  const navigate = useNavigate()
  let { id } = useParams();
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery(['planet', id], () => api.jsonResponse(api.authenticated(api.planets.show, authToken), { pathParams: { id } }))
  const [attributes, setAttributes] = useState({})
  
  const initialAttributes = useMemo(() => {
    const completeAttributes = data?.data?.attributes

    delete completeAttributes.id
    delete completeAttributes.created
    delete completeAttributes.edited

    return completeAttributes
  }, [data?.data?.attributes])
  
  const updateMutation = useMutation({
    mutationFn: (newPlanet) => {
      return api.authenticated(
        api.planets.update, authToken
      )(
        {
          pathParams: { id },
          body: JSON.stringify({ planet: newPlanet })
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planet', id] })
      queryClient.invalidateQueries({ queryKey: ['planets'] })
    },
  })
  
  const onCancel = () => {
    navigate(`/app/planets/${id}`);
  }
  
  const onUpdate = () => {
    updateMutation.mutate(attributes)
    navigate(`/app/planets/${id}`);
  }
  
  const onAttributeChange = (attributeName) => {
    return (event) => {
      setAttributes({
        ...attributes,
        [attributeName]: event.target.value
      })
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
        <Breadcrumb.Item active>{initialAttributes?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Planet: {initialAttributes?.name}</h2>
      <Form>
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
                  <td>
                    <Form.Control type="input" value={attributes[attribute]} onChange={onAttributeChange(attribute)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className='d-flex flex-row justify-content-end mt-3'>
          <Button variant='link' className='mx-2' onClick={onCancel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onUpdate}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default EditPlanetPage
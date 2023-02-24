import React, { useMemo, useState, useEffect, useCallback } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query'
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Attribute from '../../../components/Attribute'
import { useAuth } from '../../../hooks/useAuth'
import api from '../../../lib/api'

import { RESOURCE } from '../constants'

const ShowPage = () => {
  const { authToken } = useAuth()
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  let { id } = useParams();
  const { isLoading, data } = useQuery([RESOURCE.singular, id], () => api.jsonResponse(api.authenticated(api[RESOURCE.plural].show, authToken), { pathParams: { id } }))
  const [attributes, setAttributes] = useState({})

  const initialAttributes = useMemo(() => {
    return data?.data?.attributes
  }, [data?.data?.attributes])
  
  const destroyMutation = useMutation({
    mutationFn: () => api.authenticated(api[RESOURCE.plural].destroy, authToken)({ pathParams: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCE.singular, id] })
      queryClient.invalidateQueries({ queryKey: [RESOURCE.plural] })
    },
  })
  
  const onEdit = () => {
    navigate(`/app/${RESOURCE.plural}/${id}/edit`);
  }
  
  const onDelete = () => {
    const confirmation = window.confirm(`Do you want to destroy this ${RESOURCE.singular}?`)
    if (confirmation) {
      destroyMutation.mutate()
      navigate(`/app/${RESOURCE.plural}`);
    }
  }
  
  const renderAttributes = useCallback(() => {
    return (
      <Table variant='dark' striped bordered hover>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {attributes && Object.keys(attributes).map((attribute) => {
            return (
              <tr key={`${RESOURCE.singular}-attr-${attribute}`}>
                <td>{attribute}</td>
                <td>
                  <Attribute name={attribute} metadata={data?.included} value={attributes[attribute]} metadataValueKey={attribute === 'film_id' ? 'title' : undefined}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }, [attributes, data])
  
  useEffect(() => {
    setAttributes(initialAttributes)
  }, [initialAttributes])

  return (
    <div id={RESOURCE.plural}>
      <Breadcrumb>
        <Breadcrumb.Item href={`/app/${RESOURCE.plural}`}>
          Film Planets
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{isLoading ? <Spinner animation="border" size="sm" variant="primary" className="align-self-center" /> : id}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Film Planet: {isLoading ? <Spinner animation="border" size="sm" variant="primary" className="align-self-center" /> : id}</h2>
      <div className='d-flex flex-row justify-content-end mb-3'>
        <Button variant='primary' className='mx-2' onClick={onEdit}>
          Edit
        </Button>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </div>
      {isLoading ? <Spinner animation="border" variant="primary" className="align-self-center" /> : renderAttributes()}
    </div>
  )
}

export default ShowPage
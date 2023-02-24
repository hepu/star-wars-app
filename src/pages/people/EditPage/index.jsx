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

import { useAuth } from '../../../hooks/useAuth'
import api from '../../../lib/api'

import { RESOURCE } from '../constants'

const EditPage = ({}) => {
  const { authToken } = useAuth()
  const navigate = useNavigate()
  let { id } = useParams();
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery([RESOURCE.singular, id], () => api.jsonResponse(api.authenticated(api[RESOURCE.plural].show, authToken), { pathParams: { id } }))
  const [attributes, setAttributes] = useState({})
  
  const initialAttributes = useMemo(() => {
    const completeAttributes = data?.data?.attributes

    delete completeAttributes.id
    delete completeAttributes.created
    delete completeAttributes.edited

    return completeAttributes
  }, [data?.data?.attributes])
  
  const updateMutation = useMutation({
    mutationFn: (newItem) => {
      return api.authenticated(
        api[RESOURCE.plural].update, authToken
      )(
        {
          pathParams: { id },
          body: JSON.stringify({ [RESOURCE.singular]: newItem })
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCE.singular, id] })
      queryClient.invalidateQueries({ queryKey: [RESOURCE.plural] })
    },
  })
  
  const onCancel = () => {
    navigate(`/app/${RESOURCE.plural}/${id}`);
  }
  
  const onUpdate = () => {
    updateMutation.mutate(attributes)
    navigate(`/app/${RESOURCE.plural}/${id}`);
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
    <div id={RESOURCE.plural}>
      <Breadcrumb>
        <Breadcrumb.Item href={`/app/${RESOURCE.plural}`}>
          People
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{initialAttributes?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Person: {initialAttributes?.name}</h2>
      <Form>
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

export default EditPage
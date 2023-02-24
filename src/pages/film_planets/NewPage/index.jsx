import React, { useMemo, useState, useEffect } from 'react'
import {
  useQuery,
  useQueryClient,
  useMutation
} from 'react-query'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../../hooks/useAuth'
import api from '../../../lib/api'

import { RESOURCE, DEFAULT_ATTRIBUTES } from '../constants'

const NewPage = ({}) => {
  const { authToken } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES)
  
  const createMutation = useMutation({
    mutationFn: (newItem) => {
      return api.authenticated(
        api[RESOURCE.plural].create, authToken
      )(
        {
          body: JSON.stringify({ [RESOURCE.singular]: newItem })
        }
      )
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCE.plural] })
      const json = await data.json()

      navigate(`/app/${RESOURCE.plural}/${json.data.id}`);
    },
  })
  
  const onCancel = () => {
    navigate(`/app/${RESOURCE.plural}`);
  }
  
  const onCreate = () => {
    createMutation.mutate(attributes)
  }
  
  const onAttributeChange = (attributeName) => {
    return (event) => {
      setAttributes({
        ...attributes,
        [attributeName]: event.target.value
      })
    }
  }

  return (
    <div id={RESOURCE.plural}>
      <Breadcrumb>
        <Breadcrumb.Item href={`/app/${RESOURCE.plural}`}>
          Film Planets
        </Breadcrumb.Item>
        <Breadcrumb.Item active>New Film Planet</Breadcrumb.Item>
      </Breadcrumb>
      <h2>New Film Planet</h2>
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
          <Button variant='primary' onClick={onCreate}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default NewPage
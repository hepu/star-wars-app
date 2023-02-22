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

import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'

const NewPlanetPage = ({}) => {
  const { authToken } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [attributes, setAttributes] = useState({
    climate: '',
    diameter: '',
    gravity: '',
    name: '',
    orbital_period: '',
    population: '',
    rotation_period: '',
    surface_water: '',
    terrain: ''
  })
  
  const createMutation = useMutation({
    mutationFn: (newPlanet) => {
      return api.authenticated(
        api.planets.create, authToken
      )(
        {
          body: JSON.stringify({ planet: newPlanet })
        }
      )
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['planets'] })
      const json = await data.json()

      navigate(`/app/planets/${json.data.attributes.id}`);
    },
  })
  
  const onCancel = () => {
    navigate(`/app/planets`);
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
    <div id="planets">
      <Breadcrumb>
        <Breadcrumb.Item href="/app/planets">
          Planets
        </Breadcrumb.Item>
        <Breadcrumb.Item active>New Planet</Breadcrumb.Item>
      </Breadcrumb>
      <h2>New Planet</h2>
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
          <Button variant='primary' onClick={onCreate}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default NewPlanetPage
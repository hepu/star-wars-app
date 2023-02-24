import React, { useCallback } from 'react'
import {
  useQuery,
} from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Attribute from '../../../components/Attribute'
import { useAuth } from '../../../hooks/useAuth'
import api from '../../../lib/api'

import { RESOURCE } from '../constants'

const IndexPage = () => {
  const { authToken } = useAuth()
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(RESOURCE.plural, () => api.jsonResponse(api.authenticated(api[RESOURCE.plural].get, authToken)))
  
  const onNew = () => {
    navigate(`/app/${RESOURCE.plural}/new`)
  }
  
  const renderTable = useCallback(() => {
    return (
      <Table variant='dark' striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Film</th>
            <th>Planet</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data && data.data.map((item) => {
            return (
              <tr key={`${RESOURCE.singular}-${item.id}`}>
                <td>
                  <Link to={`/app/${RESOURCE.plural}/${item.id}`}>
                    {item.id}
                  </Link>
                </td>
                <td>
                  <Attribute name='film_id' value={item.attributes.film_id} metadata={data?.included} metadataValueKey='title'/>
                </td>
                <td>
                  <Attribute name='planet_id' value={item.attributes.planet_id} metadata={data?.included}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }, [data])

  return (
    <div id={RESOURCE.plural}>
      <h2>Film Planets</h2>
      <div className='mt-3 d-flex flex-column'>
        {!isLoading && (
          <div className="text-end">
            <Button className='mb-2' variant='primary' onClick={onNew}>
              New Film Planet
            </Button>
          </div>
        )}
        {isLoading ? <Spinner animation="border" variant="primary" className="align-self-center" /> : renderTable()}
      </div>
    </div>
  )
}

export default IndexPage
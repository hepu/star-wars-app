import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const useQueryParams = () => {
  const location = useLocation()
  const queryParams = useMemo(() => {
    return location.search.split('?')[1]?.split('&').reduce((params, keyValuePair) => {
      const [key, value] = keyValuePair.split('=')
      params[key] = value
      return params
    }, {})
  }, [location])

  return queryParams
}

export default useQueryParams
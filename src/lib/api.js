import querystring from 'querystring'

export function request(path, options = {}) {
  const apiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  let queryParams = ""
  let pathParams = {}
  let newPath = path

  if (options.queryParams) {
    queryParams = `?${querystring.stringify(options.queryParams)}`
  }

  if (options.pathParams) {
    Object.keys(options.pathParams).forEach((param) => {
      newPath = newPath.replace(`:${param}`, options.pathParams[param])
    });
  }
  return fetch(
    `${process.env.REACT_APP_API_URL}${newPath}${queryParams}`,
    { ...options, headers: { ...apiHeaders, ...options.headers } }
  )
}

export function postRequest(path, options = {}) {
  return request(path, { method: 'POST', ...options })
}

export function putRequest(path, options = {}) {
  return request(path, { method: 'PUT', ...options })
}

export function deleteRequest(path, options = {}) {
  return request(path, { method: 'DELETE', ...options })
}

export default {
  authenticated: (requestFn, authToken) => {
    return (options = {}) => {
      const authHeaders = { 'Authorization': authToken }
      return requestFn({ ...options, headers: { ...authHeaders, ...options.headers }})
    }
  },
  paginated: (requestFn, pagination = {}) => {
    return (options = {}) => {
      const paginationParams = {
        page: 1,
        per_page: 50,
        ...pagination
      }
      return requestFn({ queryParams: {...paginationParams, ...options.queryParams}, ...options })
    }
  },
  jsonResponse: async (requestFn, options) => {
    const response = await requestFn(options)
    return await response.json()
  },
  login: async (options) => await postRequest('/login', options),
  logout: async (options) => await deleteRequest('/logout', options),
  planets: {
    get: async (options) => await request('/planets', options),
    show: async (options) => await request(`/planets/:id`, options),
  }
}
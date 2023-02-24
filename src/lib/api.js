import querystring from 'querystring'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 50
const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function request(path, options = {}) {
  let queryParams = ""
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
    { ...options, headers: { ...DEFAULT_HEADERS, ...options.headers } }
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
        page: DEFAULT_PAGE,
        per_page: DEFAULT_PER_PAGE,
        ...pagination
      }
      return requestFn({ queryParams: {...paginationParams, ...options.queryParams}, ...options })
    }
  },
  jsonResponse: async (requestFn, options) => {
    const response = await requestFn(options)
    
    if (!response.ok) {
      throw new Error(`API error. Response status: ${response.status}`)
    }
    
    return await response.json()
  },
  login: async (options) => await postRequest('/login', options),
  logout: async (options) => await deleteRequest('/logout', options),
  signup: async (options) => await postRequest('/signup', options),
  resetPassword: async (options) => await postRequest('/password', options),
  createPassword: async (options) => await putRequest('/password', options),
  planets: {
    get: async (options) => await request('/planets', options),
    show: async (options) => await request(`/planets/:id`, options),
    create: async (options) => await postRequest(`/planets`, options),
    update: async (options) => await putRequest(`/planets/:id`, options),
    destroy: async (options) => await deleteRequest(`/planets/:id`, options)
  },
  people: {
    get: async (options) => await request('/people', options),
    show: async (options) => await request(`/people/:id`, options),
    create: async (options) => await postRequest(`/people`, options),
    update: async (options) => await putRequest(`/people/:id`, options),
    destroy: async (options) => await deleteRequest(`/people/:id`, options)
  },
  films: {
    get: async (options) => await request('/films', options),
    show: async (options) => await request(`/films/:id`, options),
    create: async (options) => await postRequest(`/films`, options),
    update: async (options) => await putRequest(`/films/:id`, options),
    destroy: async (options) => await deleteRequest(`/films/:id`, options)
  },
  film_people: {
    get: async (options) => await request('/film_people', options),
    show: async (options) => await request(`/film_people/:id`, options),
    create: async (options) => await postRequest(`/film_people`, options),
    update: async (options) => await putRequest(`/film_people/:id`, options),
    destroy: async (options) => await deleteRequest(`/film_people/:id`, options)
  },
  film_planets: {
    get: async (options) => await request('/film_planets', options),
    show: async (options) => await request(`/film_planets/:id`, options),
    create: async (options) => await postRequest(`/film_planets`, options),
    update: async (options) => await putRequest(`/film_planets/:id`, options),
    destroy: async (options) => await deleteRequest(`/film_planets/:id`, options)
  },
}
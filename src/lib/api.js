export function request(path, options = {}) {
  return fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
}

export default {
  request,
  login: async (username, password) => {
    const response = await request(
      '/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: { username: username, password: password } 
        })
      }
    )
    return response
  },
  logout: async (headers = {}) => {
    const response = await request(
      '/logout',
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers
        }
      }
    )

    return response
  }
}
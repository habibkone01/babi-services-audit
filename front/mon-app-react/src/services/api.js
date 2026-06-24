const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, { method = 'GET', body, ...options } = {}) {
  const token = getToken()

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw { status: response.status, ...data }
  }

  return data
}

const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}

export const apiGetServices = async () => {
  try {
    const data = await api.get('services')
    return { ok: true, data }
  } catch (err) {
    return { ok: false, status: err.status, data: err }
  }
}

export default api

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
})

const getAuthHeaders = () => ({
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
})

const publicHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

export const apiRegister = async (data) => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiLogin = async (data) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiLogout = async () => {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiGetMe = async () => {
  const res = await fetch(`${API_URL}/api/me`, {
    headers: getAuthHeaders(),
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiGetServices = async () => {
  const res = await fetch(`${API_URL}/api/services`, {
    headers: { Accept: 'application/json' },
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiGetReservations = async () => {
  const res = await fetch(`${API_URL}/api/reservations`, {
    headers: getAuthHeaders(),
  })
  return { ok: res.ok, data: await res.json() }
}

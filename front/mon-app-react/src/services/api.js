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

export const apiGetAdminDashboard = async () => {
  const res = await fetch(`${API_URL}/api/admin/dashboard`, {
    headers: getAuthHeaders(),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiValiderPrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/prestataires/${id}/valider`, {
    method: 'PATCH',
    headers: getHeaders(),
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiRejeterPrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/prestataires/${id}/rejeter`, {
    method: 'PATCH',
    headers: getHeaders(),
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiGetCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories`, {
    headers: { Accept: 'application/json' },
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiGetPrestataires = async () => {
  const res = await fetch(`${API_URL}/api/prestataires`, {
    headers: { Accept: 'application/json' },
  })
  return { ok: res.ok, data: await res.json() }
}

export const apiCreatePrestataire = async (data) => {
  const res = await fetch(`${API_URL}/api/prestataires`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiUpdatePrestataire = async (id, data) => {
  const res = await fetch(`${API_URL}/api/prestataires/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiDeletePrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/prestataires/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiCreateCategorie = async (data) => {
  const res = await fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiUpdateCategorie = async (id, data) => {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiDeleteCategorie = async (id) => {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiCreateService = async (data) => {
  const res = await fetch(`${API_URL}/api/services`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiUpdateService = async (id, data) => {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export const apiDeleteService = async (id) => {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

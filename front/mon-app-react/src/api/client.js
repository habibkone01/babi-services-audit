const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(`Erreur API ${response.status} : ${message || response.statusText}`);
  }

  // Pas de contenu (ex: DELETE 204)
  if (response.status === 204) return null;

  return response.json();
}
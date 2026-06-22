import { apiFetch } from "./client";

// GET /api/services -> liste des services avec prestataire + categorie (cf ServiceController@index)
export function fetchServices() {
  return apiFetch("/services");
}

// GET /api/services/{id}
export function fetchService(id) {
  return apiFetch(`/services/${id}`);
}
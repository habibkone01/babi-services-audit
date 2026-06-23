import { apiFetch } from "./client";

// GET /api/reservations -> liste des réservations avec utilisateur + service (cf ReservationController@index)
export function fetchReservations() {
  return apiFetch("/reservations");
}

// GET /api/reservations/{id}
export function fetchReservation(id) {
  return apiFetch(`/reservations/${id}`);
}

// POST /api/reservations
export function createReservation(data) {
  return apiFetch("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /api/reservations/{id} -> utilisé ex. pour changer le statut (annuler)
export function updateReservation(id, data) {
  return apiFetch(`/reservations/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /api/reservations/{id}
export function deleteReservation(id) {
  return apiFetch(`/reservations/${id}`, { method: "DELETE" });
}
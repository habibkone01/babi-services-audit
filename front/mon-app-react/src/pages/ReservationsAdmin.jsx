import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { apiGetAdminReservations, apiUpdateAdminReservation } from '../services/api'

const statutStyles = {
  en_attente: 'bg-amber-50 text-amber-700',
  confirmee: 'bg-emerald-50 text-emerald-700',
  annulee: 'bg-rose-50 text-rose-700',
  terminee: 'bg-sky-50 text-sky-700',
}

const statutLabels = {
  en_attente: 'en attente',
  confirmee: 'confirmée',
  annulee: 'annulée',
  terminee: 'terminée',
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function ReservationsAdmin() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatut, setFilterStatut] = useState('tous')

  const loadReservations = () => {
    setLoading(true)
    apiGetAdminReservations().then((res) => {
      if (res.ok) {
        setReservations(Array.isArray(res.data) ? res.data : [])
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    loadReservations()
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return reservations.filter((r) => {
      const client = `${r.utilisateur?.prenom ?? ''} ${r.utilisateur?.nom ?? ''}`.toLowerCase()
      const service = `${r.service?.nom_service ?? ''}`.toLowerCase()
      const matchSearch = !q || client.includes(q) || service.includes(q)
      const matchStatut = filterStatut === 'tous' || r.statut === filterStatut
      return matchSearch && matchStatut
    })
  }, [reservations, search, filterStatut])

  const handleStatusChange = async (id, statut) => {
    const res = await apiUpdateAdminReservation(id, statut)
    if (res.ok) {
      setReservations((prev) => prev.map((r) => (r.id_reservation === id ? { ...r, statut } : r)))
    }
  }

  const statuts = ['tous', 'en_attente', 'confirmee', 'annulee', 'terminee']

  return (
    <AdminLayout
      active="Reservations"
      title="Réservations"
      subtitle="Valider, suivre et gérer toutes les réservations clients"
      headerActions={
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M2 7.33333C2 10.2769 4.38979 12.6667 7.33333 12.6667C10.2769 12.6667 12.6667 10.2769 12.6667 7.33333C12.6667 4.38979 10.2769 2 7.33333 2C4.38979 2 2 4.38979 2 7.33333Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 14L11.1333 11.1333" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 w-40"
          />
        </div>
      }
    >
      <div className="flex gap-2 mb-5 flex-wrap">
        {statuts.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatut(s)}
            className={`text-sm px-4 py-1.5 rounded-full font-semibold transition border ${
              filterStatut === s
                ? 'bg-babi-dark text-white border-babi-dark'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {s === 'tous' ? 'Toutes' : statutLabels[s]}
            <span className="ml-1.5 opacity-60 text-xs">
              {s === 'tous' ? reservations.length : reservations.filter((r) => r.statut === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="font-semibold pb-3 pr-4">Client</th>
                <th className="font-semibold pb-3 pr-4">Service</th>
                <th className="font-semibold pb-3 pr-4">Date</th>
                <th className="font-semibold pb-3 pr-4">Heure</th>
                <th className="font-semibold pb-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id_reservation} className="border-t border-gray-100">
                  <td className="py-3 pr-4 font-semibold text-babi-dark">
                    {`${r.utilisateur?.prenom ?? ''} ${r.utilisateur?.nom ?? ''}`.trim() || '—'}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{r.service?.nom_service || '—'}</td>
                  <td className="py-3 pr-4 text-gray-600">{formatDate(r.date_reservation)}</td>
                  <td className="py-3 pr-4 text-gray-600">{r.heure_reservation || '—'}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutStyles[r.statut] ?? 'bg-gray-50 text-gray-600'}`}>
                        {statutLabels[r.statut] ?? r.statut}
                      </span>
                      <select
                        value={r.statut}
                        onChange={(e) => handleStatusChange(r.id_reservation, e.target.value)}
                        className="text-xs border border-gray-200 rounded-full px-2 py-1 bg-white"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="confirmee">Confirmée</option>
                        <option value="annulee">Annulée</option>
                        <option value="terminee">Terminée</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Aucune réservation trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ReservationsAdmin

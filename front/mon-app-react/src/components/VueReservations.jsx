import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarIcon, MoneyIcon,
  formatMontant, formatDateHeure,
  avatarBg, initials, statutLabels, statutStyles,
  FILTERS, FILTER_LABELS,
} from './shared'

export default function VueReservations({ reservations, loading, onCancel }) {
  const [filtre, setFiltre] = useState('toutes')

  const filtered = useMemo(() => {
    if (filtre === 'toutes') return reservations
    return reservations.filter((r) => r.statut === filtre)
  }, [reservations, filtre])

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-babi-dark font-bricolage mb-1">Mes réservations</h1>
        <p className="text-gray-500 text-sm">Gérez toutes vos réservations</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full font-semibold transition border ${
              filtre === f
                ? 'bg-babi-green text-white border-babi-green'
                : 'bg-white text-gray-600 border-gray-200 hover:border-babi-green'
            }`}
          >
            {FILTER_LABELS[f]}
            <span className="ml-1.5 opacity-60 text-xs">
              {f === 'toutes' ? reservations.length : reservations.filter((r) => r.statut === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-white animate-pulse border border-gray-100" />
          ))}
        </div>
      )}

      {/* État vide */}
      {!loading && filtered.length === 0 && (
        <div className="text-center bg-white rounded-2xl p-10 border border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            Aucune réservation {filtre !== 'toutes' ? 'dans cette catégorie' : 'pour le moment'}.
          </p>
          <Link to="/services" className="text-sm font-semibold text-babi-green hover:underline">
            Trouver un prestataire →
          </Link>
        </div>
      )}

      {/* Liste */}
      <div className="space-y-4">
        {filtered.map((r, i) => (
          <div key={r.id_reservation} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarBg(i)}`}>
                  {initials(r.service?.prestataire?.prenom, r.service?.prestataire?.nom)}
                </span>
                <div>
                  <p className="font-semibold text-babi-dark text-sm md:text-base">
                    {r.service?.prestataire?.prenom} {r.service?.prestataire?.nom}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">{r.service?.nom_service}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 md:px-3 py-1 rounded-full shrink-0 ${statutStyles[r.statut]}`}>
                {statutLabels[r.statut]}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span className="flex items-center gap-1.5">
                <CalendarIcon /> {formatDateHeure(r.date_reservation, r.heure_reservation)}
              </span>
              <span className="flex items-center gap-1.5">
                <MoneyIcon /> {formatMontant(r.service?.tarif)}
              </span>
              <span className="text-xs text-gray-400">BK-{String(r.id_reservation).padStart(4, '0')}</span>
              {['en_attente', 'confirmee'].includes(r.statut) && (
                <button
                  onClick={() => onCancel(r.id_reservation)}
                  className="ml-auto text-xs font-semibold text-red-500 hover:underline"
                >
                  Annuler
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
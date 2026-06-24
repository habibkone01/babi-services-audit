import { Calendar, Clock, MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation, onCancel }) {
  const { date_reservation, heure_reservation, statut, service } = reservation;

  const dateLabel = date_reservation
    ? new Date(date_reservation).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Date non précisée";

  const canCancel = statut === "en_attente" || statut === "confirmee";

  return (
    <div className="bg-white border border-[#E3EFE9] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#F0F7F4] flex items-center justify-center font-semibold text-[#0E9F6E] flex-shrink-0">
        {(service?.prestataire?.nom_prestataire || service?.prestataire?.nom || "?")
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-[#0B2B26] truncate">
            {service?.nom_service || "Service"}
          </p>
          <StatusBadge statut={statut} />
        </div>
        <p className="text-sm text-[#3D5A50] truncate">
          {service?.prestataire?.nom_prestataire || service?.prestataire?.nom}
        </p>
        <div className="flex items-center gap-4 mt-1.5 text-xs text-[#7A9C90]">
          <span className="flex items-center gap-1 capitalize">
            <Calendar className="w-3.5 h-3.5" />
            {dateLabel}
          </span>
          {heure_reservation && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {heure_reservation}
            </span>
          )}
          {service?.prestataire?.quartier && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {service.prestataire.quartier}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-semibold text-[#0B2B26]">
          {service?.tarif
            ? `${Number(service.tarif).toLocaleString("fr-FR")} F`
            : "Sur devis"}
        </span>
        {canCancel && (
          <button
            onClick={() => onCancel(reservation.id_reservation)}
            className="text-sm font-medium text-[#C0392B] hover:underline ml-3"
          >
            Annuler
          </button>
        )}
      </div>
    </div>
  );
}
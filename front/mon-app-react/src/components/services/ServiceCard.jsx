import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";

// Couleurs d'avatar tournantes (déterministes selon l'id) pour remplacer une vraie photo
const AVATAR_COLORS = [
  { bg: "#E6E6FA", text: "#6C63B5" },
  { bg: "#FCE4E4", text: "#C75C5C" },
  { bg: "#E0F2EC", text: "#0E9F6E" },
  { bg: "#FFF3DA", text: "#B98A1E" },
];

function getAvatarColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ServiceCard({ service }) {
  const {
    id_service,
    nom_service,
    description,
    tarif,
    disponibilite,
    prestataire,
    categorie,
  } = service;

  const avatar = getAvatarColor(id_service ?? 0);
  const tags = (description || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#E3EFE9] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3D5A50]">
          {categorie?.nom_categorie || categorie?.nom || "Service"}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${
            disponibilite
              ? "bg-[#E6F4EC] text-[#0E9F6E]"
              : "bg-[#F3F0EC] text-[#9A9A9A]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              disponibilite ? "bg-[#0E9F6E]" : "bg-[#9A9A9A]"
            }`}
          />
          {disponibilite ? "Dispo" : "Occupé"}
        </span>
      </div>

      <div className="mx-4 mt-3 h-28 rounded-xl bg-[#F0F7F4] flex items-center justify-center text-xs text-[#9FC2B4] tracking-widest">
        photo prestation
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
            style={{ backgroundColor: avatar.bg, color: avatar.text }}
          >
            {getInitials(prestataire?.nom_prestataire || prestataire?.nom)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#0B2B26] flex items-center gap-1 truncate">
              {prestataire?.nom_prestataire || prestataire?.nom || "Prestataire"}
              <BadgeCheck className="w-4 h-4 text-[#0E9F6E] flex-shrink-0" />
            </p>
            <p className="text-sm text-[#7A9C90] truncate">{nom_service}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 text-sm text-[#3D5A50]">
          <span className="flex items-center gap-1 font-medium text-[#0B2B26]">
            <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
            {prestataire?.note_moyenne ?? "—"}
            {prestataire?.nb_avis != null && (
              <span className="text-[#9FB8AE] font-normal">({prestataire.nb_avis})</span>
            )}
          </span>
          {prestataire?.quartier && (
            <span className="flex items-center gap-1 text-[#7A9C90]">
              <MapPin className="w-3.5 h-3.5" />
              {prestataire.quartier}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#F0F7F4] text-[#3D5A50] text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EEF3F0]">
          <span className="text-sm font-semibold text-[#0B2B26]">
            {tarif ? `${Number(tarif).toLocaleString("fr-FR")} F` : "Sur devis"}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/services/${id_service}`}
              className="text-sm font-medium text-[#0B2B26] hover:text-[#0E9F6E] transition-colors px-3 py-2"
            >
              Voir le profil
            </Link>
            <Link
              to={`/services/${id_service}/reserver`}
              className="bg-[#0E9F6E] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#0C8A5F] transition-colors"
            >
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
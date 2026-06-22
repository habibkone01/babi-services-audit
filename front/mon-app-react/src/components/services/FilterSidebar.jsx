import {
  Wrench,
  Zap,
  Sparkles,
  Scissors,
  UtensilsCrossed,
  Shirt,
  Truck,
  Fan,
  Trees,
  Monitor,
  GraduationCap,
  Car,
  RotateCcw,
  Star,
} from "lucide-react";

const categories = [
  { label: "Plomberie", icon: Wrench },
  { label: "Électricité", icon: Zap },
  { label: "Ménage", icon: Sparkles },
  { label: "Coiffure & Beauté", icon: Scissors },
  { label: "Cuisine & Traiteur", icon: UtensilsCrossed },
  { label: "Couture", icon: Shirt },
  { label: "Déménagement", icon: Truck },
  { label: "Climatisation", icon: Fan },
  { label: "Jardinage", icon: Trees },
  { label: "Informatique", icon: Monitor },
  { label: "Cours & Soutien", icon: GraduationCap },
  { label: "Mécanique auto", icon: Car },
];

const minRatings = [
  { label: "Toutes", value: 0 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 },
];

export default function FilterSidebar({ filters, onChange, onReset }) {
  const { categorie, quartier, noteMin, disponiblesSeulement } = filters;

  return (
    <aside className="w-full md:w-[260px] flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-[#0B2B26] mb-3">Catégorie</h3>
        <ul className="space-y-1">
          {categories.map(({ label, icon: Icon }) => {
            const active = categorie === label;
            return (
              <li key={label}>
                <button
                  onClick={() => onChange({ ...filters, categorie: active ? null : label })}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-[#E6F4EC] text-[#0B2B26] font-medium"
                      : "text-[#3D5A50] hover:bg-[#F0F7F4]"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0E9F6E]" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0B2B26] mb-3">Quartier</h3>
        <select
          value={quartier}
          onChange={(e) => onChange({ ...filters, quartier: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-[#DCEBE3] bg-white text-sm text-[#0B2B26] focus:outline-none focus:ring-2 focus:ring-[#0E9F6E]/30"
        >
          <option>Tout Abidjan</option>
          <option>Cocody</option>
          <option>Plateau</option>
          <option>Marcory</option>
          <option>Yopougon</option>
          <option>Treichville</option>
          <option>Abobo</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0B2B26] mb-3">Note minimale</h3>
        <div className="flex flex-wrap gap-2">
          {minRatings.map(({ label, value }) => {
            const active = noteMin === value;
            return (
              <button
                key={label}
                onClick={() => onChange({ ...filters, noteMin: value })}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  active
                    ? "bg-[#0E9F6E] text-white"
                    : "bg-white border border-[#DCEBE3] text-[#3D5A50] hover:border-[#0E9F6E]"
                }`}
              >
                {value > 0 && <Star className="w-3.5 h-3.5 fill-current" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#F0F7F4] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0B2B26]">Disponibles maintenant</p>
          <p className="text-xs text-[#7A9C90] mt-0.5">Masquer les pros occupés</p>
        </div>
        <button
          onClick={() => onChange({ ...filters, disponiblesSeulement: !disponiblesSeulement })}
          className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
            disponiblesSeulement ? "bg-[#0E9F6E]" : "bg-[#DCEBE3]"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              disponiblesSeulement ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#DCEBE3] text-sm font-medium text-[#0B2B26] hover:bg-[#F0F7F4] transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Réinitialiser
      </button>
    </aside>
  );
}
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/services/SearchBar";
import FilterSidebar from "../components/services/FilterSidebar";
import ServiceGrid from "../components/services/ServiceGrid";
import { apiGetServices } from "../services/api";

const DEFAULT_FILTERS = {
  categorie: null,
  quartier: "Tout Abidjan",
  noteMin: 0,
  disponiblesSeulement: false,
};

const TRI_OPTIONS = ["Mieux notés", "Moins cher", "Plus récent"];

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    categorie: searchParams.get("categorie") ?? null,
    quartier: searchParams.get("quartier") ?? DEFAULT_FILTERS.quartier,
    noteMin: Number(searchParams.get("noteMin")) || DEFAULT_FILTERS.noteMin,
    disponiblesSeulement: searchParams.get("disponiblesSeulement") === "true",
  }));
  const [tri, setTri] = useState(searchParams.get("tri") ?? "Mieux notés");
  const [triOpen, setTriOpen] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiGetServices(currentPage)
      .then((res) => {
        if (!active) return;
        if (res.ok) {
          const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
          setServices(data);
          if (res.data.last_page) setLastPage(res.data.last_page);
        } else {
          setError(res.data);
        }
      })
      .catch((err) => { if (active) setError(err) })
      .finally(() => { if (active) setLoading(false) });
    return () => { active = false };
  }, [currentPage]);

  const filteredServices = useMemo(() => {
    const { categorie, quartier, noteMin, disponiblesSeulement } = filters;

    return services
      .filter((service) => {
        if (categorie && service.categorie?.nom_categorie !== categorie) return false;
        if (quartier && quartier !== "Tout Abidjan" && service.prestataire?.localisation !== quartier) return false;
        if (noteMin > 0 && (service.prestataire?.note_moyenne ?? 0) < noteMin) return false;
        if (disponiblesSeulement && !service.disponibilite) return false;
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          const haystack = [
            service.nom_service,
            service.prestataire?.prenom,
            service.prestataire?.nom,
            service.categorie?.nom_categorie,
          ].join(" ").toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (tri === "Mieux notés") return (b.prestataire?.note_moyenne ?? 0) - (a.prestataire?.note_moyenne ?? 0);
        if (tri === "Moins cher") return (a.tarif ?? 0) - (b.tarif ?? 0);
        if (tri === "Plus récent") return new Date(b.created_at) - new Date(a.created_at);
        return 0;
      });
  }, [services, filters, search, tri]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#7A9C90] hover:text-[#0E9F6E] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Accueil
          </Link>

          <h1 className="text-4xl font-bold text-[#0B2B26] mb-6">
            Tous les services
          </h1>

          <SearchBar value={search} onChange={setSearch} />

          <div className="mt-8 flex flex-col md:flex-row gap-10">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => {
                setFilters({ ...DEFAULT_FILTERS });
                setSearch("");
                setTri("Mieux notés");
                setSearchParams(new URLSearchParams());
              }}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[#3D5A50]">
                  <span className="font-semibold text-[#0B2B26]">
                    {filteredServices.length}
                  </span>{" "}
                  prestataire{filteredServices.length !== 1 ? "s" : ""} trouvé{filteredServices.length !== 1 ? "s" : ""}
                </p>

                <div className="relative">
                  <button
                    onClick={() => setTriOpen(!triOpen)}
                    className="flex items-center gap-1.5 border border-[#DCEBE3] rounded-full px-3.5 py-1.5 text-[#0B2B26] font-medium text-sm hover:border-[#0E9F6E] transition-colors"
                  >
                    {tri}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${triOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {triOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#DCEBE3] rounded-xl shadow-lg z-10 overflow-hidden min-w-[140px]">
                      {TRI_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => { setTri(option); setTriOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            tri === option
                              ? "bg-[#E6F4EC] text-[#0B2B26] font-semibold"
                              : "text-[#3D5A50] hover:bg-[#F0F7F4]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <ServiceGrid
                services={filteredServices}
                loading={loading}
                error={error}
              />

              {lastPage > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full border border-[#DCEBE3] text-sm font-medium text-[#3D5A50] disabled:opacity-40"
                  >
                    Précédent
                  </button>
                  <span className="px-4 py-2 text-sm text-[#7A9C90]">{currentPage} / {lastPage}</span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
                    disabled={currentPage === lastPage}
                    className="px-4 py-2 rounded-full border border-[#DCEBE3] text-sm font-medium text-[#3D5A50] disabled:opacity-40"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
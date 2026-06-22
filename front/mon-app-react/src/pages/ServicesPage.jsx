import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/services/SearchBar";
import FilterSidebar from "../components/services/FilterSidebar";
import ServiceGrid from "../components/services/ServiceGrid";
import { fetchServices } from "../api/services";

const DEFAULT_FILTERS = {
  categorie: null,
  quartier: "Tout Abidjan",
  noteMin: 0,
  disponiblesSeulement: false,
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchServices()
      .then((data) => {
        if (active) setServices(data);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const { categorie, quartier, noteMin, disponiblesSeulement } = filters;

      if (categorie && service.categorie?.nom_categorie !== categorie) return false;

      if (
        quartier &&
        quartier !== "Tout Abidjan" &&
        service.prestataire?.quartier !== quartier
      )
        return false;

      if (noteMin > 0 && (service.prestataire?.note_moyenne ?? 0) < noteMin)
        return false;

      if (disponiblesSeulement && !service.disponibilite) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = [
          service.nom_service,
          service.prestataire?.nom_prestataire,
          service.categorie?.nom_categorie,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [services, filters, search]);

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
                setFilters(DEFAULT_FILTERS);
                setSearch("");
              }}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[#3D5A50]">
                  <span className="font-semibold text-[#0B2B26]">
                    {filteredServices.length}
                  </span>{" "}
                  prestataires trouvés
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#7A9C90]">Trier :</span>
                  <button className="flex items-center gap-1.5 border border-[#DCEBE3] rounded-full px-3.5 py-1.5 text-[#0B2B26] font-medium">
                    Mieux notés
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <ServiceGrid
                services={filteredServices}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import ServiceCard from "./ServiceCard";

export default function ServiceGrid({ services, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[340px] rounded-2xl bg-[#F0F7F4] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-[#C0392B] bg-[#FBEAEA] rounded-xl p-4">
        Impossible de charger les services. Réessaie un peu plus tard.
      </p>
    );
  }

  if (!services.length) {
    return (
      <p className="text-sm text-[#7A9C90] bg-[#F0F7F4] rounded-xl p-6 text-center">
        Aucun prestataire ne correspond à ces critères.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service) => (
        <ServiceCard key={service.id_service} service={service} />
      ))}
    </div>
  );
}
function Hero() {
  return (
    <section className="relative py-16 px-8 overflow-hidden bg-babi-cream">
      <div className="absolute -top-24 -right-12 w-96 h-96 bg-gradient-to-br from-orange-200/50 to-orange-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-36 -left-24 w-80 h-80 bg-gradient-to-br from-green-200/40 to-green-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8">
          <span className="text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.16271 14.7108 7.83599 14.7108 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 3.72279 5.0558 1.33301 7.99935 1.33301C10.9429 1.33301 13.3327 3.72279 13.3327 6.66634" stroke="#F2701E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6.66699C6 7.77082 6.89617 8.66699 8 8.66699C9.10383 8.66699 10 7.77082 10 6.66699C10 5.56316 9.10383 4.66699 8 4.66699C6.89617 4.66699 6 5.56316 6 6.66699V6.66699" stroke="#F2701E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span className="text-sm text-gray-600">Disponible partout à Abidjan</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-babi-dark mb-4 font-bricolage leading-tight">
          Le bon prestataire,<br />
          <span className="text-babi-orange relative inline-block">
            près de chez vous.
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange-200/30 -z-10 rounded"></span>
          </span>
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Plombiers, coiffeuses, ménagères, traiteurs... Trouvez un pro vérifié, réservez en 2 clics et payez en Mobile Money. C'est ça, Babi.
        </p>
        
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 flex-1">
            <span className="text-lg opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.6673 13.333V2.66634C10.6673 1.93045 10.0699 1.33301 9.33398 1.33301H6.66732C5.93143 1.33301 5.33398 1.93045 5.33398 2.66634V13.333" stroke="#8A7A6E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66732 4H13.334C14.0699 4 14.6673 4.59745 14.6673 5.33333V12C14.6673 12.7359 14.0699 13.3333 13.334 13.3333H2.66732C1.93143 13.3333 1.33398 12.7359 1.33398 12V5.33333C1.33398 4.59745 1.93143 4 2.66732 4V4" stroke="#8A7A6E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <input type="text" placeholder="Quel service ?" className="bg-transparent border-none outline-none text-gray-700 w-full" />
          </div>
          <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
          <div className="flex items-center gap-2 px-4 py-3 flex-1">
            <span className="text-lg opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_69_637)">
                  <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.16271 14.7108 7.83599 14.7108 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 3.72279 5.0558 1.33301 7.99935 1.33301C10.9429 1.33301 13.3327 3.72279 13.3327 6.66634" stroke="#8A7A6E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6.66699C6 7.77082 6.89617 8.66699 8 8.66699C9.10383 8.66699 10 7.77082 10 6.66699C10 5.56316 9.10383 4.66699 8 4.66699C6.89617 4.66699 6 5.56316 6 6.66699V6.66699" stroke="#8A7A6E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_69_637">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <input type="text" placeholder="Quel quartier ?" className="bg-transparent border-none outline-none text-gray-700 w-full" />
          </div>
          <button className="bg-[#F2701E] text-white px-6 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 7.33333C2 10.2769 4.38979 12.6667 7.33333 12.6667C10.2769 12.6667 12.6667 10.2769 12.6667 7.33333C12.6667 4.38979 10.2769 2 7.33333 2C4.38979 2 2 4.38979 2 7.33333V7.33333" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9995 14.0005L11.1328 11.1338" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Rechercher
          </button>
        </div>
        
        <div className="flex justify-center gap-6 items-center">
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-babi-dark font-bricolage">2 400+</span>
            <span className="text-xs text-gray-500 mt-1">prestataires vérifiés</span>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-babi-dark font-bricolage">18 000+</span>
            <span className="text-xs text-gray-500 mt-1">missions réalisées</span>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-babi-dark font-bricolage">4,9/5</span>
            <span className="text-xs text-gray-500 mt-1">note moyenne</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

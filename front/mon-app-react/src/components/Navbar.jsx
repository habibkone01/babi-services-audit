import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-babi-green to-babi-green-light rounded-full"></div>
          <span className="text-xl font-extrabold text-babi-dark font-bricolage">babi</span>
          <span className="text-xs font-semibold font-hanken text-babi-green uppercase tracking-wider">services</span>
        </div>
        <div className="hidden md:flex gap-8">
          <Link to="/services" className="text-gray-700 font-medium hover:text-babi-green transition-colors">Services</Link>
          <a href="#how-it-works" className="text-gray-700 font-medium hover:text-babi-green transition-colors">Comment ça marche</a>
          <a href="#become-pro" className="text-gray-700 font-medium hover:text-babi-green transition-colors">Devenir prestataire</a>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/connexion" className="text-gray-700 font-semibold hover:text-babi-green transition-colors">Connexion</Link>
          <Link to="/inscription" className="bg-[#059669] text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

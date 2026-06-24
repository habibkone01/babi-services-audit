import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGetMe, apiGetReservations, apiGetServices, apiLogout } from '../services/api'

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M2.5 3.33333C2.5 2.8731 2.8731 2.5 3.33333 2.5H8.33333C8.79357 2.5 9.16667 2.8731 9.16667 3.33333V8.33333C9.16667 8.79357 8.79357 9.16667 8.33333 9.16667H3.33333C2.8731 9.16667 2.5 8.79357 2.5 8.33333V3.33333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.8333 3.33333C10.8333 2.8731 11.2064 2.5 11.6667 2.5H16.6667C17.1269 2.5 17.5 2.8731 17.5 3.33333V8.33333C17.5 8.79357 17.1269 9.16667 16.6667 9.16667H11.6667C11.2064 9.16667 10.8333 8.79357 10.8333 8.33333V3.33333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 11.6667C2.5 11.2064 2.8731 10.8333 3.33333 10.8333H8.33333C8.79357 10.8333 9.16667 11.2064 9.16667 11.6667V16.6667C9.16667 17.1269 8.79357 17.5 8.33333 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V11.6667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.8333 11.6667C10.8333 11.2064 11.2064 10.8333 11.6667 10.8333H16.6667C17.1269 10.8333 17.5 11.2064 17.5 11.6667V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H11.6667C11.2064 17.5 10.8333 17.1269 10.8333 16.6667V11.6667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M6.66667 1.66667V5M13.3333 1.66667V5M3.33333 8.33333H16.6667M5 3.33333H15C15.9205 3.33333 16.6667 4.07953 16.6667 5V16.6667C16.6667 17.5871 15.9205 18.3333 15 18.3333H5C4.07953 18.3333 3.33333 17.5871 3.33333 16.6667V5C3.33333 4.07953 4.07953 3.33333 5 3.33333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 9.16667C17.5031 10.2474 17.2516 11.3141 16.7667 12.2833C16.1925 13.4501 15.2944 14.4316 14.1822 15.1056C13.07 15.7796 11.7905 16.1188 10.4917 16.0833C9.41087 16.0865 8.34418 15.835 7.375 15.35L2.5 16.6667L3.81667 11.7917C3.33165 10.8225 3.08019 9.75582 3.08333 8.675C3.04781 7.37615 3.38704 6.09665 4.06103 4.98444C4.73502 3.87224 5.71653 2.97414 6.88333 2.4C7.85249 1.91512 8.91924 1.66359 10 1.66667H10.4167C12.1217 1.75636 13.7345 2.46491 14.9404 3.6608C16.1462 4.85669 16.8548 6.46951 16.9444 8.175L17.5 9.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HeartIcon = ({ fill = 'none' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill={fill}>
    <path d="M17.5 6.66667C17.5 4.36548 15.6345 2.5 13.3333 2.5C11.5707 2.5 10.0673 3.55626 9.16667 5.04167C8.26603 3.55626 6.76266 2.5 5 2.5C2.69881 2.5 0.833333 4.36548 0.833333 6.66667C0.833333 12.0833 9.16667 17.5 9.16667 17.5C9.16667 17.5 17.5 12.0833 17.5 6.66667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.833333, 0)"/>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M8.43417 2.5H11.5658C11.7421 2.5 11.8939 2.62325 11.9252 2.79667L12.2433 4.55667C12.6884 4.71591 13.1064 4.93883 13.485 5.21583L15.1717 4.6075C15.3382 4.5475 15.5237 4.61417 15.6133 4.7675L17.1792 7.4825C17.2683 7.63583 17.2333 7.83 17.0958 7.94L15.7042 9.0625C15.7375 9.295 15.755 9.5325 15.755 9.775C15.755 10.0175 15.7375 10.255 15.7042 10.4875L17.0958 11.61C17.2333 11.72 17.2683 11.9142 17.1792 12.0675L15.6133 14.7825C15.5237 14.9358 15.3382 15.0025 15.1717 14.9425L13.485 14.3342C13.1064 14.6112 12.6884 14.8341 12.2433 14.9933L11.9252 16.7533C11.8939 16.9267 11.7421 17.05 11.5658 17.05H8.43417C8.25792 17.05 8.10608 16.9267 8.07475 16.7533L7.75667 14.9933C7.3116 14.8341 6.89364 14.6112 6.515 14.3342L4.82833 14.9425C4.66183 15.0025 4.47633 14.9358 4.38667 14.7825L2.82083 12.0675C2.73167 11.9142 2.76667 11.72 2.90417 11.61L4.29583 10.4875C4.2625 10.255 4.245 10.0175 4.245 9.775C4.245 9.5325 4.2625 9.295 4.29583 9.0625L2.90417 7.94C2.76667 7.83 2.73167 7.63583 2.82083 7.4825L4.38667 4.7675C4.47633 4.61417 4.66183 4.5475 4.82833 4.6075L6.515 5.21583C6.89364 4.93883 7.3116 4.71591 7.75667 4.55667L8.07475 2.79667C8.10608 2.62325 8.25792 2.5 8.43417 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 7.33333C2 10.2769 4.38979 12.6667 7.33333 12.6667C10.2769 12.6667 12.6667 10.2769 12.6667 7.33333C12.6667 4.38979 10.2769 2 7.33333 2C4.38979 2 2 4.38979 2 7.33333V7.33333" stroke="#8A7A6E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.9995 14.0005L11.1328 11.1338" stroke="#8A7A6E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M15 6.66667C15 5.34058 14.4732 4.0688 13.5355 3.13112C12.5979 2.19344 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19344 6.46447 3.13112C5.52679 4.0688 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.579 18.2536 10.2922 18.3304 10 18.3304C9.70782 18.3304 9.42102 18.2536 9.16804 18.1079C8.91505 17.9622 8.70477 17.7526 8.55833 17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 5V10L13.3333 11.6667M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z" stroke="#0284C7" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 10L9.16667 11.6667L12.5 8.33333M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z" stroke="#059669" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 6.66667H2.5M17.5 6.66667V14.1667C17.5 15.0871 16.7538 15.8333 15.8333 15.8333H4.16667C3.24619 15.8333 2.5 15.0871 2.5 14.1667V6.66667M17.5 6.66667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V6.66667" stroke="#D97706" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.16271 14.7108 7.83599 14.7108 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 3.72279 5.0558 1.33301 7.99935 1.33301C10.9429 1.33301 13.3327 3.72279 13.3327 6.66634" stroke="#8A7A6E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M14.6673 4H1.33398V12H14.6673V4Z" stroke="#8A7A6E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#8A7A6E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14.6667 11.28V13.28C14.6675 13.4622 14.6299 13.6426 14.5563 13.8088C14.4827 13.975 14.3748 14.1233 14.2395 14.2444C14.1042 14.3656 13.9444 14.4569 13.7709 14.5123C13.5974 14.5677 13.4142 14.5859 13.2333 14.5667C11.1622 14.3411 9.17 13.6473 7.42 12.54C5.79096 11.5395 4.40754 10.156 3.40667 8.52667C2.29333 6.76665 1.59917 4.76586 1.38 2.68333C1.36083 2.50301 1.379 2.32056 1.43438 2.14781C1.48976 1.97506 1.5809 1.81601 1.70172 1.6809C1.82255 1.5458 1.97014 1.43815 2.1356 1.36476C2.30106 1.29137 2.48063 1.25401 2.66 1.25H4.66C4.97104 1.24685 5.27307 1.36215 5.51343 1.57427C5.7538 1.78639 5.91432 2.08084 5.96 2.39833C6.04571 3.07333 6.21072 3.73643 6.45 4.37C6.5304 4.5882 6.55029 4.82355 6.50748 5.05277C6.46468 5.28199 6.36059 5.49519 6.20667 5.66667L5.42667 6.44667C6.31934 8.10271 7.5973 9.38067 9.25333 10.2733L10.0333 9.49333C10.2048 9.33941 10.418 9.23532 10.6472 9.19252C10.8765 9.14971 11.1118 9.16961 11.33 9.25C11.9636 9.48928 12.6267 9.65429 13.3017 9.74C13.6192 9.78568 13.9136 9.9462 14.1257 10.1866C14.3378 10.4269 14.4531 10.729 14.45 11.04L14.6667 11.28Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const navItems = [
  { icon: <GridIcon />, label: 'Aperçu', active: true },
  { icon: <CalendarIcon />, label: 'Réservations' },
  { icon: <MessageIcon />, label: 'Messages' },
  { icon: <HeartIcon />, label: 'Favoris' },
  { icon: <SettingsIcon />, label: 'Paramètres' },
]

const statutLabels = {
  en_attente: 'en attente',
  confirmee: 'confirmée',
  annulee: 'annulée',
  terminee: 'terminée',
}

const statutStyles = {
  en_attente: 'bg-amber-50 text-amber-700',
  confirmee: 'bg-emerald-50 text-emerald-700',
  annulee: 'bg-red-50 text-red-600',
  terminee: 'bg-gray-100 text-gray-500',
}

const avatarPalette = [
  'bg-violet-200 text-violet-700',
  'bg-amber-200 text-amber-700',
  'bg-sky-200 text-sky-700',
  'bg-emerald-200 text-emerald-700',
  'bg-rose-200 text-rose-700',
]

function avatarBg(index) {
  return avatarPalette[index % avatarPalette.length]
}

function initials(prenom, nom) {
  return `${(prenom?.[0] ?? '').toUpperCase()}${(nom?.[0] ?? '').toUpperCase()}`
}

function formatMontant(value) {
  return `${Number(value ?? 0).toLocaleString('fr-FR')} F`
}

function formatDateHeure(dateReservation, heureReservation) {
  if (!dateReservation) return '—'
  const date = new Date(dateReservation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  const heure = heureReservation ? heureReservation.slice(0, 5) : ''
  return heure ? `${date} · ${heure}` : date
}

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [reservations, setReservations] = useState([])
  const [recommandes, setRecommandes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiGetMe(), apiGetReservations(), apiGetServices()]).then(
      ([me, reservationsRes, servicesRes]) => {
        if (me.ok) setUser(me.data)
        if (reservationsRes.ok) setReservations(reservationsRes.data)

        if (servicesRes.ok) {
          const parPrestataire = new Map()
          servicesRes.data.forEach((service) => {
            if (service.prestataire && !parPrestataire.has(service.id_prestataire)) {
              parPrestataire.set(service.id_prestataire, service)
            }
          })
          setRecommandes([...parPrestataire.values()].slice(0, 3))
        }

        setLoading(false)
      }
    )
  }, [])

  async function handleLogout() {
    await apiLogout()
    localStorage.removeItem('token')
    navigate('/')
  }

  const aVenir = reservations.filter((r) => ['en_attente', 'confirmee'].includes(r.statut))
  const terminees = reservations.filter((r) => r.statut === 'terminee')
  const moisCourant = new Date().getMonth()
  const anneeCourante = new Date().getFullYear()
  const depenseCeMois = terminees
    .filter((r) => {
      const d = new Date(r.date_reservation)
      return d.getMonth() === moisCourant && d.getFullYear() === anneeCourante
    })
    .reduce((total, r) => total + Number(r.service?.tarif ?? 0), 0)

  const prochaine = [...aVenir].sort((a, b) => new Date(a.date_reservation) - new Date(b.date_reservation))[0]
  const activiteRecente = reservations.slice(0, 5)

  const stats = [
    { icon: <ClockIcon />, iconBg: 'bg-sky-50', value: String(aVenir.length), label: 'Réservations à venir' },
    { icon: <CheckCircleIcon />, iconBg: 'bg-emerald-50', value: String(terminees.length), label: 'Missions terminées' },
    { icon: <HeartIcon fill="#E11D48" />, iconBg: 'bg-rose-50', value: '0', label: 'Prestataires favoris' },
    { icon: <WalletIcon />, iconBg: 'bg-amber-50', value: formatMontant(depenseCeMois), label: 'Dépensé ce mois' },
  ]

  return (
    <div className="min-h-screen flex bg-babi-cream">
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <span className="w-2.5 h-2.5 bg-babi-green rounded-full"></span>
            <span className="text-xl font-extrabold font-bricolage text-babi-dark">
              babi <span className="text-babi-green">services</span>
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  item.active ? 'bg-babi-green text-white' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.label === 'Réservations' && aVenir.length > 0 && (
                  <span className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-babi-green text-white">
                    {aVenir.length}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <a href="#" className="flex items-center gap-2 text-gray-400 text-sm px-4 mb-4">
            <SearchIcon />
            Chercher un service
          </a>
          <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
            <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
              {initials(user?.prenom, user?.nom)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-babi-dark text-sm truncate">{user ? `${user.prenom} ${user.nom}` : '—'}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role ?? 'Client'}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-babi-dark transition-colors">
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 w-full max-w-sm">
            <SearchIcon />
            <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none text-sm text-gray-700 w-full" />
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="relative text-gray-500 hover:text-babi-dark transition-colors">
              <BellIcon />
            </button>
            <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {initials(user?.prenom, user?.nom)}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-babi-dark font-bricolage">Bonjour, {user?.prenom ?? '...'} 👋</h1>
            <p className="text-gray-500 mt-1">Voici un aperçu de votre activité.</p>
          </div>
          <button className="bg-babi-green text-white px-5 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2 shrink-0">
            <span className="text-lg leading-none">+</span> Nouvelle réservation
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100">
              <span className={`inline-flex p-2.5 rounded-xl mb-4 ${stat.iconBg}`}>
                {stat.icon}
              </span>
              <p className="text-2xl font-extrabold text-babi-dark font-bricolage">{loading ? '…' : stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-babi-dark">Prochaine réservation</h2>
              {prochaine && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutStyles[prochaine.statut]}`}>
                  {statutLabels[prochaine.statut]}
                </span>
              )}
            </div>
            {prochaine ? (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <span className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${avatarBg(0)}`}>
                    {initials(prochaine.service?.prestataire?.prenom, prochaine.service?.prestataire?.nom)}
                  </span>
                  <div>
                    <p className="font-semibold text-babi-dark">
                      {prochaine.service?.prestataire?.prenom} {prochaine.service?.prestataire?.nom}
                    </p>
                    <p className="text-sm text-gray-500">{prochaine.service?.nom_service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5"><CalendarIcon /> {formatDateHeure(prochaine.date_reservation, prochaine.heure_reservation)}</span>
                  {prochaine.service?.prestataire?.localisation && (
                    <span className="flex items-center gap-1.5"><PinIcon /> {prochaine.service.prestataire.localisation}</span>
                  )}
                  <span className="flex items-center gap-1.5"><MoneyIcon /> {formatMontant(prochaine.service?.tarif)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-babi-dark font-semibold py-3 rounded-xl hover:border-babi-green transition-colors">
                    <MessageIcon /> Message
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-babi-green text-white font-semibold py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    <PhoneIcon /> Appeler
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">{loading ? 'Chargement...' : 'Aucune réservation à venir.'}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-babi-dark mb-5">Recommandés pour vous</h2>
            <div className="flex flex-col gap-4">
              {recommandes.map((service, index) => (
                <div key={service.id_service} className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarBg(index)}`}>
                    {initials(service.prestataire?.prenom, service.prestataire?.nom)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-babi-dark text-sm truncate">{service.prestataire?.prenom} {service.prestataire?.nom}</p>
                    <p className="text-xs text-gray-500 truncate">{service.nom_service}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-babi-dark shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="#FBBF24">
                      <path d="M8 1.33301L9.92667 5.55301L14.6667 6.22634L11.3333 9.42634L12.16 14.0997L8 11.873L3.84 14.0997L4.66667 9.42634L1.33333 6.22634L6.07333 5.55301L8 1.33301Z"/>
                    </svg>
                    {service.prestataire?.note_moyenne ?? '—'}
                  </span>
                </div>
              ))}
              {!loading && recommandes.length === 0 && (
                <p className="text-sm text-gray-500">Aucune recommandation pour le moment.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-babi-dark mb-5">Activité récente</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                  <th className="font-semibold pb-3 pr-4">Réf.</th>
                  <th className="font-semibold pb-3 pr-4">Prestataire</th>
                  <th className="font-semibold pb-3 pr-4">Service</th>
                  <th className="font-semibold pb-3 pr-4">Date</th>
                  <th className="font-semibold pb-3 pr-4">Statut</th>
                  <th className="font-semibold pb-3">Montant</th>
                </tr>
              </thead>
              <tbody>
                {activiteRecente.map((reservation, index) => (
                  <tr key={reservation.id_reservation} className="border-t border-gray-100">
                    <td className="py-3 pr-4 text-gray-500">BK-{String(reservation.id_reservation).padStart(4, '0')}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarBg(index)}`}>
                          {initials(reservation.service?.prestataire?.prenom, reservation.service?.prestataire?.nom)}
                        </span>
                        <span className="font-semibold text-babi-dark">
                          {reservation.service?.prestataire?.prenom} {reservation.service?.prestataire?.nom}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{reservation.service?.nom_service}</td>
                    <td className="py-3 pr-4 text-gray-500">{formatDateHeure(reservation.date_reservation, reservation.heure_reservation)}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutStyles[reservation.statut]}`}>
                        {statutLabels[reservation.statut]}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-babi-dark">{formatMontant(reservation.service?.tarif)}</td>
                  </tr>
                ))}
                {!loading && activiteRecente.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">Aucune réservation pour le moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

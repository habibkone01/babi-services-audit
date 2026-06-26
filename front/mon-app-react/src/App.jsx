import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ServicesPage from './pages/ServicesPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import PrestatairesAdmin from './pages/PrestatairesAdmin'
import CategoriesAdmin from './pages/CategoriesAdmin'
import ServicesAdmin from './pages/ServicesAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import ReservationFormPage from './pages/ReservationFormPage'
import MesReservationsPage from './pages/MesReservationsPage'
import DevenirPrestataire from './pages/DevenirPrestataire'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<SignUp />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/devenir-prestataire" element={<DevenirPrestataire />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/prestataires"
        element={
          <ProtectedRoute>
            <PrestatairesAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <CategoriesAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <ServicesAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/services/:id/reserver" element={<ReservationFormPage />} />
      <Route path="/reservations" element={<MesReservationsPage />} />
    </Routes>
  )
}

export default App

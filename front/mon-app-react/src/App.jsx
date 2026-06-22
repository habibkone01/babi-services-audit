import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ServicesPage from './pages/ServicesPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<SignUp />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App

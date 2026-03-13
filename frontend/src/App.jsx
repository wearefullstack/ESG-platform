import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BrandProvider } from './context/BrandContext'
import DemoBanner from './components/DemoBanner'
import MainLandingPage from './pages/MainLandingPage'
import PartnerLandingPage from './pages/PartnerLandingPage'
import LoginPage from './pages/LoginPage'
import OnboardingWizard from './pages/OnboardingWizard'
import DashboardPage from './pages/DashboardPage'
import ReportGenerationPage from './pages/ReportGenerationPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsAuthenticated(true)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData, token) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <BrandProvider>
      <DemoBanner />
      <Router>
        <Routes>
          {/* Main landing - brand selection */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <MainLandingPage />
              )
            }
          />

          {/* Partner-specific landing pages */}
          <Route
            path="/wcpg"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <PartnerLandingPage />
              )
            }
          />
          <Route
            path="/jse"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <PartnerLandingPage />
              )
            }
          />
          <Route
            path="/coct"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <PartnerLandingPage />
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <OnboardingWizard />
              )
            }
          />

          {/* Dashboard (protected) */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Report (protected) */}
          <Route
            path="/report"
            element={
              isAuthenticated ? (
                <ReportGenerationPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </BrandProvider>
  )
}

export default App

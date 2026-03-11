import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BrandProvider } from './context/BrandContext'
import LandingPage from './pages/LandingPage'
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <LandingPage />
              )
            }
          />
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

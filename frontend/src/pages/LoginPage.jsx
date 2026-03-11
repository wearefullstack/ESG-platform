import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useBrand } from '../context/BrandContext'
import '../styles/LoginPage.css'

export default function LoginPage({ onLogin }) {
  const { brand } = useBrand()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        onLogin(response.data.user, response.data.access_token)
        // Navigate to dashboard after successful login
        navigate('/dashboard')
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          {brand && (
            <img
              src={`/brands/${brand.slug}/logo.svg`}
              alt={brand.name}
              className="login-logo"
            />
          )}
          <h1>ESG Reporting Platform</h1>
          <p>Sustainability Disclosure Made Simple</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wcpg.local"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials:</p>
          <p>Email: <code>admin@wcpg.local</code></p>
          <p>Password: <code>any</code></p>
        </div>
      </div>
    </div>
  )
}

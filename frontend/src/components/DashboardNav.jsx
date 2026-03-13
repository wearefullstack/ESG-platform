import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import Breadcrumb from './Breadcrumb'
import './DashboardNav.css'

export default function DashboardNav({ currentPage, user, onLogout }) {
  const navigate = useNavigate()
  const { brand } = useBrand()
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const brandSlug = brand?.slug || 'wcpg'

  return (
    <div className="nav-container">
      <nav className={`dashboard-nav dashboard-nav-${brandSlug}`}>
        <Breadcrumb onLogout={onLogout} />

        <button className="nav-left nav-home-btn" onClick={() => {
          onLogout()
          window.location.href = '/'
        }}>
          {brand && (
            <img
              src={`/brands/${brand.slug}/logo.png`}
              alt={brand.name}
              className="nav-logo"
            />
          )}
        </button>

        <div className="nav-right">
          <div className="user-dropdown">
            <button
              className="user-dropdown-btn"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title={user?.email || 'User Menu'}
            >
              ☰
            </button>
            {userDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-item">
                  <span className="user-label">Logged in as:</span>
                  <span className="user-email">{user?.email || 'User'}</span>
                </div>
                <button className="dropdown-menu-item">📄 Generate Report</button>
                <button className="dropdown-menu-item">📁 Upload Data</button>
                <button className="dropdown-menu-item">📊 View History</button>
                <button
                  className="dropdown-logout-btn"
                  onClick={() => {
                    onLogout()
                    setUserDropdownOpen(false)
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

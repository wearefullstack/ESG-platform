import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import './DashboardNav.css'

export default function DashboardNav({ currentPage, user, onLogout }) {
  const navigate = useNavigate()
  const { brand } = useBrand()

  const brandSlug = brand?.slug || 'wcpg'

  return (
    <nav className={`dashboard-nav dashboard-nav-${brandSlug}`}>
      <div className="nav-left">
        {brand && (
          <img
            src={`/brands/${brand.slug}/logo.png`}
            alt={brand.name}
            className="nav-logo"
          />
        )}
        <div className="nav-title">
          <h2>{brand?.name || 'ESG Platform'}</h2>
          <p>Sustainability Reporting Platform</p>
        </div>
      </div>

      <div className="nav-center">
        <button
          className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-link ${currentPage === 'report' ? 'active' : ''}`}
          onClick={() => navigate('/report')}
        >
          📄 Generate Report
        </button>
      </div>

      <div className="nav-right">
        <div className="user-info">
          <span className="user-label">Logged in as:</span>
          <span className="user-email">{user?.email || 'User'}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  )
}

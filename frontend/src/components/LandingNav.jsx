import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import './LandingNav.css'

export default function LandingNav() {
  const navigate = useNavigate()
  const { brand } = useBrand()

  const brandSlug = brand?.slug || 'wcpg'

  return (
    <nav className={`landing-nav landing-nav-${brandSlug}`}>
      <div className="nav-container">
        {/* Left: Branding */}
        <div className="nav-left">
          <span className="nav-brand">🌱 ESG Platform</span>
        </div>

        {/* Right: Buttons */}
        <div className="nav-right">
          <button
            className="nav-btn nav-btn-secondary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="nav-btn nav-btn-primary"
            onClick={() => {
              const element = document.getElementById('partner-selection')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

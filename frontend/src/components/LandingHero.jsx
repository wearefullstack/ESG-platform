import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import './LandingHero.css'

export default function LandingHero() {
  const navigate = useNavigate()
  const { brand } = useBrand()

  const brandSlug = brand?.slug || 'wcpg'

  const handleGetStarted = () => {
    const element = document.getElementById('partner-selection')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={`landing-hero landing-hero-${brandSlug}`}>
      <div className="hero-content">
        <h1 className="hero-title">Transform ESG from Risk to Competitive Advantage</h1>

        <p className="hero-subtitle">
          Turn sustainability reporting into a strategic advantage. Attract investors, reduce operational risk,
          strengthen your brand, and retain top talent—all through comprehensive ESG intelligence.
        </p>

        <div className="hero-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <span className="benefit-text">Attract Investors & Capital</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📈</span>
            <span className="benefit-text">Reduce Operational Risk</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <span className="benefit-text">Strengthen Brand & Reputation</span>
          </div>
        </div>

        <div className="hero-cta">
          <button
            className="hero-btn hero-btn-primary"
            onClick={handleGetStarted}
          >
            Schedule Your ESG Strategy Demo →
          </button>
          <button
            className="hero-btn hero-btn-secondary"
            onClick={() => navigate('/login')}
          >
            Login to Dashboard
          </button>
        </div>
      </div>

      {/* Decorative background shapes */}
      <div className="hero-decoration hero-deco-1"></div>
      <div className="hero-decoration hero-deco-2"></div>
      <div className="hero-decoration hero-deco-3"></div>
    </section>
  )
}

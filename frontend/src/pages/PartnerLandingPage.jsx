import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useBrand } from '../context/BrandContext'
import '../styles/PartnerLandingPage.css'

export default function PartnerLandingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { brand, selectBrand } = useBrand()

  // Set brand based on URL path
  useEffect(() => {
    const pathSlug = location.pathname.substring(1) // Remove leading /
    if (pathSlug && ['wcpg', 'jse', 'coct'].includes(pathSlug)) {
      selectBrand(pathSlug)
    }
  }, [location.pathname, selectBrand])

  const partnerData = {
    wcpg: {
      name: 'Western Cape Provincial Government',
      tagline: 'ESG Reporting for Western Cape Businesses',
      subtitle: 'Supporting businesses in the Western Cape to report sustainability data',
      features: [
        { icon: '📋', title: 'Compliance Made Easy', desc: 'Aligned with ISSB and JSE standards' },
        { icon: '📊', title: 'Real-time Visibility', desc: 'Track province-wide sustainability progress' },
        { icon: '🎯', title: 'Simple Onboarding', desc: 'Quick setup for SMEs and enterprises' }
      ]
    },
    jse: {
      name: 'Johannesburg Stock Exchange',
      tagline: 'ESG Reporting for JSE-Listed Companies',
      subtitle: 'Meet JSE listing requirements with standardized ESG reporting',
      features: [
        { icon: '📈', title: 'Investor-Ready Reports', desc: 'Generate TCFD-aligned disclosures' },
        { icon: '✅', title: 'Compliance Certified', desc: 'JSE listing requirements built-in' },
        { icon: '🏆', title: 'Competitive Edge', desc: 'Gain advantage with enhanced disclosure' }
      ]
    },
    coct: {
      name: 'City of Cape Town',
      tagline: 'ESG Reporting for Cape Town Businesses',
      subtitle: 'Help Cape Town track sustainability and manage resources',
      features: [
        { icon: '💧', title: 'Water & Energy Tracking', desc: 'Manage critical resources efficiently' },
        { icon: '🌍', title: 'Green Certification', desc: 'Access sustainability recognition programs' },
        { icon: '📍', title: 'Local Impact', desc: 'Contribute to municipal sustainability goals' }
      ]
    }
  }

  const data = partnerData[brand?.slug] || partnerData.wcpg

  const handleLogin = () => {
    navigate(`/login?brand=${brand?.slug}`)
  }

  const handleRegister = () => {
    navigate(`/register?brand=${brand?.slug}`)
  }

  const handleBackToMain = () => {
    navigate('/')
  }

  return (
    <div className={`partner-landing partner-landing-${brand?.slug}`}>
      {/* Top Navigation */}
      <nav className="partner-nav">
        <div className="nav-container">
          <button className="nav-back" onClick={handleBackToMain}>
            ← Back to Organizations
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="partner-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          {/* Logo */}
          <div className="hero-logo">
            <img
              src={`/brands/${brand?.slug}/logo.png`}
              alt={brand?.name}
              className="logo"
            />
          </div>

          {/* Content */}
          <h1 className="hero-title">{data.tagline}</h1>
          <p className="hero-subtitle">{data.subtitle}</p>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <button className="cta-primary" onClick={handleLogin}>
              Login to Dashboard →
            </button>
            <button className="cta-secondary" onClick={handleRegister}>
              Register Organization
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="partner-features">
        <div className="container">
          <h2>Platform Features</h2>
          <div className="features-grid">
            {data.features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="partner-info">
        <div className="container">
          <h2>About This Platform</h2>
          <div className="info-content">
            <p>
              The ESG Reporting Platform is a white-labelled solution designed specifically for
              distribution partners like {data.name}. Our platform enables organizations to:
            </p>
            <ul>
              <li>✓ Collect ESG data efficiently with guided questionnaires</li>
              <li>✓ Validate data automatically to ensure quality and consistency</li>
              <li>✓ Generate standards-compliant reports (ISSB, JSE, GRI)</li>
              <li>✓ Track progress with real-time dashboards and analytics</li>
              <li>✓ Export to multiple formats for stakeholder communication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="partner-footer-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of organizations reporting ESG data on our platform</p>
          <button className="cta-large" onClick={handleLogin}>
            Login Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="partner-footer">
        <div className="container">
          <p>
            ESG Reporting Platform © 2026 | Powered by Full Stack |{' '}
            <span className="partner-name">{data.name}</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import '../styles/MainLandingPage.css'

export default function MainLandingPage() {
  const navigate = useNavigate()

  const partners = [
    {
      id: 'wcpg',
      name: 'Western Cape Provincial Government',
      slug: 'wcpg',
      description: 'Enabling ESG reporting for businesses across the Western Cape',
      color: '#001489',
      logo: '/brands/wcpg/logo.png'
    },
    {
      id: 'jse',
      name: 'Johannesburg Stock Exchange',
      slug: 'jse',
      description: 'Standard ESG reporting for JSE-listed companies',
      color: '#A3CF61',
      logo: '/brands/jse/logo.png'
    },
    {
      id: 'coct',
      name: 'City of Cape Town',
      slug: 'coct',
      description: 'ESG reporting for Cape Town businesses and organizations',
      color: '#08677B',
      logo: '/brands/coct/logo.png'
    }
  ]

  const handleSelectPartner = (slug) => {
    navigate(`/${slug}`)
  }

  return (
    <div className="main-landing">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <h1>ESG Reporting Platform</h1>
          <p>Choose your organization to get started</p>
        </div>
      </header>

      {/* Partner Cards */}
      <main className="partner-selection">
        <div className="container">
          <div className="partner-cards-grid">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="partner-card"
                style={{ borderTopColor: partner.color }}
                onClick={() => handleSelectPartner(partner.slug)}
              >
                {/* Logo */}
                <div className="partner-logo-container">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo"
                  />
                </div>

                {/* Name */}
                <h2 className="partner-name" style={{ color: partner.color }}>
                  {partner.name}
                </h2>

                {/* Description */}
                <p className="partner-description">{partner.description}</p>

                {/* CTA */}
                <button
                  className="partner-cta"
                  style={{ backgroundColor: partner.color }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  Select Organization →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; 2026 ESG Reporting Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

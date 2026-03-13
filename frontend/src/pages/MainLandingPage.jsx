import { useNavigate } from 'react-router-dom'
import LandingNav from '../components/LandingNav'
import LandingHero from '../components/LandingHero'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import WhyESGMattersSection from '../components/WhyESGMattersSection'
import CTASection from '../components/CTASection'
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
      {/* Top Navigation */}
      <LandingNav />

      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Why ESG Matters Section */}
      <WhyESGMattersSection />

      {/* CTA Section */}
      <CTASection />

      {/* Partner Selection Section */}
      <section id="partner-selection" className="partner-selection">
        <div className="container">
          <div className="partner-selection-header">
            <h2>Select a Partner for This Demo</h2>
            <p>These are example distribution partners. This is a prototype demonstration of how the platform would be white-labeled for different organizations.</p>
          </div>

          <div className="partner-cards-grid">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="partner-card"
                style={{ borderTopColor: partner.color }}
                onClick={() => handleSelectPartner(partner.slug)}
              >
                {/* Demo Badge */}
                <div className="demo-badge-card">DEMO</div>

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
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; 2026 ESG Reporting Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

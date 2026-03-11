import { useNavigate } from 'react-router-dom'
import '../styles/LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  const partners = [
    {
      id: 'wcpg',
      name: 'Western Cape Provincial Government',
      slug: 'WCPG',
      description: 'Supporting businesses across the Western Cape to report ESG performance and drive sustainability.',
      primary: '#001489',
      secondary: '#FFFFFF',
      accent: '#0066CC',
      features: [
        'Simple SME questionnaires',
        'Data validation & quality checks',
        'ISSB & JSE compliance',
        'Customizable dashboards'
      ]
    },
    {
      id: 'jse',
      name: 'Johannesburg Stock Exchange',
      slug: 'JSE',
      description: 'Enabling listed companies to meet JSE sustainability disclosure requirements and enhance investor transparency.',
      primary: '#A3CF61',
      secondary: '#000000',
      accent: '#0066CC',
      features: [
        'Financial data integration',
        'Advanced analytics',
        'Multi-framework reporting',
        'Real-time dashboards'
      ]
    },
    {
      id: 'coct',
      name: 'City of Cape Town',
      slug: 'CoCT',
      description: 'Helping Cape Town businesses demonstrate environmental and social commitment through comprehensive ESG reporting.',
      primary: '#08677B',
      secondary: '#ECF3F9',
      accent: '#CCCC00',
      features: [
        'Community engagement',
        'Environmental focus',
        'Accessibility-first design',
        'Local impact reporting'
      ]
    }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundColor: '#001489' }}>
        <div className="hero-content">
          <h1 className="hero-title">ESG Reporting Made Simple</h1>
          <p className="hero-subtitle">
            A white-labelled sustainability reporting platform for distribution partners and their businesses.
          </p>
          <button
            className="hero-cta"
            onClick={() => navigate('/register')}
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">📊</div>
              <h3>Real-Time Dashboards</h3>
              <p>Track ESG metrics in real-time with customizable dashboards and trend analysis.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3>Compliance Ready</h3>
              <p>Aligned with ISSB (IFRS S1/S2), JSE, and GRI standards out of the box.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Easy Onboarding</h3>
              <p>Simple questionnaires for small businesses, full API integration for enterprises.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>Multi-tenant architecture with row-level security and audit logging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Partners */}
      <section className="partners">
        <div className="container">
          <h2>Distribution Partners</h2>
          <p className="section-subtitle">Choose your platform instance</p>

          <div className="partners-grid">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="partner-card"
                style={{ borderTopColor: partner.primary }}
              >
                <div
                  className="partner-header"
                  style={{ backgroundColor: partner.primary }}
                >
                  <h3 style={{ color: partner.secondary }}>{partner.name}</h3>
                </div>

                <div className="partner-body">
                  <p className="partner-description">{partner.description}</p>

                  <div className="partner-features">
                    <h4>Features:</h4>
                    <ul>
                      {partner.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="feature-dot" style={{ backgroundColor: partner.accent }}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="partner-footer">
                    <div className="brand-colors">
                      <div
                        className="color-swatch"
                        title={`Primary: ${partner.primary}`}
                        style={{ backgroundColor: partner.primary }}
                      ></div>
                      <div
                        className="color-swatch"
                        title={`Secondary: ${partner.secondary}`}
                        style={{ backgroundColor: partner.secondary, border: '1px solid #ccc' }}
                      ></div>
                      <div
                        className="color-swatch"
                        title={`Accent: ${partner.accent}`}
                        style={{ backgroundColor: partner.accent }}
                      ></div>
                    </div>

                    <button
                      className="partner-button"
                      style={{
                        backgroundColor: partner.primary,
                        color: partner.secondary
                      }}
                      onClick={() => navigate('/register')}
                    >
                      Register with {partner.slug}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register</h3>
              <p>Sign up as a small, medium, or large business and choose your ESG reporting framework.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Submit Data</h3>
              <p>Enter ESG data via simple forms, CSV uploads, or API integration depending on your tier.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track & Analyze</h3>
              <p>Monitor your ESG performance with real-time dashboards and trend analysis.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Generate Reports</h3>
              <p>Download ISSB/JSE-compliant reports in PDF, Excel, or JSON format.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of businesses reporting ESG performance with confidence.</p>
          <button
            className="cta-button"
            onClick={() => navigate('/register')}
          >
            Register Your Organization
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About</h4>
              <ul>
                <li><a href="#overview">Platform Overview</a></li>
                <li><a href="#standards">ESG Standards</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#metrics">Metrics Guide</a></li>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Generic ESG Platform. Built by Full Stack for sustainability partners.</p>
            <p>Aligned with ISSB (IFRS S1/S2), JSE Guidance, and GRI Standards.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

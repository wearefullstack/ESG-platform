import './SocialProofSection.css'

const proofPoints = [
  {
    icon: '🏢',
    stat: '50+',
    label: 'Organizations Accelerated ESG Maturity'
  },
  {
    icon: '⚡',
    stat: '10x',
    label: 'Faster Report Generation'
  },
  {
    icon: '📊',
    stat: '100%',
    label: 'Investor-Ready Compliance'
  }
]

export default function SocialProofSection() {
  return (
    <section className="social-proof">
      <div className="proof-container">
        <h2>Trusted by Leaders to Deliver Investor-Ready ESG</h2>

        <div className="proof-grid">
          {proofPoints.map((point, idx) => (
            <div key={idx} className="proof-card">
              <div className="proof-icon">{point.icon}</div>
              <div className="proof-stat">{point.stat}</div>
              <div className="proof-label">{point.label}</div>
            </div>
          ))}
        </div>

        <div className="proof-partners">
          <p className="proof-partners-label">Trusted by sustainability leaders:</p>
          <div className="partners-logos">
            <div className="partner-badge">
              <img src="/brands/wcpg/logo.png" alt="WCPG" />
            </div>
            <div className="partner-badge">
              <img src="/brands/jse/logo.png" alt="JSE" />
            </div>
            <div className="partner-badge">
              <img src="/brands/coct/logo.png" alt="CoCT" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

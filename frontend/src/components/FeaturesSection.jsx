import './FeaturesSection.css'

const features = [
  {
    icon: '📊',
    title: 'Dashboard & Analytics',
    description: 'Real-time KPI monitoring, 12-month trends, and custom metrics at your fingertips'
  },
  {
    icon: '📋',
    title: 'Compliance Reporting',
    description: 'ISSB, GRI, and JSE-compliant reports generated with a single click'
  },
  {
    icon: '🌍',
    title: 'Multi-Metric Tracking',
    description: 'Track GHG Scope 1/2/3, energy, water, waste, and employee diversity'
  },
  {
    icon: '🔄',
    title: 'Data Export & Integration',
    description: 'Export to PDF, Excel, or JSON; seamless API integration available'
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Multi-tenant isolation, row-level security, and GDPR compliance built-in'
  }
]

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>Platform Capabilities</h2>
          <p>Everything you need for comprehensive sustainability reporting</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import './WhyESGMattersSection.css'

const outcomes = [
  {
    icon: '💰',
    title: 'Attract Capital',
    subtitle: 'Investors demand ESG transparency',
    description: 'Access new investor pools and improve valuation with comprehensive ESG disclosures'
  },
  {
    icon: '📈',
    title: 'Reduce Risk',
    subtitle: 'Identify and mitigate risks early',
    description: 'Protect your business by identifying climate, operational, and governance risks before they escalate'
  },
  {
    icon: '🎯',
    title: 'Strengthen Brand',
    subtitle: 'Build stakeholder trust and differentiation',
    description: 'Demonstrate commitment to sustainability, enhance reputation, and stand out from competitors'
  },
  {
    icon: '👥',
    title: 'Retain Talent',
    subtitle: 'Attract purpose-driven employees',
    description: 'Build a workplace culture that attracts and retains top talent who value corporate purpose'
  },
  {
    icon: '✅',
    title: 'Ensure Compliance',
    subtitle: 'Meet regulatory & listing requirements',
    description: 'Stay ahead of ESG regulations and listing requirements with built-in compliance frameworks'
  },
  {
    icon: '📊',
    title: 'Improve Performance',
    subtitle: 'ESG leaders outperform financially',
    description: 'Reduce costs, improve efficiency, and drive better financial outcomes through ESG insights'
  }
]

export default function WhyESGMattersSection() {
  return (
    <section className="why-esg-matters">
      <div className="outcomes-container">
        <div className="outcomes-header">
          <h2>Why ESG Matters</h2>
          <p>Transform ESG from a compliance checkbox into a strategic business advantage</p>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="outcome-card">
              <div className="outcome-icon">{outcome.icon}</div>
              <h3 className="outcome-title">{outcome.title}</h3>
              <p className="outcome-subtitle">{outcome.subtitle}</p>
              <p className="outcome-description">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

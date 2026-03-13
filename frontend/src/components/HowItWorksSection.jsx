import './HowItWorksSection.css'

const steps = [
  {
    number: 1,
    title: 'Select Organization',
    subtitle: 'Choose your distribution partner',
    icon: '🏢'
  },
  {
    number: 2,
    title: 'Register & Onboard',
    subtitle: '4-step setup wizard, quick and easy',
    icon: '📝'
  },
  {
    number: 3,
    title: 'Collect & Track',
    subtitle: 'Add data via forms, CSV, or API',
    icon: '📊'
  },
  {
    number: 4,
    title: 'Report & Analyze',
    subtitle: 'Generate compliant reports instantly',
    icon: '📄'
  }
]

export default function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <div className="how-container">
        <div className="how-header">
          <h2>How It Works</h2>
          <p>Get from zero to ESG reporting hero in 4 simple steps</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-circle">
                <span className="step-number">{step.number}</span>
              </div>

              <div className="step-icon">{step.icon}</div>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-subtitle">{step.subtitle}</p>

              {idx < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

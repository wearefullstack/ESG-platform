import './CTASection.css'

export default function CTASection() {
  const handleGetStarted = () => {
    const element = document.getElementById('partner-selection')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Transform Your Sustainability Reporting?</h2>
        <p className="cta-subtitle">
          See how leading organizations attract investors, reduce risk, and accelerate ESG compliance
        </p>

        <button className="cta-button" onClick={handleGetStarted}>
          Schedule Your Demo →
        </button>
      </div>
    </section>
  )
}

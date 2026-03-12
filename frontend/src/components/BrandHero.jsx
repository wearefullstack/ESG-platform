import { useBrand } from '../context/BrandContext'
import './BrandHero.css'

export default function BrandHero({ title, subtitle, cta, ctaAction }) {
  const { brand } = useBrand()

  if (!brand) return null

  const brandSlug = brand.slug

  return (
    <section className={`brand-hero brand-hero-${brandSlug}`}>
      {/* Animated background elements */}
      <div className="hero-background">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
        <div className="hero-glow"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <img
            src={`/brands/${brand.slug}/logo.png`}
            alt={brand.name}
            className="badge-icon-logo"
          />
          <span className="badge-text">{brand.name}</span>
        </div>

        <h1 className="hero-title">{title}</h1>

        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-cta-group">
          <button className="hero-button primary" onClick={ctaAction}>
            {cta}
            <span className="button-arrow">→</span>
          </button>
          <button className="hero-button secondary">
            Learn more
          </button>
        </div>

        {/* Floating stats cards */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">ESG Metrics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Standards</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Compliant</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M12 19l-4-4m4 4l4-4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

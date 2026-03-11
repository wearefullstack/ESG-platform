import { useState } from 'react'
import { useBrand } from '../context/BrandContext'
import './BrandSelector.css'

export default function BrandSelector() {
  const { brands, brand, selectBrand } = useBrand()
  const [isOpen, setIsOpen] = useState(false)

  if (!brands || brands.length === 0 || !brand) {
    return null
  }

  const handleSelectBrand = async (slug) => {
    await selectBrand(slug)
    setIsOpen(false)
  }

  const currentBrand = brands.find(b => b.slug === brand.slug)

  return (
    <div className="brand-selector">
      <button
        className="brand-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select brand"
      >
        <img
          src={currentBrand?.logo || '/brands/wcpg/logo.svg'}
          alt={currentBrand?.name || 'Brand'}
          className="brand-selector-logo"
        />
        <span className="brand-selector-label">{currentBrand?.slug.toUpperCase() || 'WCPG'}</span>
        <span className={`brand-selector-arrow ${isOpen ? 'open' : ''}`}>⌄</span>
      </button>

      {isOpen && (
        <div className="brand-selector-dropdown">
          {brands.map(b => (
            <button
              key={b.id}
              className={`brand-selector-option ${b.slug === brand.slug ? 'active' : ''}`}
              onClick={() => handleSelectBrand(b.slug)}
            >
              <img src={b.logo} alt={b.name} className="option-logo" />
              <span className="option-name">{b.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

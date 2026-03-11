/**
 * Brand Manager - Handles dynamic theme switching for multi-tenant white-labeling
 */

const BRAND_CACHE_KEY = 'esg-brand-selection'

export const brandManager = {
  /**
   * Get all available brands
   */
  async getAllBrands() {
    try {
      const response = await fetch('/brands/index.json')
      if (!response.ok) throw new Error('Failed to load brands')
      return await response.json()
    } catch (error) {
      console.error('Error loading brands:', error)
      return { brands: [] }
    }
  },

  /**
   * Get a specific brand configuration
   */
  async getBrand(slug) {
    try {
      const response = await fetch(`/brands/${slug}/brand.json`)
      if (!response.ok) throw new Error(`Failed to load brand: ${slug}`)
      return await response.json()
    } catch (error) {
      console.error(`Error loading brand ${slug}:`, error)
      return null
    }
  },

  /**
   * Apply brand colors to document
   */
  async applyBrand(slug) {
    const brand = await this.getBrand(slug)
    if (!brand) return false

    // Store selection in localStorage
    localStorage.setItem(BRAND_CACHE_KEY, slug)

    // Apply CSS custom properties
    const root = document.documentElement
    Object.entries(brand.colors).forEach(([key, value]) => {
      const cssVarName = `--brand-${key}`
      root.style.setProperty(cssVarName, value)
    })

    // Update primary brand variables
    root.style.setProperty('--primary', brand.colors.primary)
    root.style.setProperty('--secondary', brand.colors.secondary)
    root.style.setProperty('--accent', brand.colors.accent)

    return true
  },

  /**
   * Get currently selected brand
   */
  getSelectedBrand() {
    return localStorage.getItem(BRAND_CACHE_KEY) || 'wcpg' // Default to WCPG
  },

  /**
   * Set selected brand and apply
   */
  async selectBrand(slug) {
    const success = await this.applyBrand(slug)
    return success
  },

  /**
   * Initialize brand on app load
   */
  async init() {
    const selectedBrand = this.getSelectedBrand()
    await this.applyBrand(selectedBrand)
  }
}

export default brandManager

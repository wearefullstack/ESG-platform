import { createContext, useContext, useState, useEffect } from 'react'
import brandManager from '../utils/brandManager'

const BrandContext = createContext()

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState(null)
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initBrand = async () => {
      // Load all brands
      const brandsData = await brandManager.getAllBrands()
      setBrands(brandsData.brands || [])

      // Initialize with selected brand
      const selectedSlug = brandManager.getSelectedBrand()
      const brandData = await brandManager.getBrand(selectedSlug)
      setBrand(brandData)

      // Apply brand styles
      await brandManager.applyBrand(selectedSlug)

      setLoading(false)
    }

    initBrand()
  }, [])

  const selectBrand = async (slug) => {
    const success = await brandManager.applyBrand(slug)
    if (success) {
      const brandData = await brandManager.getBrand(slug)
      setBrand(brandData)
      return true
    }
    return false
  }

  return (
    <BrandContext.Provider value={{ brand, brands, loading, selectBrand }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand() {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider')
  }
  return context
}

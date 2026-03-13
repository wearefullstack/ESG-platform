import { useLocation, useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import './Breadcrumb.css'

const pathToLabelMap = {
  '/': 'Home',
  '/wcpg': 'Western Cape Provincial Government',
  '/jse': 'Johannesburg Stock Exchange',
  '/coct': 'City of Cape Town',
  '/login': 'Login',
  '/register': 'Register',
  '/dashboard': 'Dashboard',
  '/report': 'Report Generation'
}

export default function Breadcrumb({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { brand } = useBrand()

  const pathname = location.pathname

  // Generate breadcrumb array from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname === '/' ? ['/'] : pathname.split('/').filter(Boolean)
    const breadcrumbs = []

    // Always add home unless already at home
    if (pathname !== '/') {
      breadcrumbs.push({ path: '/', label: 'Home' })
    }

    // Build breadcrumbs from each path segment
    if (pathname !== '/') {
      paths.forEach((path, index) => {
        const fullPath = '/' + paths.slice(0, index + 1).join('/')
        const label = pathToLabelMap[fullPath] || path.charAt(0).toUpperCase() + path.slice(1)
        breadcrumbs.push({ path: fullPath, label })
      })
    } else {
      breadcrumbs.push({ path: '/', label: 'Home' })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()
  const brandSlug = brand?.slug || 'wcpg'

  // Don't show breadcrumbs on home page (landing pages)
  if (pathname === '/' || pathname === '/wcpg' || pathname === '/jse' || pathname === '/coct') {
    return null
  }

  return (
    <nav className={`breadcrumb breadcrumb-${brandSlug}`}>
      <div className="breadcrumb-content">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <>
                <button
                  className="breadcrumb-link"
                  onClick={() => {
                    if (crumb.path === '/' && onLogout) {
                      onLogout()
                      window.location.href = '/'
                    } else {
                      navigate(crumb.path)
                    }
                  }}
                >
                  {crumb.label}
                </button>
                <span className="breadcrumb-separator">/</span>
              </>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

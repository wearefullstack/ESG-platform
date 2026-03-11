# Brand Assets & White-Labeling

## Overview

The ESG Platform supports **multi-tenant white-labeling** with dynamic theme switching based on the selected distribution partner.

## Brand Assets Structure

```
frontend/public/brands/
├── index.json           # Master brand configuration
├── wcpg/
│   ├── logo.svg        # WCPG brand logo
│   └── brand.json      # Color palette and typography
├── jse/
│   ├── logo.svg        # JSE brand logo
│   └── brand.json      # Color palette and typography
└── coct/
    ├── logo.svg        # CoCT brand logo
    └── brand.json      # Color palette and typography
```

## Brand Configurations

### Western Cape Provincial Government (WCPG)
- **Primary Color**: #001489 (Deep Blue)
- **Secondary Color**: #FFFFFF (White)
- **Accent Color**: #0066CC (Light Blue)
- **Logo**: `frontend/public/brands/wcpg/logo.svg`
- **Features**: Simple SME questionnaires, Data validation, ISSB & JSE compliance

### Johannesburg Stock Exchange (JSE)
- **Primary Color**: #A3CF61 (Green/Gold)
- **Secondary Color**: #000000 (Black)
- **Accent Color**: #A3CF61 (Green/Gold)
- **Logo**: `frontend/public/brands/jse/logo.svg`
- **Features**: Financial data integration, Advanced analytics, Multi-framework reporting

### City of Cape Town (CoCT)
- **Primary Color**: #08677B (Teal/Atoll)
- **Secondary Color**: #ECF3F9 (Link Water Light)
- **Accent Color**: #CCCC00 (Rio Grande Yellow)
- **Logo**: `frontend/public/brands/coct/logo.svg`
- **Features**: Community engagement, Environmental focus, Accessibility-first design

## How White-Labeling Works

### 1. Brand Selection
Users select a brand on the landing page using the **BrandSelector** component (top-right corner).

### 2. Dynamic Theme Application
When a brand is selected:
- Logo is loaded from `frontend/public/brands/{slug}/logo.svg`
- Color palette is loaded from `frontend/public/brands/{slug}/brand.json`
- CSS custom properties are updated dynamically
- Selection is stored in localStorage for persistence

### 3. CSS Custom Properties
The theme system uses CSS variables:
```css
--primary: /* Brand primary color */
--secondary: /* Brand secondary color */
--accent: /* Brand accent color */
--brand-primary
--brand-primary-light
--brand-primary-dark
/* ... and more brand-specific variables */
```

All components use these variables, so they automatically adapt to the selected brand.

## Architecture

### BrandManager (`frontend/src/utils/brandManager.js`)
Core utility for managing brand operations:
- `getAllBrands()` - Fetch all available brands from index.json
- `getBrand(slug)` - Load specific brand configuration
- `applyBrand(slug)` - Apply brand colors to the page
- `selectBrand(slug)` - Select a brand and persist choice

### BrandContext (`frontend/src/context/BrandContext.jsx`)
React Context provider that:
- Manages global brand state
- Provides `useBrand()` hook for components
- Initializes brand on app load
- Handles brand switching

### BrandSelector Component (`frontend/src/components/BrandSelector.jsx`)
UI component that:
- Displays current brand
- Shows dropdown with all available brands
- Allows users to switch brands
- Located in top-right corner of landing page

## Adding a New Brand

To add a new distribution partner:

1. **Create brand directory**:
   ```bash
   mkdir frontend/public/brands/mynewbrand
   ```

2. **Create logo.svg**:
   ```bash
   # Add SVG logo with brand colors
   # Dimensions: 200x60px recommended
   ```

3. **Create brand.json**:
   ```json
   {
     "name": "Brand Full Name",
     "slug": "mynewbrand",
     "colors": {
       "primary": "#XXXXXX",
       "primary_light": "#XXXXXX",
       "primary_dark": "#XXXXXX",
       "secondary": "#XXXXXX",
       "accent": "#XXXXXX",
       "dark": "#XXXXXX",
       "light": "#XXXXXX"
     },
     "typography": {
       "family": "Font Family",
       "headings_weight": "600",
       "body_weight": "400"
     },
     "description": "Brand description for landing page"
   }
   ```

4. **Update index.json**:
   Add new brand to `frontend/public/brands/index.json` brands array

5. **Rebuild and test**:
   ```bash
   docker-compose restart frontend
   ```

## Logo Asset Sources

### Current Logos
- **WCPG**: Custom SVG generated from brand guidelines
- **JSE**: Custom SVG generated from brand guidelines
- **CoCT**: Custom SVG generated from brand guidelines

### Obtaining Official Logos
To use official brand assets:

1. **CoCT**:
   - Source: Wikimedia Commons
   - URL: https://commons.wikimedia.org/wiki/File:Logo_of_Cape_Town,_South_Africa.svg
   - Format: SVG

2. **JSE**:
   - Source: Brandfetch
   - URL: https://brandfetch.com/johannesburg-stock-exchange
   - Formats: PNG, SVG

3. **WCPG**:
   - Source: Brandfetch or official website
   - URL: https://www.westerncape.gov.za
   - Contact: Communications Department

### Replacing Logos
1. Download official logo in SVG format (preferred for scalability)
2. Save to `frontend/public/brands/{slug}/logo.svg`
3. Ensure logo fits within 40px height constraint (see BrandSelector.css)
4. Test that logo displays correctly in:
   - Landing page partner cards
   - Brand selector dropdown
   - Dashboard header (if implemented)

## Styling Considerations

### Logo Display
- Height: 40px (in BrandSelector dropdown)
- Height: 40px (in partner card headers)
- Aspect ratio: Maintained (width auto)
- Filter: `brightness(1.1)` applied on colored backgrounds for visibility

### Color Contrast
All brand colors must meet WCAG AA standards:
- Text on colored backgrounds: 4.5:1 contrast ratio (minimum)
- UI elements: 3:1 contrast ratio (minimum)

### Responsive Design
Brand assets adapt to screen sizes:
- Desktop: Full-size logos and complete brand switcher
- Tablet: Slightly reduced font sizes
- Mobile: Compact brand switcher (top-right corner)

## Testing Brand Switching

1. **Launch application**:
   ```bash
   docker-compose up -d
   ```

2. **Navigate to landing page**:
   Visit `http://localhost`

3. **Test brand selector**:
   - Click brand selector in top-right
   - Select different brands
   - Verify colors change across page
   - Verify logos display correctly

4. **Verify persistence**:
   - Switch brands
   - Refresh page
   - Previously selected brand should be active

5. **Test all pages**:
   - Register and login
   - Verify theme applies to dashboard
   - Verify theme applies to report generation page

## Performance Optimization

### Lazy Loading
Brand configurations are loaded on-demand:
- `index.json` loaded once on app initialization
- Individual brand configs loaded when selected
- Logo SVGs loaded via img src (native browser caching)

### Caching
- Brand selection stored in localStorage
- Brand configs cached in memory
- CSS custom properties updated efficiently

### File Size
- Logo SVGs: ~2-5 KB each
- Brand JSON: ~0.5 KB each
- Total assets: < 20 KB

## Troubleshooting

### Brand colors not applying
- Clear browser cache: Ctrl+Shift+Del (Chrome)
- Check localStorage: Open DevTools → Application → Local Storage
- Verify brand.json files exist in frontend/public/brands/

### Logo not displaying
- Verify file exists at `frontend/public/brands/{slug}/logo.svg`
- Check browser console for 404 errors
- Ensure SVG is valid XML (use SVG validator)
- Check dimensions fit in 40px height constraint

### BrandSelector dropdown not opening
- Check that BrandContext provider wraps Router in App.jsx
- Verify useBrand() hook is being called
- Check browser console for React errors

## Future Enhancements

1. **Database-Driven Brands**
   - Store brand configs in PostgreSQL
   - Admin panel to manage brands
   - Dynamic brand creation

2. **Advanced Customization**
   - Custom fonts upload
   - Button style variations
   - Custom footer content per brand

3. **Brand Analytics**
   - Track which brands are used most
   - Monitor user preference for brands
   - A/B test brand variations

4. **Multi-Language Support**
   - Brand-specific language packs
   - RTL support for Arabic/Hebrew brands
   - Regional date/currency formats

## Support

For questions about white-labeling:
- Check this documentation first
- Review brand.json structure for examples
- Inspect CSS variables: `getComputedStyle(document.documentElement).getPropertyValue('--primary')`

---

**Last Updated**: March 2026
**Status**: Production Ready ✅

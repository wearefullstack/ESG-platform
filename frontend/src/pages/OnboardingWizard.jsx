import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useBrand } from '../context/BrandContext'
import '../styles/OnboardingWizard.css'

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const { brand } = useBrand()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)

  const [formData, setFormData] = useState({
    // Step 1: Business Info
    organizationName: '',
    registrationNumber: '',
    industry: '',
    employeeCount: '',

    // Step 2: Contact Info
    contactName: '',
    email: '',
    phone: '',

    // Step 3: ESG Data
    annualRevenue: '',
    ghgScope1: '',
    energyMwh: '',
    waterM3: '',
    wasteMetricTonnes: '',

    // Step 4: Additional
    fiscalYearStart: '2024-04',
    documentUpload: null,
    agreeTerms: false
  })

  const industries = [
    'Manufacturing',
    'Retail & Commerce',
    'Energy & Utilities',
    'Agriculture',
    'Logistics & Transportation',
    'Hospitality & Tourism',
    'Technology & IT',
    'Healthcare & Pharma',
    'Finance & Insurance',
    'Construction & Real Estate',
    'Other'
  ]

  const employeeRanges = [
    '1-10 employees',
    '11-50 employees',
    '51-250 employees'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      if (!validTypes.includes(file.type)) {
        setError('Please upload a PDF, Excel, or CSV file')
        return
      }
      setUploadedFile(file)
      setFormData(prev => ({ ...prev, documentUpload: file.name }))
      setError('')
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.organizationName) return 'Organization name is required'
        if (!formData.registrationNumber) return 'Registration number is required'
        if (!formData.industry) return 'Industry is required'
        if (!formData.employeeCount) return 'Employee count is required'
        return null

      case 2:
        if (!formData.contactName) return 'Contact name is required'
        if (!formData.email) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email address'
        if (!formData.phone) return 'Phone number is required'
        return null

      case 3:
        if (!formData.annualRevenue) return 'Annual revenue is required'
        if (!formData.ghgScope1) return 'GHG Scope 1 is required'
        if (!formData.energyMwh) return 'Energy consumption is required'
        if (!formData.waterM3) return 'Water usage is required'
        if (!formData.wasteMetricTonnes) return 'Waste generation is required'
        return null

      case 4:
        if (!formData.agreeTerms) return 'You must agree to the terms'
        return null

      default:
        return null
    }
  }

  const handleNext = () => {
    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 4))
    setError('')
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async () => {
    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('access_token')

      // Create FormData for file upload
      const submitData = new FormData()
      Object.keys(formData).forEach(key => {
        if (key !== 'documentUpload') {
          submitData.append(key, formData[key])
        }
      })

      // Add file if present
      if (uploadedFile) {
        submitData.append('documentUpload', uploadedFile)
      }

      // Build headers - only include auth if token exists
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await axios.post('/api/organizations', submitData, {
        headers
      })

      if (response.data.success) {
        // Show success message and redirect to login
        alert(`Organization "${response.data.data.name}" registered successfully! Please log in with your credentials.`)
        navigate('/login')
      } else {
        setError(response.data.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="onboarding-wizard">
      {/* Top Navigation */}
      <nav className="wizard-nav">
        <button className="nav-brand-link" onClick={() => navigate('/')}>
          ESG Platform
        </button>
      </nav>

      {/* Header */}
      <div className="wizard-header">
        <div className="header-content">
          {brand && (
            <img
              src={`/brands/${brand.slug}/logo.png`}
              alt={brand.name}
              className="wizard-logo"
            />
          )}
          <h1>Welcome to ESG Reporting</h1>
          <p>Complete your organization profile to get started</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
        <p className="progress-text">Step {currentStep} of 4</p>
      </div>

      {/* Wizard Container */}
      <div className="wizard-container">
        <div className="wizard-sidebar">
          {/* Step Indicators */}
          <div className="step-indicators">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`step-indicator ${currentStep === step ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <div className="step-number">{step < currentStep ? '✓' : step}</div>
                <div className="step-label">
                  {step === 1 && 'Business Info'}
                  {step === 2 && 'Contact Details'}
                  {step === 3 && 'ESG Data'}
                  {step === 4 && 'Review & Submit'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-content">
          {error && <div className="error-message">{error}</div>}

          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="wizard-step">
              <h2>Business Information</h2>
              <p className="step-description">Tell us about your organization</p>

              <div className="form-group">
                <label>Organization Name *</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="e.g., Stellenbosch Winery Collective"
                />
              </div>

              <div className="form-group">
                <label>Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., REG-001"
                />
              </div>

              <div className="form-group">
                <label>Industry Sector *</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange}>
                  <option value="">-- Select Industry --</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Number of Employees *</label>
                <select name="employeeCount" value={formData.employeeCount} onChange={handleInputChange}>
                  <option value="">-- Select Range --</option>
                  {employeeRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="wizard-step">
              <h2>Contact Information</h2>
              <p className="step-description">How can we reach you?</p>

              <div className="form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@company.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 21 123 4567"
                />
              </div>

              <div className="info-box">
                <p>📧 We'll use this email to send you updates and reports</p>
              </div>
            </div>
          )}

          {/* Step 3: ESG Data */}
          {currentStep === 3 && (
            <div className="wizard-step">
              <h2>ESG Baseline Data</h2>
              <p className="step-description">Provide your current ESG metrics (estimated values are fine)</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Annual Revenue (R) *</label>
                  <input
                    type="number"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    placeholder="e.g., 5000000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>GHG Scope 1 (tCO2e) *</label>
                  <input
                    type="number"
                    name="ghgScope1"
                    value={formData.ghgScope1}
                    onChange={handleInputChange}
                    placeholder="e.g., 85.4"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Energy Consumption (MWh) *</label>
                  <input
                    type="number"
                    name="energyMwh"
                    value={formData.energyMwh}
                    onChange={handleInputChange}
                    placeholder="e.g., 285.5"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Water Usage (m³) *</label>
                  <input
                    type="number"
                    name="waterM3"
                    value={formData.waterM3}
                    onChange={handleInputChange}
                    placeholder="e.g., 32500"
                  />
                </div>
                <div className="form-group">
                  <label>Waste Generated (Metric Tonnes) *</label>
                  <input
                    type="number"
                    name="wasteMetricTonnes"
                    value={formData.wasteMetricTonnes}
                    onChange={handleInputChange}
                    placeholder="e.g., 42.1"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Fiscal Year Start Month *</label>
                <input
                  type="month"
                  name="fiscalYearStart"
                  value={formData.fiscalYearStart}
                  onChange={handleInputChange}
                />
              </div>

              <div className="info-box">
                <p>💡 Don't have exact numbers? Estimates are fine for now. You can update them later.</p>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="wizard-step">
              <h2>Review & Submit</h2>
              <p className="step-description">Confirm your information before submitting</p>

              <div className="review-section">
                <div className="review-group">
                  <h3>Business Information</h3>
                  <p><strong>Organization:</strong> {formData.organizationName}</p>
                  <p><strong>Registration #:</strong> {formData.registrationNumber}</p>
                  <p><strong>Industry:</strong> {formData.industry}</p>
                  <p><strong>Employees:</strong> {formData.employeeCount}</p>
                </div>

                <div className="review-group">
                  <h3>Contact Information</h3>
                  <p><strong>Name:</strong> {formData.contactName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>

                <div className="review-group">
                  <h3>ESG Baseline Data</h3>
                  <p><strong>Revenue:</strong> R {Number(formData.annualRevenue).toLocaleString()}</p>
                  <p><strong>GHG Scope 1:</strong> {formData.ghgScope1} tCO2e</p>
                  <p><strong>Energy:</strong> {formData.energyMwh} MWh</p>
                  <p><strong>Water:</strong> {formData.waterM3} m³</p>
                  <p><strong>Waste:</strong> {formData.wasteMetricTonnes} MT</p>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                  />
                  I agree to the Terms of Service and Privacy Policy *
                </label>
              </div>

              <div className="info-box success">
                <p>✅ You're all set! Click "Complete Registration" to get started.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="wizard-buttons">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>

            {currentStep < 4 ? (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={loading}
              >
                Next →
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

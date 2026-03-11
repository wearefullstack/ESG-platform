import { useState } from 'react'
import axios from 'axios'
import { useBrand } from '../context/BrandContext'
import '../styles/ReportGenerationPage.css'

export default function ReportGenerationPage() {
  const { brand } = useBrand()
  const [framework, setFramework] = useState('ISSB')
  const [period, setPeriod] = useState('2024-03')
  const [format, setFormat] = useState('pdf')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const frameworks = [
    { id: 'ISSB', name: 'ISSB (IFRS S1/S2)', description: 'International investor-focused disclosure' },
    { id: 'JSE', name: 'JSE Guidance', description: 'Johannesburg Stock Exchange specific' },
    { id: 'GRI', name: 'GRI Standards', description: 'Global Reporting Initiative framework' }
  ]

  const formats = [
    { id: 'pdf', name: 'PDF', icon: '📄' },
    { id: 'xlsx', name: 'Excel', icon: '📊' },
    { id: 'json', name: 'JSON', icon: '💾' }
  ]

  const handleGenerateReport = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('access_token')

      const response = await axios.post(`/api/reporting/generate/${framework}`, {
        period,
        format
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: format === 'pdf' || format === 'xlsx' ? 'blob' : 'json'
      })

      if (response.status === 200) {
        // Handle download for file formats
        if (format === 'pdf' || format === 'xlsx') {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `ESG-Report-${framework}-${period}.${format === 'xlsx' ? 'xlsx' : 'pdf'}`)
          document.body.appendChild(link)
          link.click()
          link.parentChild.removeChild(link)
          setSuccess(`${framework} report downloaded successfully!`)
        } else {
          // JSON response
          setSuccess('Report generated successfully!')
          console.log(response.data)
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="report-generation-page">
      <header className="report-header">
        {brand && (
          <img
            src={`/brands/${brand.slug}/logo.svg`}
            alt={brand.name}
            className="report-logo"
          />
        )}
        <h1>Generate ESG Report</h1>
        <p>Export your organization's ESG data in standards-compliant formats</p>
      </header>

      <div className="report-container">
        <div className="report-wizard">
          {/* Framework Selection */}
          <section className="report-section">
            <h2>1. Select Reporting Framework</h2>
            <p className="section-description">Choose the sustainability standard that best fits your needs</p>

            <div className="frameworks-grid">
              {frameworks.map(f => (
                <div
                  key={f.id}
                  className={`framework-card ${framework === f.id ? 'selected' : ''}`}
                  onClick={() => setFramework(f.id)}
                >
                  <input
                    type="radio"
                    name="framework"
                    value={f.id}
                    checked={framework === f.id}
                    onChange={(e) => setFramework(e.target.value)}
                  />
                  <div className="card-content">
                    <h3>{f.name}</h3>
                    <p>{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {framework === 'ISSB' && (
              <div className="info-box">
                <strong>ISSB (IFRS S1/S2):</strong> Focused on investor-relevant sustainability metrics. Includes climate and general sustainability standards aligned with financial reporting.
              </div>
            )}
            {framework === 'JSE' && (
              <div className="info-box">
                <strong>JSE:</strong> South African Stock Exchange guidance for sustainability disclosures. Required for listed companies on JSE.
              </div>
            )}
            {framework === 'GRI' && (
              <div className="info-box">
                <strong>GRI:</strong> Global Reporting Initiative standards for comprehensive sustainability reporting. Widely recognized internationally.
              </div>
            )}
          </section>

          {/* Period Selection */}
          <section className="report-section">
            <h2>2. Select Reporting Period</h2>
            <p className="section-description">Choose the fiscal period to include in your report</p>

            <div className="period-selector">
              <label>Reporting Period (Month-Year)</label>
              <input
                type="month"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="period-input"
              />
              <p className="helper-text">Select the end month of your reporting period</p>
            </div>
          </section>

          {/* Format Selection */}
          <section className="report-section">
            <h2>3. Select Export Format</h2>
            <p className="section-description">Choose how you want to receive your report</p>

            <div className="formats-grid">
              {formats.map(fmt => (
                <div
                  key={fmt.id}
                  className={`format-card ${format === fmt.id ? 'selected' : ''}`}
                  onClick={() => setFormat(fmt.id)}
                >
                  <input
                    type="radio"
                    name="format"
                    value={fmt.id}
                    checked={format === fmt.id}
                    onChange={(e) => setFormat(e.target.value)}
                  />
                  <div className="format-icon">{fmt.icon}</div>
                  <div className="format-name">{fmt.name}</div>
                </div>
              ))}
            </div>

            {format === 'pdf' && (
              <div className="info-box">
                <strong>PDF:</strong> Professional report with charts, summaries, and compliance statements. Best for sharing with stakeholders.
              </div>
            )}
            {format === 'xlsx' && (
              <div className="info-box">
                <strong>Excel:</strong> Detailed spreadsheet with all metrics and calculations. Best for data analysis and integration.
              </div>
            )}
            {format === 'json' && (
              <div className="info-box">
                <strong>JSON:</strong> Machine-readable format. Best for system integration and automated processing.
              </div>
            )}
          </section>

          {/* Messages */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">✅ {success}</div>}

          {/* Action Button */}
          <section className="report-section button-section">
            <button
              className="generate-button"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? 'Generating Report...' : `Generate ${framework} Report (${format.toUpperCase()})`}
            </button>
          </section>

          {/* Report Preview */}
          <section className="report-section">
            <h2>📋 Report Contents</h2>
            <div className="report-preview">
              <div className="preview-section">
                <h3>Executive Summary</h3>
                <ul>
                  <li>Organization overview and ESG strategy</li>
                  <li>Key performance highlights</li>
                  <li>Year-over-year progress</li>
                </ul>
              </div>

              <div className="preview-section">
                <h3>ESG Metrics & KPIs</h3>
                <ul>
                  <li>Environmental: GHG, Energy, Water, Waste</li>
                  <li>Social: Diversity, Health & Safety, Training</li>
                  <li>Governance: Compliance, Audit, Board Composition</li>
                </ul>
              </div>

              <div className="preview-section">
                <h3>Analysis & Trends</h3>
                <ul>
                  <li>12-month performance trends</li>
                  <li>Intensity calculations</li>
                  <li>Sector benchmarking</li>
                </ul>
              </div>

              <div className="preview-section">
                <h3>Statements & Compliance</h3>
                <ul>
                  <li>Compliance declarations</li>
                  <li>Standards alignment (ISSB/JSE/GRI)</li>
                  <li>Assurance statement</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

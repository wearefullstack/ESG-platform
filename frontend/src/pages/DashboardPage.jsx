import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import '../styles/DashboardPage.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardPage({ user, onLogout }) {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get('/api/reporting/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {
          setDashboard(response.data.data)
        }
      } catch (err) {
        setError('Failed to load dashboard data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>
  }

  const chartData = {
    labels: dashboard?.trend_data?.periods || [],
    datasets: [
      {
        label: 'GHG Emissions (tCO2e)',
        data: dashboard?.trend_data?.ghg_emissions || [],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        tension: 0.3
      },
      {
        label: 'Energy (MWh)',
        data: dashboard?.trend_data?.energy_mwh || [],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.3
      }
    ]
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>ESG Dashboard</h1>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="kpis-section">
          <h2>Key Performance Indicators</h2>
          <div className="kpis-grid">
            {dashboard?.kpis?.map((kpi, idx) => (
              <div key={idx} className="kpi-card">
                <div className="kpi-name">{kpi.name}</div>
                <div className="kpi-value">{kpi.value}</div>
                <div className={`kpi-trend ${kpi.trend.includes('-') ? 'positive' : 'negative'}`}>
                  {kpi.trend}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-section">
          <h2>12-Month Trend</h2>
          <div className="chart-container">
            <Line data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'ESG Metrics Trend'
                }
              }
            }} />
          </div>
        </section>

        <section className="actions-section">
          <h2>Actions</h2>
          <div className="actions-grid">
            <button className="action-button primary">Generate Report</button>
            <button className="action-button">Upload Data</button>
            <button className="action-button">View History</button>
          </div>
        </section>
      </div>
    </div>
  )
}

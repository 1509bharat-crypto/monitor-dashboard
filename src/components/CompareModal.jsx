import { useState, useEffect } from 'react'
import './CompareModal.css'

const CompareModal = ({ isOpen, onClose, onConfirm, currentMarket, initialConfig }) => {
  const allCountries = [
    { code: 'NL', name: 'Netherlands' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'FR', name: 'France' }
  ]

  const allMetrics = [
    { id: 'qualifiedCompletes', label: 'Qualified Completes' },
    { id: 'cumulativeProgress', label: 'Cumulative Progress' },
    { id: 'newSamples', label: 'New Samples' },
    { id: 'sampleProgress', label: 'Sample Progress' },
    { id: 'irLoi', label: 'IR & LOI' },
    { id: 'dataQuality', label: 'Data Quality' }
  ]

  // Get default countries based on current market
  const getDefaultCountries = () => {
    const currentCode = allCountries.find(c => c.name === currentMarket)?.code || 'NL'
    const others = allCountries.filter(c => c.code !== currentCode).slice(0, 2).map(c => c.code)
    return [currentCode, ...others]
  }

  const [selectedCountries, setSelectedCountries] = useState(getDefaultCountries())
  const [selectedMetrics, setSelectedMetrics] = useState(['qualifiedCompletes', 'cumulativeProgress', 'sampleProgress'])
  const [dateRange, setDateRange] = useState('ALL')

  // Update state when modal opens with existing config (edit mode)
  useEffect(() => {
    if (isOpen && initialConfig) {
      setSelectedCountries(initialConfig.countries.map(c => c.code))
      setSelectedMetrics(initialConfig.metrics)
      setDateRange(initialConfig.dateRange)
    } else if (isOpen && !initialConfig) {
      // Reset to defaults when opening fresh
      setSelectedCountries(getDefaultCountries())
      setSelectedMetrics(['qualifiedCompletes', 'cumulativeProgress', 'sampleProgress'])
      setDateRange('ALL')
    }
  }, [isOpen, initialConfig])

  const toggleCountry = (code) => {
    if (selectedCountries.includes(code)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter(c => c !== code))
      }
    } else if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, code])
    }
  }

  const toggleMetric = (id) => {
    if (selectedMetrics.includes(id)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== id))
      }
    } else {
      setSelectedMetrics([...selectedMetrics, id])
    }
  }

  const handleConfirm = () => {
    onConfirm({
      countries: selectedCountries.map(code => allCountries.find(c => c.code === code)),
      metrics: selectedMetrics,
      dateRange
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialConfig ? 'Edit Comparison' : 'Compare Fieldworks'}</h2>
          <button className="modal-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal-body">
          {/* Country Selection */}
          <div className="modal-section">
            <h3>Select Countries <span className="hint">(max 3)</span></h3>
            <div className="country-grid">
              {allCountries.map(country => (
                <button
                  key={country.code}
                  className={`country-chip ${selectedCountries.includes(country.code) ? 'selected' : ''} ${selectedCountries.length >= 3 && !selectedCountries.includes(country.code) ? 'disabled' : ''}`}
                  onClick={() => toggleCountry(country.code)}
                  disabled={selectedCountries.length >= 3 && !selectedCountries.includes(country.code)}
                >
                  <span className="country-code">{country.code}</span>
                  <span className="country-name">{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="modal-section">
            <h3>Select Metrics</h3>
            <div className="metrics-grid">
              {allMetrics.map(metric => (
                <label key={metric.id} className="metric-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={() => toggleMetric(metric.id)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="metric-label">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="modal-section">
            <h3>Date Range</h3>
            <div className="date-range-options">
              {['ALL', 'Today', 'Last 7 days', 'Last 30 days'].map(option => (
                <button
                  key={option}
                  className={`date-option ${dateRange === option ? 'selected' : ''}`}
                  onClick={() => setDateRange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleConfirm}>
            <span className="material-symbols-outlined">{initialConfig ? 'check' : 'compare_arrows'}</span>
            {initialConfig ? 'Update Comparison' : `Compare ${selectedCountries.length} Countries`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareModal

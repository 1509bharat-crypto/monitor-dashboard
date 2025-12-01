import { useState, useEffect, useRef, useCallback } from 'react'
import { useData } from '../contexts/DataContext'
import './DataQualityModal.css'

const DataQualityModal = ({ isOpen, onClose, onApply, initialThreshold = 6 }) => {
  const { baseData } = useData()
  const [threshold, setThreshold] = useState(initialThreshold)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [expandedSections, setExpandedSections] = useState({ overall: false })
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Calculate data dynamically based on current threshold value
  const calculateDataForThreshold = (thresholdValue) => {
    const { responsesByScore, countryBreakdown } = baseData

    let qualifiedCompletes = 0

    Object.entries(responsesByScore).forEach(([score, count]) => {
      if (parseInt(score) >= thresholdValue) {
        qualifiedCompletes += count
      }
    })

    // Calculate country breakdown based on qualified completes
    const ukCount = Math.round(qualifiedCompletes * countryBreakdown['United Kingdom'])
    const usCount = Math.round(qualifiedCompletes * countryBreakdown['United States'])
    const germanyCount = qualifiedCompletes - ukCount - usCount

    return {
      overall: qualifiedCompletes,
      breakdown: {
        'United Kingdom': ukCount,
        'United States': usCount,
        'Germany': germanyCount
      }
    }
  }

  // Calculate initial and current values
  const initialValues = calculateDataForThreshold(initialThreshold)
  const currentValues = calculateDataForThreshold(threshold)

  useEffect(() => {
    if (isOpen) {
      setThreshold(initialThreshold)
      setShowConfirmation(false)
      setExpandedSections({ overall: false })
    }
  }, [isOpen, initialThreshold])

  const handleClose = useCallback(() => {
    setShowConfirmation(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  useEffect(() => {
    if (!isOpen) return

    const modalNode = modalRef.current
    if (!modalNode) return

    const previouslyFocused = document.activeElement
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusFirstElement = () => {
      const focusableElements = Array.from(
        modalNode.querySelectorAll(focusableSelectors)
      ).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
      )

      if (focusableElements.length) {
        (closeButtonRef.current || focusableElements[0]).focus()
      } else {
        modalNode.focus()
      }
    }

    const handleTabKey = (event) => {
      if (event.key !== 'Tab') return

      const focusableElements = Array.from(
        modalNode.querySelectorAll(focusableSelectors)
      ).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
      )

      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (
          document.activeElement === firstElement ||
          document.activeElement === modalNode
        ) {
          lastElement.focus()
          event.preventDefault()
        }
      } else if (document.activeElement === lastElement) {
        firstElement.focus()
        event.preventDefault()
      }
    }

    focusFirstElement()
    modalNode.addEventListener('keydown', handleTabKey)

    return () => {
      modalNode.removeEventListener('keydown', handleTabKey)
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus()
      }
    }
  }, [isOpen, showConfirmation])

  if (!isOpen) return null

  const handleConfirm = () => {
    if (!showConfirmation) {
      setShowConfirmation(true)
    }
  }

  const handleApply = () => {
    onApply(threshold)
    handleClose()
  }

  const handleBack = () => {
    setShowConfirmation(false)
  }

  const handleSliderChange = (e) => {
    setThreshold(parseInt(e.target.value))
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Build dataset updates using real calculated data
  const datasetUpdates = {
    overall: {
      count: currentValues.overall,
      change: currentValues.overall - initialValues.overall
    },
    breakdown: [
      {
        label: 'United Kingdom',
        count: currentValues.breakdown['United Kingdom'],
        change: currentValues.breakdown['United Kingdom'] - initialValues.breakdown['United Kingdom']
      },
      {
        label: 'United States',
        count: currentValues.breakdown['United States'],
        change: currentValues.breakdown['United States'] - initialValues.breakdown['United States']
      },
      {
        label: 'Germany',
        count: currentValues.breakdown['Germany'],
        change: currentValues.breakdown['Germany'] - initialValues.breakdown['Germany']
      }
    ]
  }

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        if (!showConfirmation) {
          handleClose()
        }
      }}
    >
      <div
        className="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="data-quality-modal-title"
        aria-describedby="data-quality-modal-description"
        tabIndex="-1"
      >
        {!showConfirmation ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title" id="data-quality-modal-title">Data quality settings</h2>
              <button
                className="modal-close"
                onClick={handleClose}
                aria-label="Close modal"
                ref={closeButtonRef}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description" id="data-quality-modal-description">
                Move the slider to adjust the threshold for data quality
              </p>

              <div className="slider-container">
                <div className="slider-value-display">
                  <span className="current-threshold">Quality score threshold: {threshold}</span>
                </div>

                <div className="info-box">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Responses below this threshold will be filtered from your dataset</span>
                </div>

                <div className="slider-wrapper">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={threshold}
                    onChange={handleSliderChange}
                    className="quality-slider"
                    aria-label="Quality threshold slider"
                    aria-valuemin="1"
                    aria-valuemax="12"
                    aria-valuenow={threshold}
                    aria-valuetext={`Quality score threshold ${threshold}`}
                  />
                  <div className="slider-track">
                    <div
                      className="slider-track-low"
                      style={{ width: `${((threshold - 1) / 11) * 100}%` }}
                    ></div>
                    <div
                      className="slider-track-high"
                      style={{ width: `${((12 - threshold) / 11) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="slider-labels">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <span key={num} className="slider-label">{num}</span>
                  ))}
                </div>
              </div>
              <div className="dataset-updates">
                <h3 className="updates-title">Updates in the data set</h3>

                <div className="update-section">
                  <button
                    className="update-header"
                    onClick={() => toggleSection('overall')}
                    aria-expanded={expandedSections.overall}
                    aria-controls="overall-breakdown"
                    type="button"
                  >
                    <div className="update-main-row">
                      <span className="expand-icon">{expandedSections.overall ? '▾' : '▸'}</span>
                      <span className="update-label">Overall qualified</span>
                    </div>
                    <div className="update-values">
                      <span className="update-count">{datasetUpdates.overall.count}</span>
                      {datasetUpdates.overall.change !== 0 && (
                        <span className={`update-change-badge ${datasetUpdates.overall.change > 0 ? 'positive' : 'negative'}`}>
                          {datasetUpdates.overall.change > 0 ? '+' : ''}{datasetUpdates.overall.change}
                        </span>
                      )}
                    </div>
                  </button>

                  {expandedSections.overall && (
                    <div className="update-breakdown" id="overall-breakdown">
                      {datasetUpdates.breakdown.map((item, index) => (
                        <div key={index} className="breakdown-item">
                          <span className="breakdown-label">{item.label}</span>
                          <div className="breakdown-values">
                            <span className="breakdown-count">{item.count}</span>
                            {item.change !== 0 && (
                              <span className={`breakdown-change-badge ${item.change > 0 ? 'positive' : 'negative'}`}>
                                {item.change > 0 ? '+' : ''}{item.change}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn-modal btn-primary"
                onClick={handleConfirm}
                disabled={threshold === initialThreshold}
                aria-disabled={threshold === initialThreshold}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2 className="modal-title" id="data-quality-modal-title">Data quality settings</h2>
              <button
                className="modal-close"
                onClick={handleClose}
                aria-label="Close modal"
                ref={closeButtonRef}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description" id="data-quality-modal-description">
                Applying these settings will filter your dataset. Data below the threshold will be excluded from analysis.
              </p>

              <div className="slider-container">
                <div className="slider-value-display">
                  <span className="current-threshold">Quality score threshold: {threshold}</span>
                </div>

                <div className="info-box">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Responses below this threshold will be filtered from your dataset</span>
                </div>

                <div className="slider-wrapper slider-preview">
                  <div className="slider-track">
                    <div
                      className="slider-track-low"
                      style={{ width: `${((threshold - 1) / 11) * 100}%` }}
                    ></div>
                    <div
                      className="slider-track-high"
                      style={{ width: `${((12 - threshold) / 11) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="slider-labels">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <span key={num} className="slider-label">{num}</span>
                  ))}
                </div>
              </div>

              <div className="dataset-updates">
                <h3 className="updates-title">Updates in the data set</h3>

                <div className="update-section">
                  <button
                    className="update-header"
                    onClick={() => toggleSection('overall')}
                    aria-expanded={expandedSections.overall}
                    aria-controls="overall-breakdown"
                    type="button"
                  >
                    <div className="update-main-row">
                      <span className="expand-icon">{expandedSections.overall ? '▾' : '▸'}</span>
                      <span className="update-label">Overall qualified</span>
                    </div>
                    <div className="update-values">
                      <span className="update-count">{datasetUpdates.overall.count}</span>
                      {datasetUpdates.overall.change !== 0 && (
                        <span className={`update-change-badge ${datasetUpdates.overall.change > 0 ? 'positive' : 'negative'}`}>
                          {datasetUpdates.overall.change > 0 ? '+' : ''}{datasetUpdates.overall.change}
                        </span>
                      )}
                    </div>
                  </button>

                  {expandedSections.overall && (
                    <div className="update-breakdown" id="overall-breakdown">
                      {datasetUpdates.breakdown.map((item, index) => (
                        <div key={index} className="breakdown-item">
                          <span className="breakdown-label">{item.label}</span>
                          <div className="breakdown-values">
                            <span className="breakdown-count">{item.count}</span>
                            {item.change !== 0 && (
                              <span className={`breakdown-change-badge ${item.change > 0 ? 'positive' : 'negative'}`}>
                                {item.change > 0 ? '+' : ''}{item.change}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn-modal btn-primary" onClick={handleApply}>
                Apply
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DataQualityModal

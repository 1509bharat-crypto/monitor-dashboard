import { useState, useMemo } from 'react'
import { useData } from '../contexts/DataContext'
import './DataQualityCharts.css'
import settingsIcon from '../../assets/Default.svg'
import DataQualityModal from './DataQualityModal'
import HorizontalBreakdown from './HorizontalBreakdown'

const DataQualityCharts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { qualityThreshold, setQualityThreshold, calculatedData } = useData()

  const totalSampleData = useMemo(() => ({
    title: 'Data Quality Overview',
    subtitle: 'Completes',
    segments: [
      {
        label: 'Qualified',
        value: calculatedData.qualifiedCompletes,
        color: '#66BB6A',
        percentage: calculatedData.qualifiedPercentage,
        description: 'High quality responses meeting all criteria'
      },
      {
        label: 'Insufficient',
        value: calculatedData.poorQuality,
        color: '#EF5350',
        percentage: calculatedData.poorPercentage,
        description: 'Responses flagged for quality issues'
      }
    ]
  }), [calculatedData])

  const badDataBreakdown = useMemo(() => {
    const total = calculatedData.poorQuality

    const segments = [
      {
        label: 'AI generated',
        value: calculatedData.aiGeneratedCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.aiGeneratedCount / total) * 100) : 0,
        description: 'Detected AI-generated responses'
      },
      {
        label: 'Duplicate answers',
        value: calculatedData.duplicateCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.duplicateCount / total) * 100) : 0,
        description: 'Duplicate participant detected'
      },
      {
        label: 'Straightlining',
        value: calculatedData.straightliningCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.straightliningCount / total) * 100) : 0,
        description: 'Same answer selected repeatedly'
      },
      {
        label: 'Low relevance',
        value: Math.round(calculatedData.poorQuality * 0.15),
        color: '#3a3a3a',
        percentage: 15,
        description: 'Responses not relevant to questions'
      },
      {
        label: 'Speeder',
        value: calculatedData.speederCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.speederCount / total) * 100) : 0,
        description: 'Completed too quickly'
      },
      {
        label: 'Low clarity',
        value: Math.round(calculatedData.poorQuality * 0.10),
        color: '#3a3a3a',
        percentage: 10,
        description: 'Unclear or confusing responses'
      }
    ]

    // Sort segments by percentage from high to low
    const sortedSegments = segments.sort((a, b) => b.percentage - a.percentage)

    return {
      title: 'Quality Issues Breakdown',
      subtitle: 'INSUFFICIENT',
      segments: sortedSegments
    }
  }, [calculatedData])

  const renderDonutChart = (data) => {
    const total = data.segments.reduce((sum, seg) => sum + seg.value, 0)
    const greenSegment = data.segments[0]
    const redSegment = data.segments[1]

    // Calculate positions for percentage labels - place them in the middle of each arc
    const greenAngle = (greenSegment.percentage / 100) * 360
    const greenMidAngle = (greenAngle / 2) - 90 // Start at top, go clockwise
    const redMidAngle = greenAngle + ((360 - greenAngle) / 2) - 90

    // Position labels on the ring (radius 70 is the circle, we want labels in middle of stroke)
    const labelRadius = 70 // Same as circle radius to place in center of stroke
    const greenLabelX = 100 + labelRadius * Math.cos((greenMidAngle * Math.PI) / 180)
    const greenLabelY = 100 + labelRadius * Math.sin((greenMidAngle * Math.PI) / 180)
    const redLabelX = 100 + labelRadius * Math.cos((redMidAngle * Math.PI) / 180)
    const redLabelY = 100 + labelRadius * Math.sin((redMidAngle * Math.PI) / 180)

    return (
      <div className="quality-chart">
        <div className="chart-header">
          <div>
            <h3 className="chart-title">{data.title}</h3>
            <p className="chart-subtitle">{data.subtitle}</p>
          </div>
        </div>

        <div className="donut-chart-container">
          <svg width="200" height="200" viewBox="0 0 200 200" className="donut-chart">
            {/* Green segment */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#66BB6A"
              strokeWidth="60"
              strokeDasharray={`${(greenSegment.percentage / 100) * 439.82} 439.82`}
              transform="rotate(-90 100 100)"
            />
            {/* Red segment */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#EF5350"
              strokeWidth="60"
              strokeDasharray={`${(redSegment.percentage / 100) * 439.82} 439.82`}
              strokeDashoffset={`-${(greenSegment.percentage / 100) * 439.82}`}
              transform="rotate(-90 100 100)"
            />
            {/* Center value */}
            <text x="100" y="105" textAnchor="middle" className="donut-center-value">{total}</text>
            {/* Percentage labels with background */}
            <text x={greenLabelX} y={greenLabelY} textAnchor="middle" className="donut-percentage-label-white">{greenSegment.percentage}%</text>
            <text x={redLabelX} y={redLabelY} textAnchor="middle" className="donut-percentage-label-white">{redSegment.percentage}%</text>
          </svg>
        </div>

        <div className="chart-legend">
          {data.segments.map((segment, index) => (
            <div key={index} className="chart-legend-item">
              <div className="legend-indicator">
                <span
                  className="chart-legend-dot"
                  style={{ backgroundColor: segment.color }}
                ></span>
              </div>
              <div className="legend-content">
                <span className="chart-legend-label">{segment.label} ({segment.value})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleApplySettings = (newThreshold) => {
    setQualityThreshold(newThreshold)
  }


  return (
    <div className="data-quality-wrapper">
      <div className="data-quality-container">
        <div className="data-quality-header-row">
          <h2 className="data-quality-title">Data quality</h2>
          <div className="data-quality-status">
            <span className="status-label">In Queue:</span>
            <span className="status-value">48</span>
            <span className="status-label status-label-ml">Last Updated:</span>
            <span className="status-value">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
          </div>
        </div>
        <div className="data-quality-info-row">
          <span className="info-text">Filtering responses below quality score {qualityThreshold}</span>
          <button className="btn-data-quality-icon-inline" onClick={handleOpenModal}>
            <img src={settingsIcon} alt="Settings" />
          </button>
        </div>

        {/* HIDDEN - Uncomment to show data quality summary */}
        {/* <div className="data-quality-summary">
          <div className="summary-content">
            <p className="summary-text">
              Most of your data looks solid — {calculatedData.qualifiedPercentage}% of responses passed the quality check. A smaller group of {calculatedData.poorQuality} didn't make the cut, mostly flagged for AI generation and straightlining.
            </p>
          </div>
        </div> */}

        <div className="data-quality-section">
          {renderDonutChart(totalSampleData)}
          <HorizontalBreakdown
            title={badDataBreakdown.title}
            subtitle={badDataBreakdown.subtitle}
            segments={badDataBreakdown.segments}
          />
        </div>
      </div>

      <DataQualityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplySettings}
        initialThreshold={qualityThreshold}
      />
    </div>
  )
}

export default DataQualityCharts

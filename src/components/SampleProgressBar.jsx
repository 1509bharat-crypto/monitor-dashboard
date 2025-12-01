import { useData } from '../contexts/DataContext'
import './SampleProgressBar.css'

const SampleProgressBar = () => {
  const { calculatedData, baseData } = useData()

  const completesCount = baseData.totalResponses ?? 0
  const inProgressCount = calculatedData.inProgress ?? 0
  const dropoutsCount = calculatedData.dropouts ?? 0
  const terminatesCount = calculatedData.terminates ?? 0

  const totalResponses = calculatedData.totalTarget ?? 0
  const totalCompleted = inProgressCount + dropoutsCount + terminatesCount + completesCount

  const calculatePercentage = (value) => {
    if (totalCompleted === 0) return 0
    return Math.round((value / totalCompleted) * 100 * 10) / 10
  }

  const segments = [
    {
      label: 'In progress',
      value: inProgressCount,
      color: 'rgba(41, 100, 255, 0.6)',
      percentage: calculatePercentage(inProgressCount),
      tooltip: 'Respondents currently taking the survey'
    },
    {
      label: 'Dropouts',
      value: dropoutsCount,
      color: 'rgba(41, 100, 255, 0.35)',
      percentage: calculatePercentage(dropoutsCount),
      tooltip: 'Respondents who started but abandoned the survey'
    },
    {
      label: 'Terminates',
      value: terminatesCount,
      color: '#EF5350',
      percentage: calculatePercentage(terminatesCount),
      tooltip: 'Respondents who did not qualify based on screening criteria'
    },
    {
      label: 'Completes',
      value: completesCount,
      color: '#66BB6A',
      percentage: calculatePercentage(completesCount),
      tooltip: 'Respondents who successfully completed the survey'
    }
  ]

  return (
    <div className="sample-progress-section">
      <div className="section-header">
        <h2 className="section-title">Sample progress overview</h2>
        <p className="section-subtitle">Status breakdown</p>
      </div>

      {/* Stacked progress bar */}
      <div className="stacked-progress-bar">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="stacked-segment"
            style={{
              width: `${segment.percentage}%`,
              backgroundColor: segment.color
            }}
            title={`${segment.label}: ${segment.value.toLocaleString()} (${segment.percentage}%)`}
          />
        ))}
      </div>

      {/* Status list */}
      <div className="status-list">
        <div className="status-row">
          <span className="status-label">Total responses</span>
          <span className="status-value">{totalResponses.toLocaleString()}</span>
        </div>
        {segments.map((segment) => (
          <div key={segment.label} className="status-row" title={segment.tooltip}>
            <span className="status-label">
              <span className="status-dot" style={{ backgroundColor: segment.color }} />
              {segment.label}
            </span>
            <span className="status-value">{segment.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SampleProgressBar

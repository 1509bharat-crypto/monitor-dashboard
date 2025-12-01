import './AllMetricsCards.css'

const AllMetricsCards = () => {
  const metrics = [
    {
      label: 'IR',
      sublabel: '(Overall)',
      value: '9.81',
      unit: '%',
      trend: -2.1,
      tooltip: 'Incidence Rate: Percentage of respondents who qualify for the survey. Target: 10-15%'
    },
    {
      label: 'LOI',
      sublabel: '(Average)',
      value: '29.3',
      unit: 'min',
      trend: 1.5,
      tooltip: 'Length of Interview (Average): Mean time to complete the survey. Target: 25 min'
    },
    {
      label: 'LOI',
      sublabel: '(Median)',
      value: '21.13',
      unit: 'min',
      trend: 0.8,
      tooltip: 'Length of Interview (Median): Middle value of completion times. Less affected by outliers.'
    }
  ]

  return (
    <div className="all-metrics-container">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card-unified" title={metric.tooltip}>
          <div className="metric-card-header-unified">
            <div className="metric-card-labels">
              <span className="metric-card-label-unified">{metric.label}</span>
              <span className="metric-card-sublabel-unified">{metric.sublabel}</span>
            </div>
            {metric.trend !== undefined && (
              <span className={`trend-indicator ${metric.trend >= 0 ? 'up' : 'down'}`}>
                {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
              </span>
            )}
          </div>
          <div className="metric-card-value-unified">
            {metric.value}
            {metric.unit && <span className="metric-card-unit-unified">{metric.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllMetricsCards

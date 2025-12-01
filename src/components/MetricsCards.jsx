import './MetricsCards.css'

const MetricsCards = () => {
  const metrics = [
    {
      label: 'IR',
      sublabel: '(Average)',
      value: '9.81',
      unit: '%'
    },
    {
      label: 'LOI',
      sublabel: '(Average)',
      value: '29.3',
      unit: 'min'
    },
    {
      label: 'LOI',
      sublabel: '(Median)',
      value: '21.13',
      unit: 'min'
    }
  ]

  return (
    <div className="metrics-cards-container">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">{metric.label}</span>
            <span className="metric-card-sublabel">{metric.sublabel}</span>
          </div>
          <div className="metric-card-value">
            {metric.value}<span className="metric-card-unit">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricsCards

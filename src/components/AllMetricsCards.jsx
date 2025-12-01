import './AllMetricsCards.css'

const AllMetricsCards = () => {
  const metrics = [
    {
      label: 'IR',
      sublabel: '(Overall)',
      value: '9.81',
      unit: '%',
      type: 'metric'
    },
    {
      label: 'LOI',
      sublabel: '(Average)',
      value: '29.3',
      unit: 'min',
      type: 'metric'
    },
    {
      label: 'LOI',
      sublabel: '(Median)',
      value: '21.13',
      unit: 'min',
      type: 'metric'
    }
  ]

  return (
    <div className="all-metrics-container">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card-unified">
          <div className="metric-card-header-unified">
            <span className="metric-card-label-unified">{metric.label}</span>
            <span className="metric-card-sublabel-unified">{metric.sublabel}</span>
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

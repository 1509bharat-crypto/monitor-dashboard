import './QuotaTracking.css'

const QuotaTracking = () => {
  const quotas = [
    { category: 'Gender', segments: [
      { name: 'Male', current: 112, target: 250, percentage: 44.8 },
      { name: 'Female', current: 122, target: 250, percentage: 48.8 }
    ]},
    { category: 'Age', segments: [
      { name: '18-24', current: 42, target: 100, percentage: 42 },
      { name: '25-34', current: 68, target: 150, percentage: 45.3 },
      { name: '35-44', current: 55, target: 125, percentage: 44 },
      { name: '45-54', current: 38, target: 75, percentage: 50.7 },
      { name: '55+', current: 31, target: 50, percentage: 62 }
    ]},
    { category: 'Region', segments: [
      { name: 'North', current: 58, target: 125, percentage: 46.4 },
      { name: 'South', current: 72, target: 150, percentage: 48 },
      { name: 'East', current: 45, target: 100, percentage: 45 },
      { name: 'West', current: 59, target: 125, percentage: 47.2 }
    ]}
  ]

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return '#66BB6A'
    if (percentage >= 50) return '#2964FF'
    if (percentage >= 25) return 'rgba(41, 100, 255, 0.6)'
    return '#EF5350'
  }

  return (
    <div className="quota-tracking-card">
      <div className="card-header">
        <h3 className="card-title">Quota Tracking</h3>
        <span className="card-subtitle">Demographics progress</span>
      </div>

      <div className="quota-grid">
        {quotas.map((quota) => (
          <div key={quota.category} className="quota-category">
            <h4 className="category-title">{quota.category}</h4>
            <div className="segments-list">
              {quota.segments.map((segment) => (
                <div key={segment.name} className="segment-row" title={`${segment.name}: ${segment.current}/${segment.target} (${segment.percentage}%)`}>
                  <div className="segment-info">
                    <span className="segment-name">{segment.name}</span>
                    <span className="segment-count">{segment.current}/{segment.target}</span>
                  </div>
                  <div className="segment-bar">
                    <div
                      className="segment-fill"
                      style={{
                        width: `${Math.min(segment.percentage, 100)}%`,
                        backgroundColor: getStatusColor(segment.percentage)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuotaTracking

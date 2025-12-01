import './AlertIndicators.css'

const AlertIndicators = () => {
  const alerts = [
    {
      type: 'warning',
      metric: 'IR Drop',
      message: 'Incidence rate dropped 3.2% in last 24h',
      value: '9.81%',
      change: -3.2,
      timestamp: '2 hours ago'
    },
    {
      type: 'critical',
      metric: 'LOI Spike',
      message: 'Average LOI increased above target',
      value: '29.3 min',
      change: +4.3,
      timestamp: '5 hours ago'
    },
    {
      type: 'info',
      metric: 'Quota Alert',
      message: 'Age 55+ quota at 62% - ahead of schedule',
      value: '62%',
      change: null,
      timestamp: '1 day ago'
    }
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return '!'
      case 'warning': return '⚠'
      case 'info': return 'i'
      default: return '•'
    }
  }

  return (
    <div className="alert-indicators-card">
      <div className="card-header">
        <h3 className="card-title">Alerts</h3>
        <span className="alert-count">{alerts.length}</span>
      </div>

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item alert-${alert.type}`}>
            <div className="alert-icon">
              {getAlertIcon(alert.type)}
            </div>
            <div className="alert-content">
              <div className="alert-header">
                <span className="alert-metric">{alert.metric}</span>
                <span className="alert-value">
                  {alert.value}
                  {alert.change !== null && (
                    <span className={`alert-change ${alert.change >= 0 ? 'up' : 'down'}`}>
                      {alert.change >= 0 ? '↑' : '↓'} {Math.abs(alert.change)}%
                    </span>
                  )}
                </span>
              </div>
              <p className="alert-message">{alert.message}</p>
              <span className="alert-timestamp">{alert.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertIndicators

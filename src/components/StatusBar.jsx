import './StatusBar.css'

const StatusBar = () => {
  // Get current date and time
  const now = new Date()
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className="status-label">In Queue:</span>
        <span className="status-value">48</span>
      </div>
      <div className="status-item">
        <span className="status-label">Last Updated:</span>
        <span className="status-value">{formattedDate}, {formattedTime}</span>
      </div>
    </div>
  )
}

export default StatusBar

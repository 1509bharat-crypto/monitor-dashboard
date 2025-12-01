import { useData } from '../contexts/DataContext'
import './QualifiedCompletesBar.css'

const QualifiedCompletesBar = () => {
  const { baseData, calculatedData } = useData()

  const current = baseData.totalResponses ?? 234
  const target = calculatedData.totalTarget ?? 1000
  const percentage = target > 0 ? (current / target) * 100 : 0

  return (
    <div className="qualified-completes-bar">
      <div className="qualified-header">
        <span className="qualified-label">Qualified completes</span>
        <span className="qualified-count">
          <span className="qualified-current">{current.toLocaleString()}</span>
          <span className="qualified-separator"> / </span>
          <span className="qualified-target">{target.toLocaleString()}</span>
        </span>
      </div>
      <div className="qualified-progress">
        <div
          className="qualified-progress-fill"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

export default QualifiedCompletesBar

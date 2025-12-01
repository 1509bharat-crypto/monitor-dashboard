import './DataQualitySummary.css'

const DataQualitySummary = () => {
  return (
    <div className="data-quality-summary">
      <div className="summary-content">
        <p className="summary-text">
          Most of your data looks solid — 84% of responses passed the quality check. A smaller group of 125 didn't make the cut, mostly flagged for AI generation and straightlining.
        </p>
      </div>
    </div>
  )
}

export default DataQualitySummary

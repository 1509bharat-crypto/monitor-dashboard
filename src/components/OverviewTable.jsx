import { useState } from 'react'
import './OverviewTable.css'

const OverviewTable = () => {
  const [expanded, setExpanded] = useState(false)

  const data = [
    { label: 'In Progress', value: 0 },
    { label: 'Dropouts', value: 2927 },
    { label: 'Terminates', value: 8686, expandable: true },
    { label: 'Qualified Completes', value: 945 },
    { label: 'Total', value: 12558, isTotal: true }
  ]

  return (
    <div className="overview-section">
      <div className="table-container">
        <table className="overview-table">
          <thead>
            <tr>
              <th className="table-header">Overview</th>
              <th className="table-header right-align">Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`table-row ${row.isTotal ? 'total-row' : ''} ${row.expandable ? 'expandable' : ''}`}
              >
                <td className="table-cell">
                  {row.expandable && (
                    <button
                      className="expand-btn"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? '∨' : '∧'}
                    </button>
                  )}
                  {row.label}
                </td>
                <td className="table-cell right-align">{row.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OverviewTable

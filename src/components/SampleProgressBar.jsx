import { useData } from '../contexts/DataContext'
import './SampleProgressBar.css'
import HorizontalBreakdown from './HorizontalBreakdown'

const SampleProgressBar = () => {
  const { calculatedData, baseData } = useData()

  const completesCount = baseData.totalResponses ?? 0
  const inProgressCount = calculatedData.inProgress ?? 0
  const dropoutsCount = calculatedData.dropouts ?? 0
  const terminatesCount = calculatedData.terminates ?? 0

  const totalCompleted = inProgressCount + dropoutsCount + terminatesCount + completesCount

  const calculatePercentage = (value) => {
    if (totalCompleted === 0) return 0
    return Math.round((value / totalCompleted) * 100 * 10) / 10
  }

  const data = {
    total: calculatedData.totalTarget,
    segments: [
      {
        label: 'In progress',
        value: inProgressCount,
        color: '#FFA726',
        percentage: calculatePercentage(inProgressCount)
      },
      {
        label: 'Dropouts',
        value: dropoutsCount,
        color: '#5C6BC0',
        percentage: calculatePercentage(dropoutsCount)
      },
      {
        label: 'Terminates',
        value: terminatesCount,
        color: '#EF5350',
        percentage: calculatePercentage(terminatesCount)
      },
      {
        label: 'Completes',
        value: completesCount,
        color: '#66BB6A',
        percentage: calculatePercentage(completesCount)
      }
    ]
  }

  const breakdownSegments = [
    {
      label: 'Total responses',
      value: data.total,
      displayValue: data.total.toLocaleString(),
      showBar: false
    },
    ...data.segments.map(segment => ({
      ...segment,
      displayValue: segment.value.toLocaleString(),
      showBar: false
    }))
  ]

  // Get specific segment values for summary
  const completesSegment = data.segments.find(s => s.label === 'Completes')
  const terminatesSegment = data.segments.find(s => s.label === 'Terminates')
  const dropoutsSegment = data.segments.find(s => s.label === 'Dropouts')

  const formatValue = (segment) => segment ? segment.value.toLocaleString() : '0'
  const formatPercentage = (segment) => segment ? segment.percentage : 0

  return (
    <div className="sample-progress-section">
      <div className="section-header">
        <h2 className="section-title">Sample Progress Overview</h2>
      </div>
      <div className="progress-summary">
        Out of {data.total.toLocaleString()} total responses, {formatValue(completesSegment)} were completes - that's {formatPercentage(completesSegment)}%. {formatValue(terminatesSegment)} respondents dropped early, and {formatValue(dropoutsSegment)} dropped out.
      </div>

      <HorizontalBreakdown
        title="Status breakdown"
        segments={breakdownSegments}
        className="sample-progress-breakdown"
      />
    </div>
  )
}

export default SampleProgressBar

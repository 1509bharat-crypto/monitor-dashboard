import { useMemo } from 'react'
import { useData } from '../contexts/DataContext'
import './DataQualityCharts.css'
import HorizontalBreakdown from './HorizontalBreakdown'

const QualityIssuesBreakdown = () => {
  const { calculatedData } = useData()

  const badDataBreakdown = useMemo(() => {
    const total = calculatedData.poorQuality

    const segments = [
      {
        label: 'AI generated',
        value: calculatedData.aiGeneratedCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.aiGeneratedCount / total) * 100) : 0,
        description: 'Detected AI-generated responses'
      },
      {
        label: 'Duplicate answers',
        value: calculatedData.duplicateCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.duplicateCount / total) * 100) : 0,
        description: 'Duplicate participant detected'
      },
      {
        label: 'Straightlining',
        value: calculatedData.straightliningCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.straightliningCount / total) * 100) : 0,
        description: 'Same answer selected repeatedly'
      },
      {
        label: 'Low relevance',
        value: Math.round(calculatedData.poorQuality * 0.15),
        color: '#3a3a3a',
        percentage: 15,
        description: 'Responses not relevant to questions'
      },
      {
        label: 'Speeder',
        value: calculatedData.speederCount,
        color: '#3a3a3a',
        percentage: total > 0 ? Math.round((calculatedData.speederCount / total) * 100) : 0,
        description: 'Completed too quickly'
      },
      {
        label: 'Low clarity',
        value: Math.round(calculatedData.poorQuality * 0.10),
        color: '#3a3a3a',
        percentage: 10,
        description: 'Unclear or confusing responses'
      }
    ]

    // Sort segments by percentage from high to low
    const sortedSegments = segments.sort((a, b) => b.percentage - a.percentage)

    return {
      title: 'Quality Issues Breakdown',
      subtitle: 'INSUFFICIENT',
      segments: sortedSegments
    }
  }, [calculatedData])

  return (
    <div className="data-quality-wrapper">
      <div className="data-quality-container">
        <HorizontalBreakdown
          title={badDataBreakdown.title}
          subtitle={badDataBreakdown.subtitle}
          segments={badDataBreakdown.segments}
        />
      </div>
    </div>
  )
}

export default QualityIssuesBreakdown

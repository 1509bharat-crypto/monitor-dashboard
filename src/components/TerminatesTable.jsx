import './TerminatesTable.css'
import HorizontalBreakdown from './HorizontalBreakdown'

const TerminatesTable = () => {
  // Total terminates must equal 123 to match SampleProgressBar
  const data = [
    {
      name: 'Age Screenout',
      rawName: 'age_screenout',
      number: 25,
      percentage: 20.3,
      description: 'Participants outside target age range'
    },
    {
      name: 'Product Screenout',
      rawName: 'product_screenout',
      number: 12,
      percentage: 9.8,
      description: 'Did not meet product usage criteria'
    },
    {
      name: 'CES Screenout',
      rawName: 'ces_screenout',
      number: 7,
      percentage: 5.7,
      description: 'Customer Effort Score threshold not met'
    },
    {
      name: 'Deleted Screenout',
      rawName: 'DELETED SCREENOUT',
      number: 3,
      percentage: 2.4,
      description: 'Removed due to data quality',
      highlight: true
    },
    {
      name: 'IKEA Screenout',
      rawName: 'ikea_screenout',
      number: 24,
      percentage: 19.5,
      description: 'Brand awareness criteria not met'
    },
    {
      name: 'Category Assignment',
      rawName: 'category_assignment_screenout',
      number: 15,
      percentage: 12.2,
      description: 'Failed category classification'
    },
    {
      name: 'Overquotas',
      rawName: 'Overquotas',
      number: 37,
      percentage: 30.1,
      description: 'Quota for demographic group filled',
      highlight: true
    }
  ]

  // Sort data by percentage from high to low (matching Quality Issues style)
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

  // Transform data for HorizontalBreakdown component
  const segments = sortedData.map(item => ({
    label: item.name,
    value: item.number,
    displayValue: item.number.toLocaleString(),
    percentage: item.percentage,
    color: '#3a3a3a',
    description: item.description,
    showBar: true
  }))

  return (
    <div className="terminates-container">
      <div className="terminates-section">
        <HorizontalBreakdown
          title="Termination Breakdown"
          subtitle="TOTAL TERMINATES"
          segments={segments}
          className="terminates-breakdown"
        />
      </div>
    </div>
  )
}

export default TerminatesTable

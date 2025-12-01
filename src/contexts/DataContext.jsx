import { createContext, useContext, useState, useMemo } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [qualityThreshold, setQualityThreshold] = useState(6)

  // Base data - simulating raw responses with quality scores
  const baseData = useMemo(() => ({
    totalResponses: 782,
    // Distribution of responses by quality score (1-12)
    responsesByScore: {
      1: 15,   // Very poor
      2: 20,
      3: 25,
      4: 30,
      5: 35,
      6: 40,
      7: 50,
      8: 60,
      9: 75,
      10: 90,
      11: 120,
      12: 222  // Excellent
    },
    // Quality issues breakdown (for responses below threshold)
    qualityIssues: {
      aiGenerated: 0.40,      // 40% of poor quality
      straightlining: 0.30,   // 30% of poor quality
      speeder: 0.20,          // 20% of poor quality
      duplicate: 0.10         // 10% of poor quality
    },
    // Country breakdown (percentage of qualified)
    countryBreakdown: {
      'United Kingdom': 0.356,  // 35.6% of qualified
      'United States': 0.356,   // 35.6% of qualified
      'Germany': 0.287          // 28.7% of qualified
    },
    // Other metrics
    terminates: 123,
    dropouts: 26,
    inProgress: 123,
    partial: 23,
    totalTarget: 1234
  }), [])

  // Calculate qualified completes based on quality threshold
  const calculatedData = useMemo(() => {
    const { responsesByScore, totalResponses, qualityIssues, countryBreakdown, terminates, dropouts, inProgress, totalTarget } = baseData

    // Count responses above and below threshold
    let qualifiedCompletes = 0
    let poorQuality = 0

    Object.entries(responsesByScore).forEach(([score, count]) => {
      if (parseInt(score) >= qualityThreshold) {
        qualifiedCompletes += count
      } else {
        poorQuality += count
      }
    })

    // Calculate percentages
    const qualifiedPercentage = Math.round((qualifiedCompletes / totalResponses) * 100)
    const poorPercentage = Math.round((poorQuality / totalResponses) * 100)

    // Calculate quality issue breakdown
    const aiGeneratedCount = Math.round(poorQuality * qualityIssues.aiGenerated)
    const straightliningCount = Math.round(poorQuality * qualityIssues.straightlining)
    const speederCount = Math.round(poorQuality * qualityIssues.speeder)
    const duplicateCount = poorQuality - aiGeneratedCount - straightliningCount - speederCount

    // Calculate country breakdown based on qualified completes
    const ukCount = Math.round(qualifiedCompletes * countryBreakdown['United Kingdom'])
    const usCount = Math.round(qualifiedCompletes * countryBreakdown['United States'])
    const germanyCount = qualifiedCompletes - ukCount - usCount

    // Calculate sample progress
    const totalCompleted = inProgress + dropouts + terminates + qualifiedCompletes
    const remaining = totalTarget - totalCompleted

    return {
      // Quality metrics
      qualifiedCompletes,
      poorQuality,
      qualifiedPercentage,
      poorPercentage,
      aiGeneratedCount,
      straightliningCount,
      speederCount,
      duplicateCount,

      // Country breakdown
      countryBreakdown: {
        'United Kingdom': ukCount,
        'United States': usCount,
        'Germany': germanyCount
      },

      // Sample progress
      terminates,
      dropouts,
      inProgress,
      totalTarget,
      totalCompleted,
      remaining
    }
  }, [qualityThreshold, baseData])

  // Completes distribution by day and panel partner
  const completesDistribution = useMemo(() => {
    const { qualifiedCompletes } = calculatedData

    // Generate data for 11 days (matching the image)
    const dates = ['04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01']

    return dates.map((date, index) => {
      // Simulate varying distribution across panel partners
      // Days 1-6: Mostly PureSpectrum (orange)
      // Days 7-9: Mix of all partners (multi-colored stacks)
      // Days 10-11: Mostly Kantar (blue)
      // Target shows as grey background reference line

      if (index < 6) {
        // Early days - PureSpectrum dominant
        const values = [
          { pure: 72, target: 100 },
          { pure: 52, target: 90 },
          { pure: 34, target: 80 },
          { pure: 36, target: 80 },
          { pure: 35, target: 80 },
          { pure: 36, target: 85 }
        ]
        const val = values[index]
        return {
          date,
          PureSpectrum: val.pure,
          Dynata: 0,
          Kantar: 0,
          Target: val.target
        }
      } else if (index >= 6 && index <= 8) {
        // Middle days - mixed partners
        const distributions = [
          { pure: 36, dynata: 18, kantar: 30, target: 100 },  // 10/01
          { pure: 36, dynata: 24, kantar: 30, target: 105 },  // 11/01
          { pure: 36, dynata: 24, kantar: 36, target: 110 }   // 12/01
        ]
        const dist = distributions[index - 6]
        return {
          date,
          PureSpectrum: dist.pure,
          Dynata: dist.dynata,
          Kantar: dist.kantar,
          Target: dist.target
        }
      } else {
        // Late days - Kantar dominant
        const values = [
          { kantar: 54, dynata: 20, target: 90 },  // 13/01
          { kantar: 63, dynata: 0, target: 85 }    // 14/01
        ]
        const val = values[index - 9]
        return {
          date,
          PureSpectrum: 0,
          Dynata: val.dynata,
          Kantar: val.kantar,
          Target: val.target
        }
      }
    })
  }, [calculatedData])

  const value = {
    qualityThreshold,
    setQualityThreshold,
    calculatedData,
    baseData,
    completesDistribution
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

import type { SurveyFinding } from '../types/game'

export function SurveyInsight({ finding }: { finding: SurveyFinding }) {
  return (
    <aside className="insight">
      <div className="insight__heading"><span>THE DATA SAYS...</span><mark>SUPPLIED DATA</mark></div>
      <div className="insight__body"><strong>{finding.value}%</strong><p>{finding.text}</p></div>
      <small>Source: Social Acceptance survey responses · {finding.source}</small>
    </aside>
  )
}

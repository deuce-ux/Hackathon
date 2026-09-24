import type { Choice, MetricKey } from '../types/game'
import { SurveyInsight } from './SurveyInsight'
import { surveyData } from '../data/surveyData'
import type { SurveyKey } from '../types/game'

const labels: Record<MetricKey, string> = { energy: '⚡ Energy', water: '💧 Water', economy: '💰 Economy', anger: '😡 Anger' }

export function ConsequencePanel({ choice, insightKey, onContinue, finalRound }: { choice: Choice; insightKey?: SurveyKey; onContinue: () => void; finalRound: boolean }) {
  return (
    <section className="consequence" aria-live="polite">
      <div className="result-burst" aria-hidden="true">POW!</div>
      <p className="eyebrow">THE CONTROL ROOM REACTS</p>
      <div className="effect-row">{(Object.entries(choice.effects) as [MetricKey, number][]).map(([key, value]) => <span key={key} className={value > 0 ? 'effect effect--up' : value < 0 ? 'effect effect--down' : 'effect'}>{labels[key]} <b>{value > 0 ? '+' : ''}{value}</b></span>)}</div>
      <blockquote>{choice.reaction}</blockquote>
      {insightKey && <SurveyInsight finding={surveyData[insightKey]} />}
      <button className="button button--dark continue" onClick={onContinue}>{finalRound ? 'SEE FINAL RESULTS' : 'CONTINUE'} <span aria-hidden="true">→</span></button>
    </section>
  )
}

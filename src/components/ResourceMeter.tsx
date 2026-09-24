import type { MetricKey } from '../types/game'

const metadata: Record<MetricKey, { icon: string; label: string; goodWhenHigh: boolean }> = {
  energy: { icon: '⚡', label: 'Energy', goodWhenHigh: true },
  water: { icon: '💧', label: 'Water', goodWhenHigh: true },
  economy: { icon: '💰', label: 'Economy', goodWhenHigh: true },
  anger: { icon: '😡', label: 'Public anger', goodWhenHigh: false },
}

export function ResourceMeter({ metric, value, change }: { metric: MetricKey; value: number; change?: number }) {
  const { icon, label, goodWhenHigh } = metadata[metric]
  const danger = goodWhenHigh ? value <= 25 : value >= 75
  const warning = goodWhenHigh ? value <= 45 : value >= 55
  const state = danger ? 'Critical' : warning ? 'Watch' : 'Stable'
  return (
    <div className={`meter meter--${danger ? 'danger' : warning ? 'warning' : 'stable'}`} aria-label={`${label}: ${value} out of 100, ${state}`}>
      <div className="meter__top">
        <span className="meter__name"><span aria-hidden="true">{icon}</span> {label}</span>
        <span className="meter__score">{value}<small>/100</small></span>
      </div>
      <div className="meter__track" aria-hidden="true"><span style={{ width: `${value}%` }} /></div>
      <div className="meter__foot"><span>{state}</span>{change !== undefined && change !== 0 && <b className={change > 0 ? 'change--up' : 'change--down'}>{change > 0 ? '+' : ''}{change}</b>}</div>
    </div>
  )
}

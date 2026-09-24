import type { MetricKey, Scenario } from '../types/game'

const cast = {
  sparky: { name: 'Sparky', role: 'GRID TECH', image: '/characters/sparky.png' },
  drippy: { name: 'Drippy', role: 'WATER WATCH', image: '/characters/drippy.png' },
  byte: { name: 'Byte', role: 'SERVER BOSS', image: '/characters/byte.png' },
}
const roundCast: Array<[keyof typeof cast, keyof typeof cast]> = [
  ['byte', 'sparky'], ['sparky', 'byte'], ['drippy', 'byte'], ['sparky', 'byte'], ['byte', 'sparky'],
  ['sparky', 'byte'], ['sparky', 'byte'], ['drippy', 'byte'], ['byte', 'sparky'], ['byte', 'drippy'],
]
const icons: Record<MetricKey, string> = { energy: '⚡', water: '💧', economy: '💰', anger: '😡' }

function EffectHint({ effects }: { effects: Scenario['choices'][number]['effects'] }) {
  const entries = (Object.entries(effects) as [MetricKey, number][]).filter(([, value]) => value !== 0)
  const best = [...entries].sort((a, b) => b[1] - a[1])[0]
  const worst = [...entries].sort((a, b) => a[1] - b[1])[0]
  return <span className="choice__hints"><i className="hint-up">{icons[best[0]]} ↑</i><i className="hint-down">{icons[worst[0]]} ↓</i></span>
}

export function ScenarioCard({ scenario, locked, selected, onChoose }: { scenario: Scenario; locked: boolean; selected: number | null; onChoose: (index: number) => void }) {
  const [leftKey, rightKey] = roundCast[scenario.id - 1]
  const left = cast[leftKey], right = cast[rightKey]
  return (
    <section className={`game-stage ${locked ? 'game-stage--resolved' : ''}`} aria-labelledby="scenario-title">
      <div className="stage-lights" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <div className="stage-screen"><span>{scenario.eyebrow}</span><b>ROUND {String(scenario.id).padStart(2, '0')}</b></div>
      <div className={`character character--left ${selected === 1 ? 'character--winner' : selected === 0 ? 'character--loser' : ''}`}>
        <div className="name-tag"><b>{left.name}</b><span>{left.role}</span></div><img src={left.image} alt={`${left.name}, ${left.role}`} />
      </div>
      <div className={`character character--right ${selected === 0 ? 'character--winner' : selected === 1 ? 'character--loser' : ''}`}>
        <div className="name-tag"><b>{right.name}</b><span>{right.role}</span></div><img src={right.image} alt={`${right.name}, ${right.role}`} />
      </div>
      <div className="speech-card"><span className="speech-card__alert">!</span><h2 id="scenario-title">{scenario.headline}</h2><p>{scenario.description}</p></div>
      <div className="choices" aria-label="Choose your move">
        {scenario.choices.map((choice, index) => (
          <button key={choice.label} className={selected === index ? 'choice choice--selected' : 'choice'} disabled={locked} onClick={() => onChoose(index)}>
            <span className="choice__key">{index === 0 ? 'A' : 'B'}</span><span className="choice__main"><small>{index === 0 ? `${left.name} says` : `${right.name} says`}</small><b>{choice.label}</b></span><EffectHint effects={choice.effects} />
          </button>
        ))}
      </div>
      {!locked && <div className="stage-prompt">PICK A SIDE!</div>}
    </section>
  )
}

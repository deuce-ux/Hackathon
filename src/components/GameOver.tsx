import type { Metrics } from '../types/game'
import { ResourceMeter } from './ResourceMeter'

type Result = { title: string; message: string; survived: boolean }

export function GameOver({ metrics, result, score, archetype, onRestart }: { metrics: Metrics; result: Result; score: number; archetype: { title: string; text: string }; onRestart: () => void }) {
  return (
    <main className="result-screen">
      <p className="eyebrow">FINAL REPORT</p><h1>{result.title}</h1><p className="result-screen__message">{result.message}</p>
      <div className="score-stamp"><span>BALANCE SCORE</span><strong>{score}</strong><small>/100</small></div>
      <div className="resource-grid result-meters">{(Object.keys(metrics) as (keyof Metrics)[]).map(key => <ResourceMeter key={key} metric={key} value={metrics[key]} />)}</div>
      <section className="archetype"><p className="eyebrow">YOUR LEADERSHIP STYLE</p><h2>{archetype.title}</h2><p>{archetype.text}</p></section>
      <Contribute />
      <button className="button button--yellow" onClick={onRestart}>PLAY AGAIN <span aria-hidden="true">↻</span></button>
    </main>
  )
}

function Contribute() {
  const [answer, setAnswer] = React.useState<string | null>(null)
  return <section className="contribute"><p className="eyebrow">WHAT DO YOU THINK?</p><h2>Overall, do the benefits of data centres outweigh their costs?</h2>{answer ? <div className="thanks"><strong>Thanks for weighing in.</strong><p>In the full version, your answer could be anonymously compared with the original survey and other players. Nothing was uploaded.</p></div> : <div className="poll">{['Yes', 'No', 'Unsure'].map(item => <button key={item} onClick={() => setAnswer(item)}>{item}</button>)}</div>}</section>
}

import React from 'react'

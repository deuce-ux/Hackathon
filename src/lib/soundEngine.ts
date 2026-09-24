type AudioWindow = typeof window & { webkitAudioContext?: typeof AudioContext }
type Cue = 'intro' | 'select' | 'lock' | 'tick' | 'tickUrgent' | 'correct' | 'wrong' | 'lifeline' | 'money' | 'walk' | 'test'
type Mode = 'webaudio' | 'media'

const cueNotes: Record<Cue, Array<[number, number]>> = {
  intro: [[196,.12],[247,.12],[294,.12],[392,.14],[494,.32]],
  select: [[520,.08],[660,.13]],
  lock: [[140,.14],[140,.14],[140,.3]],
  tick: [[900,.1]],
  tickUrgent: [[1047,.11]],
  correct: [[523,.09],[659,.09],[784,.09],[1047,.11],[1319,.32]],
  wrong: [[196,.13],[174,.13],[146,.13],[98,.36]],
  lifeline: [[880,.1],[1175,.1],[1320,.3]],
  money: [[523,.09],[659,.09],[784,.09],[1047,.28]],
  walk: [[523,.14],[392,.14],[330,.38]],
  test: [[440,.16],[659,.18],[880,.34]],
}

function wavData(notes: Array<[number, number]>) {
  const rate=22050,gap=.025,total=Math.ceil(notes.reduce((sum,[,duration])=>sum+duration+gap,0)*rate)
  const bytes=new Uint8Array(44+total*2),view=new DataView(bytes.buffer)
  const text=(offset:number,value:string)=>{for(let i=0;i<value.length;i++)bytes[offset+i]=value.charCodeAt(i)}
  text(0,'RIFF');view.setUint32(4,36+total*2,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,total*2,true)
  let cursor=0
  for(const [frequency,duration] of notes){const count=Math.floor(duration*rate);for(let i=0;i<count;i++){const fade=Math.min(1,i/(rate*.012),(count-i)/(rate*.035));const harmonic=Math.sin(2*Math.PI*frequency*i/rate)+.24*Math.sin(4*Math.PI*frequency*i/rate);view.setInt16(44+(cursor+i)*2,Math.max(-1,Math.min(1,harmonic*.48*fade))*32767,true)}cursor+=count+Math.floor(gap*rate)}
  let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192))
  return `data:audio/wav;base64,${btoa(binary)}`
}

// Phones get a real media channel: their browsers frequently keep an AudioContext
// suspended however the tap arrives, while a muted HTMLAudio unlock inside the tap
// frees the media route. Desktop and iPad keep Web Audio.
function prefersMediaChannel() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  if (/iPad/i.test(ua)) return false
  return /iPhone|iPod|Android|Windows Phone|IEMobile|Opera Mini|BlackBerry|Mobile/i.test(ua)
}

class QuizSoundEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private muted = false
  private mode: Mode = prefersMediaChannel() ? 'media' : 'webaudio'
  private media = new Map<Cue, HTMLAudioElement>()
  private primed = false
  private primeGen = 0

  setMuted(value:boolean){this.muted=value;if(this.master)this.master.gain.value=value?0:.7;for(const audio of this.media.values())audio.muted=value}
  private ensureMedia(){if(this.media.size)return;for(const cue of Object.keys(cueNotes) as Cue[]){const audio=new Audio(wavData(cueNotes[cue]));audio.preload='auto';audio.muted=this.muted;this.media.set(cue,audio)}}
  // Build the in-memory WAV cues off the critical tap so the first tap only pays for priming.
  prepare(){if(this.mode==='media')this.ensureMedia()}
  // Prime every cue from inside the first tap so later cues can play programmatically.
  private primeMedia(){const gen=++this.primeGen;for(const audio of this.media.values()){audio.muted=true;const started=audio.play();if(!started||typeof started.then!=='function'){audio.pause();audio.currentTime=0;audio.muted=this.muted;continue}started.then(()=>{if(gen!==this.primeGen)return;audio.pause();audio.currentTime=0;audio.muted=this.muted}).catch(()=>{audio.muted=this.muted})}}
  private async playMedia(cue:Cue){this.ensureMedia();const audio=this.media.get(cue);if(!audio||this.muted)return false;this.primeGen++;audio.muted=false;try{audio.pause();audio.currentTime=0;await audio.play();return true}catch{return false}}
  private async unlockMedia(playCue:boolean){this.ensureMedia();if(!this.primed){this.primed=true;this.primeMedia()}if(!playCue)return true;return this.playMedia('test')}
  private ready(){if(!this.ctx){const Ctx=window.AudioContext||(window as AudioWindow).webkitAudioContext;if(!Ctx)return null;this.ctx=new Ctx();this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:.7;this.master.connect(this.ctx.destination)}return this.ctx}
  async unlock(playCue=false){
    if(this.mode==='media')return this.unlockMedia(playCue)
    const ctx=this.ready()
    if(!ctx){this.mode='media';return this.unlockMedia(playCue)}
    let running=false
    try{await ctx.resume();running=ctx.state==='running'}catch{}
    if(running){if(playCue){this.note(440,0,.16,'triangle',.3);this.note(659,.1,.2,'triangle',.34);this.note(880,.22,.3,'sine',.28)}return true}
    this.mode='media'
    return this.unlockMedia(playCue)
  }
  private note(freq:number,at:number,duration:number,type:OscillatorType='sine',volume=.35){const ctx=this.ready();if(!ctx||!this.master)return;if(ctx.state!=='running'){void ctx.resume().then(()=>this.note(freq,at,duration,type,volume));return}const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,ctx.currentTime+at);g.gain.setValueAtTime(.001,ctx.currentTime+at);g.gain.exponentialRampToValueAtTime(volume,ctx.currentTime+at+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+at+duration);o.connect(g);g.connect(this.master);o.start(ctx.currentTime+at);o.stop(ctx.currentTime+at+duration+.03)}
  private cue(name:Cue,fallback:()=>void){if(this.mode==='media'){void this.playMedia(name);return}fallback()}
  intro(){this.cue('intro',()=>{[196,247,294,392,494].forEach((n,i)=>this.note(n,i*.11,.4,'triangle',.3));this.note(98,0,.9,'sawtooth',.16)})}
  select(){this.cue('select',()=>{this.note(520,0,.09,'square',.18);this.note(660,.055,.12,'sine',.16)})}
  lock(){this.cue('lock',()=>{[0,.24,.48].forEach(t=>{this.note(72,t,.15,'sine',.48);this.note(144,t+.02,.1,'triangle',.16)});this.note(220,.05,.72,'sawtooth',.05)})}
  tick(urgent=false){if(this.mode==='media'){void this.playMedia(urgent?'tickUrgent':'tick');return}this.note(urgent?1047:740,0,urgent?.1:.065,'square',urgent?.2:.1);if(urgent)this.note(131,.01,.08,'sine',.16)}
  correct(){this.cue('correct',()=>{[523,659,784,1047,1319].forEach((n,i)=>this.note(n,i*.075,.36,'triangle',.42));[1568,2093].forEach((n,i)=>this.note(n,.34+i*.09,.65,'sine',.24));this.note(131,.02,.52,'sawtooth',.12)})}
  wrong(){this.cue('wrong',()=>{[196,174,146,98].forEach((n,i)=>this.note(n,i*.11,.36,'sawtooth',.34))})}
  async test(){return this.unlock(true)}
  lifeline(){this.cue('lifeline',()=>[880,1175,1320].forEach((n,i)=>this.note(n,i*.08,.28,'sine',.2)))}
  money(){this.cue('money',()=>[523,659,784,1047].forEach((n,i)=>this.note(n,i*.07,.25,'triangle',.2)))}
  walk(){this.cue('walk',()=>[523,392,330].forEach((n,i)=>this.note(n,i*.13,.42,'sine',.22)))}
}

export const quizSound=new QuizSoundEngine()

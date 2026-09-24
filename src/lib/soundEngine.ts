type AudioWindow = typeof window & { webkitAudioContext?: typeof AudioContext }

class QuizSoundEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private muted = false

  setMuted(value: boolean) { this.muted = value; if (this.master) this.master.gain.value = value ? 0 : 0.34 }
  private ready() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as AudioWindow).webkitAudioContext
      if (!Ctx) return null
      this.ctx = new Ctx(); this.master = this.ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.34; this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }
  async unlock(){const ctx=this.ready();if(!ctx)return false;try{await ctx.resume();const buffer=ctx.createBuffer(1,1,22050),source=ctx.createBufferSource();source.buffer=buffer;source.connect(ctx.destination);source.start(0);return ctx.state==='running'}catch{return false}}
  private note(freq: number, at: number, duration: number, type: OscillatorType = 'sine', volume = .35) {
    const ctx=this.ready(); if(!ctx||!this.master)return
    const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,ctx.currentTime+at);g.gain.setValueAtTime(.001,ctx.currentTime+at);g.gain.exponentialRampToValueAtTime(volume,ctx.currentTime+at+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+at+duration);o.connect(g);g.connect(this.master);o.start(ctx.currentTime+at);o.stop(ctx.currentTime+at+duration+.03)
  }
  intro(){[196,247,294,392,494].forEach((n,i)=>this.note(n,i*.11,.4,'triangle',.3));this.note(98,0,.9,'sawtooth',.16)}
  select(){this.note(520,0,.09,'square',.18);this.note(660,.055,.12,'sine',.16)}
  lock(){[0,.24,.48].forEach((t,i)=>{this.note(72,t,.15,'sine',.48);this.note(144,t+.02,.1,'triangle',.16)});this.note(220,.05,.72,'sawtooth',.05)}
  tick(urgent=false){this.note(urgent?1047:740,0,urgent?.1:.065,'square',urgent?.2:.1);if(urgent)this.note(131,.01,.08,'sine',.16)}
  correct(){[523,659,784,1047,1319].forEach((n,i)=>this.note(n,i*.075,.36,'triangle',.42));[1568,2093].forEach((n,i)=>this.note(n,.34+i*.09,.65,'sine',.24));this.note(131,.02,.52,'sawtooth',.12)}
  wrong(){const ctx=this.ready();if(!ctx||!this.master)return;[196,174,146,98].forEach((n,i)=>this.note(n,i*.11,.36,'sawtooth',.34));const len=Math.floor(ctx.sampleRate*.5),buf=ctx.createBuffer(1,len,ctx.sampleRate),data=buf.getChannelData(0);for(let i=0;i<len;i++)data[i]=(Math.random()*2-1)*(1-i/len);const src=ctx.createBufferSource(),g=ctx.createGain();src.buffer=buf;g.gain.setValueAtTime(.11,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.5);src.connect(g);g.connect(this.master);src.start()}
  async test(){const active=await this.unlock();if(active){this.note(440,0,.16,'triangle',.3);this.note(659,.1,.2,'triangle',.34);this.note(880,.22,.3,'sine',.28)}return active}
  lifeline(){[880,1175,1320].forEach((n,i)=>this.note(n,i*.08,.28,'sine',.2))}
  money(){[523,659,784,1047].forEach((n,i)=>this.note(n,i*.07,.25,'triangle',.2))}
  walk(){[523,392,330].forEach((n,i)=>this.note(n,i*.13,.42,'sine',.22))}
}

export const quizSound = new QuizSoundEngine()

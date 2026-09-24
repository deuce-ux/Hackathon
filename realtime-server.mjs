import { WebSocketServer } from 'ws'
import { createServer } from 'node:http'
import { networkInterfaces } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 8787

// Ordered so audience phones are offered the local Wi-Fi LAN first (they will not be
// on the host's tailnet), with Tailscale kept as a fallback for the host's own devices.
function localAddresses() {
  const found = []
  for (const entries of Object.values(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family !== 'IPv4' || entry.internal) continue
      found.push(entry.address)
    }
  }
  const rank = ip => {
    const [a, b] = ip.split('.').map(Number)
    if (a === 192 && b === 168) return 0
    if (a === 10) return 1
    if (a === 172 && b >= 16 && b <= 31) return 2
    if (a === 100 && b >= 64 && b <= 127) return 3
    return 4
  }
  return found.sort((x, y) => rank(x) - rank(y))
}

const rooms = new Map()
const room = code => rooms.get(code) ?? { question: 0, votes: [0, 0, 0, 0], clients: new Set() }
const broadcast = code => {
  const state = room(code)
  const message = JSON.stringify({ type: 'state', question: state.question, votes: state.votes, connected: state.clients.size })
  for (const client of state.clients) if (client.readyState === 1) client.send(message)
}

// One port serves both the WebSocket and a tiny HTTP endpoint the host page uses
// to learn which address a phone should scan.
const server = createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  if ((request.url ?? '').split('?')[0] === '/network') {
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ addresses: localAddresses(), port: PORT }))
    return
  }
  response.statusCode = 404
  response.end('not found')
})

const wss = new WebSocketServer({ server })
wss.on('connection', socket => {
  let code = ''
  socket.on('message', raw => {
    try {
      const msg = JSON.parse(raw.toString())
      code = String(msg.room || 'LIVE').toUpperCase()
      const state = room(code)
      rooms.set(code, state)
      state.clients.add(socket)
      if (msg.type === 'host-question' && msg.question !== state.question) {
        state.question = msg.question
        state.votes = [0, 0, 0, 0]
      }
      if (msg.type === 'vote' && Number.isInteger(msg.answer) && msg.answer >= 0 && msg.answer < 4) state.votes[msg.answer]++
      broadcast(code)
    } catch {}
  })
  socket.on('close', () => {
    if (!code) return
    room(code).clients.delete(socket)
    broadcast(code)
  })
})

server.listen(PORT, '0.0.0.0', () => console.log('Audience server: ws://0.0.0.0:8787'))
const vite = spawn('npm', ['run', 'dev:web', '--', '--host', '0.0.0.0'], { stdio: 'inherit', shell: true })
process.on('SIGINT', () => {
  vite.kill('SIGINT')
  wss.close()
  server.close()
  process.exit(0)
})

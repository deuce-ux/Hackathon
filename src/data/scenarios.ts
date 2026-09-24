import type { Scenario } from '../types/game'

export const scenarios: Scenario[] = [
  { id: 1, eyebrow: 'INCOMING PROPOSAL', headline: 'BIG TECH HAS ENTERED THE CHAT', description: 'A technology company wants another enormous data centre. It promises investment, jobs and absolutely nothing going wrong.', insightKey: 'electricityUseBelief', choices: [
    { label: 'Approve it', effects: { energy: -15, water: -10, economy: 18, anger: 10 }, reaction: 'The economy is delighted. The electricity grid has started sweating.', tags: ['approval', 'growth'] },
    { label: 'Reject it', effects: { energy: 5, water: 5, economy: -12, anger: -6 }, reaction: 'The grid exhales. Several consultants dramatically close their laptops.', tags: ['green', 'people'] },
  ]},
  { id: 2, eyebrow: 'GRID ALERT', headline: 'THE PLUG IS FEELING EMOTIONAL', description: 'Electricity demand is dangerously high. The servers insist they are doing very important internet things.', insightKey: 'electricityUseBelief', choices: [
    { label: 'Restrict data-centre use', effects: { energy: 16, water: 1, economy: -9, anger: -5 }, reaction: 'The grid stabilises. Somewhere, a spreadsheet takes four seconds longer to load.', tags: ['green', 'people'] },
    { label: 'Keep the servers running', effects: { energy: -18, water: -3, economy: 12, anger: 8 }, reaction: 'Uptime remains flawless. The national grid is now making dial-up noises.', tags: ['approval', 'growth'] },
  ]},
  { id: 3, eyebrow: 'WEATHER UPDATE', headline: 'A GRAND SOFT DAY? NOT TODAY', description: 'A dry summer squeezes water supplies. Cooling systems and garden hoses eye each other suspiciously.', insightKey: 'independentMonitoring', choices: [
    { label: 'Restrict cooling water', effects: { energy: -5, water: 18, economy: -8, anger: -7 }, reaction: 'Reservoirs recover. The servers receive tiny paper fans.', tags: ['green', 'people'] },
    { label: 'Prioritise the data centre', effects: { energy: 1, water: -20, economy: 11, anger: 15 }, reaction: 'The servers are wonderfully cool. Everyone else is staring at an empty kettle.', tags: ['approval', 'growth'] },
  ]},
  { id: 4, eyebrow: 'TOWN HALL', headline: 'THE LOCALS HAVE BROUGHT PLACARDS', description: 'Residents are angry about noise, emissions and the suspicious absence of anyone answering their emails.', insightKey: 'communityConsent', choices: [
    { label: 'Introduce stricter rules', effects: { energy: 8, water: 7, economy: -10, anger: -15 }, reaction: 'The crowd lowers its placards. Compliance officers open seventeen tabs.', tags: ['green', 'people'] },
    { label: "Say it'll probably be fine", effects: { energy: -5, water: -4, economy: 7, anger: 18 }, reaction: 'It was, in fact, not a calming sentence.', tags: ['approval', 'chaos'] },
  ]},
  { id: 5, eyebrow: 'JOBS BONANZA', headline: 'HUNDREDS OF HARD HATS APPEAR', description: 'A developer promises construction jobs. The ribbon-cutting scissors are already being polished.', insightKey: 'localBenefits', choices: [
    { label: 'Offer incentives', effects: { energy: -7, water: -5, economy: 17, anger: 7 }, reaction: 'Cranes rise. The finance department quietly checks under the sofa cushions.', tags: ['approval', 'growth'] },
    { label: 'Make them pay full price', effects: { energy: 1, water: 2, economy: 7, anger: -6 }, reaction: 'The deal survives. A corporate lobbyist develops a tiny frown.', tags: ['centrist', 'people'] },
  ]},
  { id: 6, eyebrow: 'TRENDING NOW', headline: 'YOUR AUNT HAS SHARED A GRAPH', description: 'A viral post claims one data centre drinks an Atlantic Ocean every lunchtime. The comments are thriving.', insightKey: 'socialMediaSource', choices: [
    { label: 'Publish clear evidence', effects: { energy: 0, water: 0, economy: -3, anger: -14 }, reaction: 'Facts arrive with citations. The internet briefly considers reading them.', tags: ['people', 'centrist'] },
    { label: 'Ignore it', effects: { energy: 0, water: 0, economy: 2, anger: 16 }, reaction: 'Silence creates a vacuum. A man with a podcast fills it immediately.', tags: ['chaos'] },
  ]},
  { id: 7, eyebrow: 'GREEN SWITCH', headline: 'RENEWABLES, NOW WITH RECEIPT', description: 'Clean power is available, but the infrastructure bill has enough zeroes to require a wider monitor.', insightKey: 'renewableRequirement', choices: [
    { label: 'Invest in renewables', effects: { energy: 19, water: 4, economy: -15, anger: -10 }, reaction: 'The turbines spin. The treasury asks whether exposure can pay invoices.', tags: ['green', 'people'] },
    { label: 'Stick with cheaper energy', effects: { energy: -10, water: -2, economy: 14, anger: 12 }, reaction: 'This quarter looks lovely. The next quarter has sent a threatening email.', tags: ['approval', 'growth'] },
  ]},
  { id: 8, eyebrow: 'OPEN GOVERNMENT', headline: 'SHOW US THE NUMBERS', description: 'Residents want transparent energy and water figures, preferably in a format that opens on a phone.', insightKey: 'publicInformation', choices: [
    { label: 'Publish a clear dashboard', effects: { energy: 0, water: 2, economy: -4, anger: -16 }, reaction: 'People can see the numbers. Society somehow continues.', tags: ['people', 'centrist'] },
    { label: 'Release a 147-page PDF', effects: { energy: -1, water: 0, economy: 3, anger: 14 }, reaction: 'Page 83 is sideways. Accountability has been technically achieved.', tags: ['chaos'] },
  ]},
  { id: 9, eyebrow: 'AI BOOM', headline: 'THE ROBOTS WANT MORE SERVERS', description: 'AI demand explodes. Companies request more capacity and promise the chatbots will be very grateful.', insightKey: 'managedBenefits', choices: [
    { label: 'Expand aggressively', effects: { energy: -20, water: -13, economy: 22, anger: 15 }, reaction: 'Investment surges. The grid asks an AI to write its resignation letter.', tags: ['approval', 'growth'] },
    { label: 'Slow expansion', effects: { energy: 10, water: 8, economy: -11, anger: -8 }, reaction: 'The resources recover. A venture capitalist describes you as “pre-innovation”.', tags: ['green', 'people'] },
  ]},
  { id: 10, eyebrow: 'FINAL DECISION', headline: 'ONE LAST VERY LARGE BUILDING', description: 'The final proposal lands on your desk. You have scars, opinions and a suspicious relationship with progress bars.', insightKey: 'managedBenefits', choices: [
    { label: 'Approve with strict conditions', effects: { energy: -8, water: -6, economy: 13, anger: -7 }, reaction: 'A compromise is signed. Nobody is ecstatic, which feels oddly promising.', tags: ['centrist', 'approval'] },
    { label: 'Reject expansion', effects: { energy: 9, water: 8, economy: -13, anger: -5 }, reaction: 'The proposal is shelved. The shelf immediately hires a public-affairs team.', tags: ['green', 'people'] },
  ]},
]

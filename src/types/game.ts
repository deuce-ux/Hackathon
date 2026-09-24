export type MetricKey = 'energy' | 'water' | 'economy' | 'anger'
export type Metrics = Record<MetricKey, number>
export type Effects = Record<MetricKey, number>
export type Choice = { label: string; effects: Effects; reaction: string; tags: string[] }
export type SurveyKey = 'electricityUseBelief' | 'socialMediaSource' | 'renewableRequirement' | 'localBenefits' | 'independentMonitoring' | 'publicInformation' | 'communityConsent' | 'managedBenefits'
export type Scenario = { id: number; eyebrow: string; headline: string; description: string; choices: [Choice, Choice]; insightKey?: SurveyKey }
export type SurveyFinding = { value: number; text: string; isPlaceholder: boolean; source: string }
export type GameStatus = 'landing' | 'playing' | 'finished'

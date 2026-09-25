import { surveyData } from './surveyData'

export type QuizQuestion = {
  question: string
  answers: [string, string, string, string]
  correct: number
  explanation: string
  hint: string
  character: 'byte' | 'sparky' | 'drippy'
  surveyValue?: number
  source?: string
  measuredData?: { text: string; source: string }
  policy?: { headline: string; description: string; choices: [string, string] }
}

// Judgement calls rather than memory tests. The scored choice is the one most
// closely aligned with the strongest signal in the supplied Irish survey.
export const quizQuestions: QuizQuestion[] = [
  {
    question: 'A new data centre could create jobs, but the grid is already under pressure. What condition do you set first?',
    answers: ['Approve now; review energy later', 'Require a credible power plan before approval', 'Reject every data centre automatically', 'Let the operator decide privately'],
    correct: 1, explanation: surveyData.electricityUseBelief.text,
    hint: 'Ireland is not giving you a simple yes or no. Address the risk respondents are most conscious of.',
    character: 'sparky', surveyValue: surveyData.electricityUseBelief.value, source: surveyData.electricityUseBelief.source,
    measuredData: {
      text: 'The supplied electricity dataset records 7,663 GWh of data-centre consumption out of 32,986 GWh total consumption — approximately 23.2%.',
      source: 'Supplied electricity-consumption dataset · 7,663 ÷ 32,986 GWh',
    },
  },
  {
    question: 'A false viral post about the project is spreading faster than your technical report. What do you do?',
    answers: ['Threaten everyone who shared it', 'Say nothing until it disappears', 'Publish a short, sourced response and open the evidence', 'Release another 150-page report'],
    correct: 2, explanation: surveyData.socialMediaSource.text,
    hint: 'Meet people where views are actually being formed, without replacing evidence with spin.',
    character: 'byte', surveyValue: surveyData.socialMediaSource.value, source: surveyData.socialMediaSource.source,
  },
  {
    question: 'The operator promises to “match” its electricity with renewables, but cannot show when or where that power is generated. Your move?',
    answers: ['Accept the slogan', 'Require verifiable renewable supply and reporting', 'Ban renewable contracts', 'Ignore energy if jobs are promised'],
    correct: 1, explanation: surveyData.renewableRequirement.text,
    hint: 'Choose the condition that makes an environmental promise testable.',
    character: 'sparky', surveyValue: surveyData.renewableRequirement.value, source: surveyData.renewableRequirement.source,
  },
  {
    question: 'Residents near the proposed site expect disruption, while most economic benefits may leave the area. What do you negotiate?',
    answers: ['A glossy launch event', 'Direct, enforceable local benefits shaped with residents', 'A national advertising campaign', 'Nothing; planning permission is enough'],
    correct: 1, explanation: surveyData.localBenefits.text,
    hint: 'Think about who carries the local cost and who receives the benefit.',
    character: 'byte', surveyValue: surveyData.localBenefits.value, source: surveyData.localBenefits.source,
  },
  {
    question: 'The operator says its water and emissions figures are safe, but trust in its own reports is low. What would most strengthen the project?',
    answers: ['Independent monitoring with public results', 'A stronger company logo', 'Confidential monitoring by the operator', 'One inspection before construction'],
    correct: 0, explanation: surveyData.independentMonitoring.text,
    hint: 'The hard part is not merely collecting data; it is making the evidence credible.',
    character: 'drippy', surveyValue: surveyData.independentMonitoring.value, source: surveyData.independentMonitoring.source,
  },
  {
    question: 'You have accurate impact data, but the public meeting is tomorrow and almost nobody can interpret it. What do you publish?',
    answers: ['Only the raw spreadsheet', 'A reassuring slogan', 'Nothing until planning is complete', 'A plain-English summary, the raw data and clear limitations'],
    correct: 3, explanation: surveyData.publicInformation.text,
    hint: 'Accessibility and transparency can coexist. Do not choose between them.',
    character: 'byte', surveyValue: surveyData.publicInformation.value, source: surveyData.publicInformation.source,
  },
  {
    question: 'A minister says the survey proves the project is environmentally safe. What is the strongest response?',
    answers: ['Agree; public opinion proves engineering performance', 'Reject all surveys as useless', 'Use attitudes to understand acceptance, then assess impacts with technical evidence', 'Treat the loudest response as a national result'],
    correct: 2,
    explanation: 'Public attitudes and engineering measurements answer different questions. A responsible decision needs both, without pretending one proves the other.',
    hint: 'Separate what people value from what infrastructure physically does.', character: 'byte',
  },
  {
    question: 'The project meets technical rules, but the host community strongly opposes it. What is the most defensible next step?',
    answers: ['Approve immediately because consultation is over', 'Pause, define meaningful consent and renegotiate the proposal', 'Cancel all future infrastructure nationwide', 'Run the same consultation again unchanged'],
    correct: 1, explanation: surveyData.communityConsent.text,
    hint: 'Neither automatic approval nor automatic rejection resolves the legitimacy problem.',
    character: 'drippy', surveyValue: surveyData.communityConsent.value, source: surveyData.communityConsent.source,
  },
  {
    question: 'Ireland needs digital infrastructure, but the proposal has unresolved local costs. Which decision best reflects the survey tension?',
    answers: ['Approve without conditions', 'Reject because benefits can never outweigh costs', 'Approve only with measurable sustainability and community safeguards', 'Delay forever to avoid responsibility'],
    correct: 2, explanation: surveyData.managedBenefits.text,
    hint: 'The survey leaves room for benefits, but not for a blank cheque.',
    character: 'byte', surveyValue: surveyData.managedBenefits.value, source: surveyData.managedBenefits.source,
  },
  {
    question: 'You must brief Cabinet using this 200-response survey. Which claim can you defend under pressure?',
    answers: ['It represents every person in Ireland', 'It calculates national electricity demand', 'It reveals useful patterns among its respondents', 'It identifies the objectively correct policy'],
    correct: 2,
    explanation: 'The survey is evidence about the people who answered it. It can inform a decision, but it cannot speak for every person in Ireland or settle policy by itself.',
    hint: 'The best decision-maker states the boundary of the evidence as clearly as the finding.', character: 'sparky',
  },
]

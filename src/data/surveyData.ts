import type { SurveyFinding, SurveyKey } from '../types/game'

// SINGLE SOURCE OF TRUTH FOR SURVEY CONTENT.
// Percentages are rounded to the nearest whole number and calculated from the
// supplied Social Acceptance of Sustainable Data Centres in Ireland workbook.
export const surveyData: Record<SurveyKey, SurveyFinding> = {
  electricityUseBelief: { value: 54, text: "of respondents answering this question believed data centres account for a significant share of Ireland's electricity use.", isPlaceholder: false, source: 'Form Responses 1 · Y2:Y201 · 102 of 189 valid responses' },
  socialMediaSource: { value: 42, text: 'of all 200 respondents selected social media as one place where they had formed their view of data centres.', isPlaceholder: false, source: 'Form Responses 1 · Q2:Q201 · 83 of 200 responses' },
  renewableRequirement: { value: 44, text: 'of respondents answering this question agreed or strongly agreed that data centres should be legally required to use 100% renewable energy.', isPlaceholder: false, source: 'Form Responses 1 · AF2:AF201 · 80 of 182 valid responses' },
  localBenefits: { value: 42, text: 'of respondents answering this question agreed or strongly agreed that nearby communities should receive direct social or community benefits.', isPlaceholder: false, source: 'Form Responses 1 · AN2:AN201 · 79 of 186 valid responses' },
  independentMonitoring: { value: 45, text: 'of respondents answering this question said independent, publicly reported environmental monitoring would have a large effect or make them fully accepting.', isPlaceholder: false, source: 'Form Responses 1 · CE2:CE201 · 80 of 177 valid responses' },
  publicInformation: { value: 39, text: 'of respondents answering this question agreed or strongly agreed that the Irish public needs much better information about how data centres work.', isPlaceholder: false, source: 'Form Responses 1 · CW2:CW201 · 73 of 186 valid responses' },
  communityConsent: { value: 43, text: 'of respondents answering this question agreed or strongly agreed that community consent should be legally required before approval.', isPlaceholder: false, source: 'Form Responses 1 · CX2:CX201 · 79 of 183 valid responses' },
  managedBenefits: { value: 38, text: 'of respondents answering this question agreed or strongly agreed that benefits can outweigh costs when sustainable data centres are managed well.', isPlaceholder: false, source: 'Form Responses 1 · DA2:DA201 · 70 of 185 valid responses' },
}

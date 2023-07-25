export const CATEGORIES = [
  'UI',
  'UX',
  'enhancement',
  'feature',
  'bug'
] as const

export const STATUS = {
  SUGGESTION: 'suggestion',
  PLANNED: 'planned',
  IN_PROGRESS: 'in-progress',
  LIVE: 'live'
} as const

export const SORT_OPTIONS = {
  MOST_UPVOTES: 'most-upvotes',
  LEAST_UPVOTES: 'least-upvotes',
  MOST_COMMENTS: 'most-comments',
  LEAST_COMMENTS: 'least-comments'
} as const
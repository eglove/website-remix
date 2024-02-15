export type Category =
  | 'courseReview'
  | 'design'
  | 'thinkingAbout'
  | 'workingOn';

export const categories = [
  'workingOn',
  'thinkingAbout',
  'design',
  'courseReview',
] as const;

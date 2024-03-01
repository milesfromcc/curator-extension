export type FeedTag = {
  ftid: string;
  parentGuid: string;
  name: string;
  color: FeedTagBadgeColor;
  description: string;
};

// Update these together
export const feedTagBadgeColors = [
  'black',
  'white',
  'lightgray',
  'darkgray',
  'red',
] as const;
export type FeedTagBadgeColor =
  | 'black'
  | 'white'
  | 'lightgray'
  | 'darkgray'
  | 'red';

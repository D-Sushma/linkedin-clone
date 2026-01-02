export const APP_NAME = 'LinkedIn Clone';

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/network', label: 'My Network', icon: '👥' },
  { href: '/jobs', label: 'Jobs', icon: '💼' },
  { href: '/messages', label: 'Messaging', icon: '💬' },
];

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const;

export const LOCATIONS = [
  'Bangalore, India',
  'Mumbai, India',
  'Delhi, India',
  'Hyderabad, India',
  'Chennai, India',
];

export const POST_ACTIONS = {
  LIKE: 'like',
  COMMENT: 'comment',
  SHARE: 'share',
} as const;


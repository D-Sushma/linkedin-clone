import { User, Post, Job } from '@/types';

// Static Users Data
export const users: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    title: 'Software Engineer at Google',
    location: 'Bangalore, India',
    avatar: '👨‍💻',
    connections: 500,
  },
  {
    id: '2',
    name: 'Priya Patel',
    title: 'Product Manager at Microsoft',
    location: 'Mumbai, India',
    avatar: '👩‍💼',
    connections: 1200,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    title: 'Full Stack Developer',
    location: 'Delhi, India',
    avatar: '👨‍💻',
    connections: 800,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    title: 'UI/UX Designer',
    location: 'Hyderabad, India',
    avatar: '👩‍🎨',
    connections: 650,
  },
];

// Static Posts Data
export const posts: Post[] = [
  {
    id: '1',
    author: users[0],
    content: 'Just completed an amazing project using Next.js and TypeScript! The developer experience is incredible. 🚀',
    likes: 45,
    comments: 12,
    shares: 5,
    timestamp: '2 hours ago',
    liked: false,
  },
  {
    id: '2',
    author: users[1],
    content: 'Excited to announce that our team is hiring! Looking for talented React developers. If you\'re passionate about building great user experiences, reach out! 💼',
    likes: 89,
    comments: 23,
    shares: 15,
    timestamp: '5 hours ago',
    liked: true,
  },
  {
    id: '3',
    author: users[2],
    content: 'Sharing some tips on TypeScript best practices. Always use interfaces for object shapes and types for unions. What are your favorite TypeScript patterns?',
    likes: 67,
    comments: 18,
    shares: 8,
    timestamp: '1 day ago',
    liked: false,
  },
];

// Static Jobs Data
export const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'We are looking for an experienced React developer to join our team. Must have 3+ years of experience with React, TypeScript, and Next.js.',
      postedBy: users[0],
      applicants: 45,
      timestamp: '2 days ago',
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Join our fast-growing startup! Looking for a frontend engineer passionate about building beautiful user interfaces.',
      postedBy: users[1],
      applicants: 78,
      timestamp: '1 week ago',
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Delhi, India',
      type: 'Contract',
      description: 'We need a creative UI/UX designer to work on exciting projects. Portfolio required.',
      postedBy: users[3],
      applicants: 32,
      timestamp: '3 days ago',
    },
  ];
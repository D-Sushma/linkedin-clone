import axios from 'axios';
import { Post } from '@/types';
import { users } from './data';

// DummyJSON API Response Interface
interface DummyPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface DummyPostsResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}

// Transform DummyJSON post to our Post interface
function transformPost(dummyPost: DummyPost): Post {
  // Get a random user or use first user as default
  const randomUser = users[Math.floor(Math.random() * users.length)] || users[0];
  
  // Generate random comments and shares based on likes
  const comments = Math.floor(dummyPost.reactions.likes * 0.3);
  const shares = Math.floor(dummyPost.reactions.likes * 0.1);
  
  // Generate timestamp (random time ago)
  const hoursAgo = Math.floor(Math.random() * 24);
  const timestamp = hoursAgo === 0 ? 'Just now' : hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
  
  return {
    id: dummyPost.id.toString(),
    author: randomUser,
    content: `${dummyPost.title}\n\n${dummyPost.body}`,
    likes: dummyPost.reactions.likes,
    comments: comments,
    shares: shares,
    timestamp: timestamp,
    liked: false,
  };
}

// Fetch posts from DummyJSON API
export async function fetchPostsFromAPI(limit: number = 30): Promise<Post[]> {
  try {
    const response = await axios.get<DummyPostsResponse>(
      `https://dummyjson.com/posts?limit=${limit}`
    );
    
    // Transform DummyJSON posts to our Post format
    const transformedPosts = response.data.posts.map(transformPost);
    
    return transformedPosts;
  } catch (error) {
    console.error('Error fetching posts from API:', error);
    // Return empty array on error
    return [];
  }
}


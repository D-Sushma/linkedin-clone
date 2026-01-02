// 'use client';

// import { useState, useEffect } from 'react';
// import { Post } from '@/types';
// import { posts as initialPosts } from '@/lib/data';

// export function usePosts() {
//   const [posts, setPosts] = useState<Post[]>(initialPosts);
//   const [isLoading, setIsLoading] = useState(false);

//   const addPost = (content: string) => {
//     const newPost: Post = {
//       id: Date.now().toString(),
//       author: initialPosts[0].author, // Current user
//       content,
//       likes: 0,
//       comments: 0,
//       shares: 0,
//       timestamp: 'Just now',
//       liked: false,
//     };
//     setPosts([newPost, ...posts]);
//   };

//   const likePost = (postId: string) => {
//     setPosts(posts.map(post => {
//       if (post.id === postId) {
//         return {
//           ...post,
//           liked: !post.liked,
//           likes: post.liked ? post.likes - 1 : post.likes + 1,
//         };
//       }
//       return post;
//     }));
//   };

//   return {
//     posts,
//     isLoading,
//     addPost,
//     likePost,
//   };
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Post } from '@/types';

// const API_URL = 'http://localhost:5000/api';
const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

// Backend response types
interface BackendAuthor {
  _id: string;
  name: string;
  title?: string;
  location?: string;
  avatar?: string;
  connections?: number;
}

interface BackendLike {
  _id: string;
}

interface BackendPost {
  _id: string;
  author: BackendAuthor;
  content: string;
  image?: string;
  likes?: BackendLike[];
  comments?: unknown[];
  shares?: unknown[];
  createdAt: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('linkedin_token');
    }
    return null;
  };

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await axios.get<{ success: boolean; data: BackendPost[] }>(`${API_URL}/posts`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      // console.log("fetch posts response...", response);
      
      if (response.data.success) {
        // Transform backend post format to frontend format
        const transformedPosts: Post[] = response.data.data.map((post: BackendPost) => ({
          id: post._id,
          author: {
            id: post.author._id,
            name: post.author.name,
            title: post.author.title || '',
            location: post.author.location || '',
            avatar: post.author.avatar || '👤',
            connections: post.author.connections || 0,
          },
          content: post.content,
          image: post.image || undefined,
          likes: post.likes?.length || 0,
          comments: post.comments?.length || 0,
          shares: post.shares?.length || 0,
          timestamp: formatTimestamp(post.createdAt),
          liked: post.likes?.some((like: BackendLike) => like._id === getCurrentUserId()) || false,
        }));
        setPosts(transformedPosts);
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get current user ID from token
  const getCurrentUserId = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('linkedin_token');
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
      } catch {
        return null;
      }
    }
    return null;
  };

  // Format timestamp
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  // Create new post
  const addPost = async (content: string, image?: string) => {
    const token = getToken();
    if (!token) {
      setError('Please login to create a post');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/posts`, { content, image }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("add post response...", response.data);
      if (response.data.success) {
        // // Transform and add to posts
        // const newPost = {
        //   id: response.data.data._id,
        //   author: {
        //     id: response.data.data.author._id,
        //     name: response.data.data.author.name,
        //     title: response.data.data.author.title || '',
        //     location: response.data.data.author.location || '',
        //     avatar: response.data.data.author.avatar || '👤',
        //     connections: response.data.data.author.connections || 0,
        //   },
        //   content: response.data.data.content,
        //   image: response.data.data.image || undefined,
        //   likes: 0,
        //   comments: 0,
        //   shares: 0,
        //   timestamp: 'Just now',
        //   liked: false,
        // };
        // setPosts([newPost, ...posts]);
        // return newPost;
         // Automatically refresh posts list from backend after successful post creation
         await fetchPosts();
         return response.data.data;
      } else {
        setError(response.data.message || 'Failed to create post');
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to create post');
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Like/Unlike post
  const likePost = async (postId: string) => {
    const token = getToken();
    if (!token) {
      setError('Please login to like a post');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/posts/${postId}/like`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        // Update the post in the list
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: response.data.data.likes?.length || 0,
              liked: response.data.data.likes?.some((like: BackendLike) => like._id === getCurrentUserId()) || false,
            };
          }
          return post;
        }));
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to like post');
      console.error('Error liking post:', err);
    }
  };

  // Add comment
  const addComment = async (postId: string, content: string) => {
    const token = getToken();
    if (!token) {
      setError('Please login to comment');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/comments`, { content }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        // Update the post in the list
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: response.data.data.comments?.length || 0,
            };
          }
          return post;
        }));
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to add comment');
      console.error('Error adding comment:', err);
    }
  };

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    addPost,
    likePost,
    addComment,
    fetchPosts,
  };
}
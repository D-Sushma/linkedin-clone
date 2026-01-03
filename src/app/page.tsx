'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import Navbar from '@/components/layout/Navbar';
import HomeSidebar from '@/components/home/HomeSidebar';
import Widgets from '@/components/home/Widgets';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import { fetchPostsFromAPI } from '@/lib/api';
import { usePosts } from '@/hooks/usePosts';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch posts from API
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await fetchPostsFromAPI(5);
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

   // Use separate state from usePosts hook for backend API posts
   const { posts: backendPosts, isLoading: isLoadingBackend, error: backendError } = usePosts();


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab="home" />

      {/* Main Container with max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Sidebar - Profile & Quick Links */}
          {/* <div className="hidden lg:block"> */}
          <div className="w-full lg:w-auto lg:shrink-0">
            <HomeSidebar />
          </div>

          {/* Center Feed - Main Content */}
          <main className="flex-1 min-w-0 order-2 lg:order-0">
            <CreatePost />

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center mt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading posts...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Posts Feed */}
            {!isLoading && !error && (
              <div className="space-y-6 mt-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <p className="text-gray-600">No posts available</p>
                  </div>
                )}
              </div>
            )}
{/* ======================================================== */}
            {/* posts feed fetches from backend api */}
            {/* Posts Feed from Backend API */}
            {isLoadingBackend && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center mt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading posts...</p>
              </div>
            )}

            {/* Error State */}
            {backendError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <p className="text-red-600">{backendError}</p>
              </div>
            )}

            {/* Posts Feed from Backend */}
            {!isLoadingBackend && !backendError && (
              <div className="space-y-6 mt-6">
                {backendPosts.length > 0 ? (
                  backendPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <p className="text-gray-600">No posts available</p>
                  </div>
                )}
              </div>
            )}
            {/* ======================================================== */}
          </main>

          {/* Right Widgets - LinkedIn News */}
          {/* <div className="hidden lg:block"> */}
          <div className="w-full lg:w-auto lg:shrink-0 order-3 lg:order-0">
            <Widgets />
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import Navbar from '@/components/layout/Navbar';
import HomeSidebar from '@/components/home/HomeSidebar';
import Widgets from '@/components/home/Widgets';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import { fetchPostsFromAPI } from '@/lib/api';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  // First feed: DummyJSON API posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Second feed: Backend API posts (usePosts hook)
  const { posts: backendPosts, isLoading: isLoadingBackend, error: backendError, fetchPosts } = usePosts();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch DummyJSON posts on mount
  useEffect(() => {
    if (!isAuthenticated) return; // Don't fetch if not authenticated
    
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
  }, [isAuthenticated]);


  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

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
            <CreatePost onPostCreated={fetchPosts} />

            {/* First Feed: DummyJSON API Posts */}
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

            {/* Posts Feed from DummyJSON API */}
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
            {/* Second Feed: Backend API Posts */}
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
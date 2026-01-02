'use client';

import { useState, useEffect } from 'react';
import Avatar from '../common/Avatar';
import { usePosts } from '@/hooks/usePosts';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { addPost, isLoading } = usePosts();
  const [message, setMessage] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      // Handle post creation
      console.log('Creating post:', content);
      await addPost(content, image || undefined);
      setContent('');
      setImage('');
      setMessage('Post created successfully');
    }
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <Avatar size="md" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            disabled={isLoading}
          />
          {message && (
            <div className="mt-2">
              <p className="text-green-600">{message}</p>
            </div>
          )}
          {/* {image && (
            <div className="mt-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )} */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-gray-600">
              <button type="button" className="hover:text-blue-600">
                📷 Photo
              </button>
              <button type="button" className="hover:text-blue-600">
                🎥 Video
              </button>
              <button type="button" className="hover:text-blue-600">
                📄 Document
              </button>
            </div>
            <button
              type="submit"
              // disabled={!content.trim()}
              disabled={!content.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Post */}
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


'use client';

import { Post } from '@/types';
import { useState } from 'react';

interface PostActionsProps {
  post: Post;
}

export default function PostActions({ post }: PostActionsProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            liked
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span>{liked ? '👍' : '👍'}</span>
          <span>{likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <span>💬</span>
          <span>{post.comments} comments</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          <span>↗️</span>
          <span>{post.shares} shares</span>
        </button>
      </div>
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <CommentSection postId={post.id} />
        </div>
      )}
    </>
  );
}

function CommentSection({ postId }: { postId: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
          👤
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">John Doe</p>
            <p className="text-sm text-gray-700">Great post! Thanks for sharing.</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-3">2 hours ago</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm">
          Post
        </button>
      </div>
    </div>
  );
}


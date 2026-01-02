import { Post } from '@/types';
import PostActions from './PostActions';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl cursor-pointer hover:ring-2 hover:ring-blue-500">
          {post.author.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {post.author.name}
          </h3>
          <p className="text-sm text-gray-600">{post.author.title}</p>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

      {/* Post Image (if exists) */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={post.image} alt="Post" className="w-full h-auto" />
        </div>
      )}

      {/* Post Actions */}
      <PostActions post={post} />
    </div>
  );
}


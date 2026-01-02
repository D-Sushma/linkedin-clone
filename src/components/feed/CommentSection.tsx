import { Comment } from '@/types';
import Avatar from '../common/Avatar';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export default function CommentSection({ comments, postId }: CommentSectionProps) {
  return (
    <div className="space-y-3 mt-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar size="sm" />
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {comment.author.name}
                </p>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-3">{comment.timestamp}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
      )}
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


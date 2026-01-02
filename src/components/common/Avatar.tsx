import { User } from '@/types';

interface AvatarProps {
  user?: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ user, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  const defaultAvatar = '👤';

  return (
    <div
      className={`${sizes[size]} bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 ${className}`}
    >
      {user?.avatar || defaultAvatar}
    </div>
  );
}


'use client';
import { User } from '@/types';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const storedUser = JSON.parse(localStorage.getItem('linkedin_user'));
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg"></div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6 -mt-16">
        <div className="flex items-end gap-4 mb-4">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center text-5xl">
            {user.avatar}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{storedUser?.name || user.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{user.title}</p>
        <p className="text-sm text-gray-500 mb-4">
          {user.location} • {user.connections} connections
        </p>
        <div className="flex gap-3">
          {isOwnProfile ? (
            <>
              <Button variant="primary">Open to</Button>
              <Button variant="outline">Add section</Button>
              <Button variant="outline">More</Button>
            </>
          ) : (
            <>
              <Button variant="primary">Connect</Button>
              <Button variant="outline">Message</Button>
              <Button variant="outline">More</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


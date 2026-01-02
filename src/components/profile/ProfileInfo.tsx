import { User } from '@/types';

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-medium">Location:</span> {user.location}</p>
        <p><span className="font-medium">Connections:</span> {user.connections}</p>
      </div>
    </div>
  );
}


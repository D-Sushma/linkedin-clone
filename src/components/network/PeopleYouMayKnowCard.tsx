import { User } from '@/types';
import Button from '../common/Button';
import { HiUser } from 'react-icons/hi';

interface PeopleYouMayKnowCardProps {
  user: User;
  onConnect: () => void;
}

export default function PeopleYouMayKnowCard({ user, onConnect }: PeopleYouMayKnowCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Banner Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-16"></div>
      
      {/* Profile Picture and Info */}
      <div className="px-4 pb-4 -mt-8">
        {/* Profile Picture - With Icon */}
        <div className="w-20 h-20 bg-white rounded-full border-4 border-white flex items-center justify-center mb-3 mx-auto">
          <div className="w-full h-full rounded-full border-2 border-gray-300 bg-gray-50 flex items-center justify-center">
            <HiUser className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        
        {/* User Info */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{user.title}</p>
          <p className="text-xs text-gray-500 mb-2">{user.location}</p>
          <div className="text-xs text-gray-500 mb-4">
            <span>{user.connections} connections</span>
          </div>
          
          {/* Connect Button with Blue Border */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onConnect} 
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
}


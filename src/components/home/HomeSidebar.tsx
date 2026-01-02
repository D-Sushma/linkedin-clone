import Link from 'next/link';
import { users } from '@/lib/data';
import { HiBookmark, HiUserGroup, HiNewspaper, HiCalendar } from 'react-icons/hi';

export default function HomeSidebar() {
  const currentUser = users[0]; // Static current user
  
  // Split name into first and last name
  const nameParts = currentUser.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <aside className="w-64 space-y-4 sticky top-20 h-fit">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Profile Picture */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-16"></div>
        <div className="px-4 pb-4 -mt-8">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center text-3xl mb-3">
            {currentUser.avatar}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{firstName} {lastName}</h3>
          <p className="text-xs text-gray-600 mb-2">{currentUser.title}</p>
          <p className="text-xs text-gray-500">{currentUser.location}</p>
        </div>
      </div>

      {/* Profile Viewers Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Profile viewers</span>
          <span className="text-xs font-semibold text-blue-600">59</span>
        </div>
        <Link href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
          View all analytics
        </Link>
      </div>

      {/* Quick Links Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-3">
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiBookmark className="w-5 h-5" />
            <span>Saved items</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiUserGroup className="w-5 h-5" />
            <span>Groups</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiNewspaper className="w-5 h-5" />
            <span>Newsletters</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiCalendar className="w-5 h-5" />
            <span>Events</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}


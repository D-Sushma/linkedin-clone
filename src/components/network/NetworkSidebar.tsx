import Link from 'next/link';
import { HiUserGroup, HiUsers, HiUserAdd, HiCalendar, HiNewspaper, HiCollection } from 'react-icons/hi';

export default function NetworkSidebar() {
  return (
    <aside className="w-64 space-y-4 sticky top-20 h-fit">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Manage my network</h3>
        
        {/* Divider */}
        <div className="border-b border-gray-200 mb-4"></div>
        
        <div className="space-y-5">
          <Link href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 group">
            <div className="flex items-center gap-2">
              <HiUsers className="w-5 h-5" />
              <span>Connections</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600">643</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiUserAdd className="w-5 h-5" />
            <span>Following & Followers</span>
          </Link>
          
          <Link href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 group">
            <div className="flex items-center gap-2">
              <HiUserGroup className="w-5 h-5" />
              <span>Groups</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600">3</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiCalendar className="w-5 h-5" />
            <span>Events</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiCollection className="w-5 h-5" />
            <span>Pages</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
            <HiNewspaper className="w-5 h-5" />
            <span>Newsletters</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}


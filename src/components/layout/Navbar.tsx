'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HiHome, 
  HiUsers, 
  HiBriefcase, 
  HiChat, 
  HiBell, 
  HiUserCircle,
  HiSearch,
  HiCheckCircle,
  HiLogout,
  HiChevronDown
} from 'react-icons/hi';
import { FaLinkedin } from "react-icons/fa";
import { users } from '@/lib/data';
import Button from '../common/Button';

interface NavbarProps {
  activeTab?: 'home' | 'network' | 'jobs' | 'messages';
}

export default function Navbar({ activeTab = 'home' }: NavbarProps) {
  const router = useRouter();
  const [showMeDropdown, setShowMeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentUser = users[0];
  
  const handleSignOut = () => {
    // Clear authentication
    if (typeof window !== 'undefined') {
      localStorage.removeItem('linkedin_user');
      localStorage.removeItem('linkedin_authenticated');
    }
    // Redirect to login page
    router.push('/login');
  };
  
  // Split name into first and last name
  const nameParts = currentUser.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // const storedUser = JSON.parse(localStorage.getItem('linkedin_user'));
  // Use lazy initializer to safely access localStorage
  const [storedUser] = useState<{ name?: string; [key: string]: unknown } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('linkedin_user');
        if (userData) {
          return JSON.parse(userData);
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }
    return null;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: HiHome, key: 'home' as const },
    { href: '/network', label: 'My Network', icon: HiUsers, key: 'network' as const },
    { href: '/jobs', label: 'Jobs', icon: HiBriefcase, key: 'jobs' as const },
    { href: '/messages', label: 'Messaging', icon: HiChat, key: 'messages' as const },
    { href: '#', label: 'Notifications', icon: HiBell, key: 'notifications' as const },
    { href: '/profile', label: 'Me', icon: HiUserCircle, key: 'me' as const },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className='flex items-center gap-2'>

          {/* LinkedIn Logo */}
          <Link href="/" className="flex items-center gap-2 py-2">
            <FaLinkedin className='text-2xl text-blue-600 w-9 h-9'/>
            {/* <span className="hidden sm:block text-xl font-semibold text-gray-900">LinkedIn</span> */}
          </Link>

          {/* Search Box */}
          <div className="hidden-none md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
              />
            </div>
          </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-wrap items-center lg:gap-2 flex-1 md:flex-none md:justify-end ">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              const IconComponent = item.icon;
              
              // Handle "Me" dropdown separately
              if (item.key === 'me') {
                return (
                  <div key={item.key} className="relative" ref={dropdownRef}>
                     <button
                       onClick={() => setShowMeDropdown(!showMeDropdown)}
                       className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[60px] ${
                         showMeDropdown
                           ? 'text-blue-600'
                           : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                       }`}
                     >
                       <IconComponent className="w-6 h-6" />
                       <div className="flex items-center gap-1">
                         <span className={`text-xs ${showMeDropdown ? 'font-semibold' : 'font-normal'}`}>
                           {item.label}
                         </span>
                         <HiChevronDown className={`w-3 h-3 transition-transform ${showMeDropdown ? 'rotate-180' : ''}`} />
                       </div>
                     </button>

                    {/* Dropdown Menu */}
                    {showMeDropdown && (
                      <div className="absolute left-3/3 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] md:w-80 max-w-[320px] md:max-w-none bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto">
                        {/* Profile Section */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                              {currentUser.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm">{storedUser?.name || `${firstName} ${lastName}`}</h3>
                              <p className="text-xs text-gray-600 mt-1">{currentUser.title}</p>
                            </div>
                          </div>
                           <div className="flex gap-2">
                            <Link href="/profile" className="flex-1">
                             <Button variant="outline" size="sm" className="flex-1 py-1 text-xs cursor-pointer">
                               View profile
                             </Button>
                            </Link>
                             <Button variant="primary" size="sm" className="flex-1 py-1 text-xs flex items-center justify-center gap-1">
                               <HiCheckCircle className="w-3 h-3" />
                               <span>Verify</span>
                             </Button>
                           </div>
                        </div>

                        {/* Account Section */}
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-900 mb-2">Account</h4>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Settings & Privacy
                          </Link>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Help
                          </Link>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Language
                          </Link>
                        </div>

                        {/* Manage Section */}
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-900 mb-2">Manage</h4>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Posts & Activity
                          </Link>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Job Posting Account
                          </Link>
                          <Link href="#" className="block text-sm text-gray-700 hover:text-blue-600 py-1">
                            Account
                          </Link>
                        </div>

                        {/* Sign Out */}
                        <div className="p-4">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 w-full text-left"
                          >
                            <HiLogout className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Regular navigation items
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[60px] ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}


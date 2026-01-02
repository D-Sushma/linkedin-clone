import Navbar from '@/components/layout/Navbar';
import { HiSearch, HiDotsHorizontal } from 'react-icons/hi';
import { FaEdit } from "react-icons/fa";

export default function MessagesPage() {
  const conversations = [
    { id: '1', name: 'Priya Patel', lastMessage: 'Hey, how are you?', timestamp: '2h ago', avatar: '👩‍💼' },
    { id: '2', name: 'Amit Kumar', lastMessage: 'Thanks for the help!', timestamp: '1d ago', avatar: '👨‍💻' },
    { id: '3', name: 'Sneha Reddy', lastMessage: 'Let\'s connect!', timestamp: '2d ago', avatar: '👩‍🎨' },
    { id: '4', name: 'Rahul Sharma', lastMessage: 'Great work!', timestamp: '3d ago', avatar: '👨‍💻' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab="messages" />
      
      {/* Main Container with max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Messages Card - Split Layout */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              
              {/* Search Bar and Icons Row */}
              <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-md font-semibold text-gray-900">Messaging</h1>
                <div className="flex-1 relative">
                  <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className=" pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <HiDotsHorizontal className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
              
              {/* Border Bottom */}
              <div className="border-b border-gray-200 -mx-4 mb-4"></div>
              
              {/* Messages Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{conversations.length} messages</span>
              </div>
            </div>

            {/* Split Content: Messages List and Chat Area */}
            <div className="flex">
              {/* Left Side - Conversations List */}
              <div className="flex-1 border-r border-gray-200">
                <div className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                          {conversation.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Chat Area (in same card) */}
              <div className="hidden md:flex flex-1 items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-gray-600 text-lg mb-2">Select a conversation</p>
                  <p className="text-gray-500 text-sm">or start a new message</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image and Links */}
          <div className="hidden lg:block w-80 space-y-4">
            {/* Image */}
            <div className="bg-white rounded-lg border border-gray-200 p-2">
              <img
                src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
                alt="LinkedIn Ad"
                className="w-full h-auto cursor-pointer rounded"
                style={{ height: 300, width: 300 }}
              />
            </div>

            {/* Links Section - Without Background */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center   flex-wrap gap-x-4 gap-y-2">
                <h1 className="text-xs font-light text-gray-500">About</h1>
                <h1 className="text-xs font-light text-gray-500">Accessibility</h1>
                <h1 className="text-xs font-light text-gray-500">Help center</h1>
                <h1 className="text-xs font-light text-gray-500">Privacy & Terms</h1>
                <h1 className="text-xs font-light text-gray-500">Ad Choices</h1>
                <h1 className="text-xs font-light text-gray-500">Advertising</h1>
                <h1 className="text-xs font-light text-gray-500">Business Services</h1>
                <h1 className="text-xs font-light text-gray-500">Get the LinkedIn app</h1>
                <h1 className="text-xs font-light text-gray-500">More</h1>
              </div>
              
              {/* Copyright */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs">
                  <span className="text-blue-600 font-bold text-sm">LinkedIn</span>
                  <span className="text-gray-900"> Corporation © 2026</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


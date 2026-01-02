'use client';

import Link from 'next/link';
import { users } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import NetworkSidebar from '@/components/network/NetworkSidebar';
import InvitationCard from '@/components/network/InvitationCard';
import PeopleYouMayKnowCard from '@/components/network/PeopleYouMayKnowCard';

export default function NetworkPage() {
  // Mock invitations
  const invitations = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Software Engineer at Tech Corp',
      location: 'Pune, India',
      avatar: '👤',
      connections: 300,
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Product Manager',
      location: 'Mumbai, India',
      avatar: '👩‍💼',
      connections: 450,
    },
  ];

  // Mock people you may know
  const peopleYouMayKnow = [
    {
      id: '1',
      name: 'Alex Johnson',
      title: 'Content Writer',
      location: 'Bangalore, India',
      avatar: '👨‍💻',
      connections: 200,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      title: 'Digital Marketing Specialist',
      location: 'Delhi, India',
      avatar: '👩‍💼',
      connections: 350,
    },
    {
      id: '3',
      name: 'Mike Brown',
      title: 'SEO Expert',
      location: 'Hyderabad, India',
      avatar: '👨‍💻',
      connections: 280,
    },
    {
      id: '4',
      name: 'John Doe',
      title: 'SEO Expert',
      location: 'Hyderabad, India',
      avatar: '👨‍💻',
      connections: 280,
    },
  ];

  const handleAccept = (id: string) => {
    console.log('Connection accepted:', id);
  };

  const handleIgnore = (id: string) => {
    console.log('Connection ignored:', id);
  };

  const handleConnect = (id: string) => {
    console.log('Connect clicked:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab="network" />
      
      {/* Main Container with max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Left Sidebar - Manage my network */}
          <div className="hidden lg:block">
            <NetworkSidebar />
          </div>

          {/* Main Network Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Network</h1>
              <p className="text-gray-600">{users[0].connections} connections</p>
            </div>

            {/* Invitations Section */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Invitations</h2>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Show all
                </Link>
              </div>
              <div>
                {invitations.map((invitation) => (
                  <InvitationCard
                    key={invitation.id}
                    user={invitation}
                    onAccept={() => handleAccept(invitation.id)}
                    onIgnore={() => handleIgnore(invitation.id)}
                  />
                ))}
              </div>
            </div>

            {/* People You May Know Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  People in the Internet Publishing industry you may know
                </h2>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Show all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {peopleYouMayKnow.map((person) => (
                  <PeopleYouMayKnowCard
                    key={person.id}
                    user={person}
                    onConnect={() => handleConnect(person.id)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
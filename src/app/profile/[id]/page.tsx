import { users } from '@/lib/data';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AboutSection from '@/components/profile/AboutSection';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Navbar from '@/components/layout/Navbar';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = users.find(u => u.id === params.id) || users[0];
  const isOwnProfile = params.id === '1'; // Assuming user 1 is current user

  const aboutText = `Passionate ${user.title.toLowerCase()} with expertise in modern web technologies. 
Love building scalable applications and sharing knowledge with the developer community. 
Always open to new opportunities and collaborations.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
        <AboutSection about={aboutText} isOwnProfile={isOwnProfile} />
        <ProfileInfo user={user} />

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              💼
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user.title}</h3>
              <p className="text-gray-600">{user.title.split(' at ')[1] || 'Company'}</p>
              <p className="text-sm text-gray-500">Jan 2022 - Present • 2 yrs</p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Bachelor of Technology</h3>
              <p className="text-gray-600">Computer Science Engineering</p>
              <p className="text-sm text-gray-500">2018 - 2022</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


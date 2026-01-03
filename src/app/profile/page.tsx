import { users } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AboutSection from '@/components/profile/AboutSection';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ExperienceCard from '@/components/profile/ExperienceCard';
import EducationCard from '@/components/profile/EducationCard';

export default function ProfilePage() {
  const currentUser = users[0]; // Static current user
  const aboutText = `Passionate software engineer with expertise in React, Next.js, and TypeScript. 
Love building scalable web applications and sharing knowledge with the developer community.`;

  const experience = {
    id: '1',
    title: 'Software Engineer',
    company: 'Google',
    type: 'Full-time' as const,
    startDate: 'Jan 2022',
    current: true,
    description: 'Building scalable web applications using React and Next.js.',
  };

  const education = {
    id: '1',
    school: 'University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science Engineering',
    startDate: '2018',
    endDate: '2022',
    current: false,
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader user={currentUser}  isOwnProfile={true} />
        <AboutSection about={aboutText} isOwnProfile={true} />
        <ProfileInfo user={currentUser} />

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          <ExperienceCard experience={experience} isOwnProfile={true} />
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          <EducationCard education={education} isOwnProfile={true} />
        </div>
      </main>
    </div>
  );
}
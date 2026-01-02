interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  isOwnProfile?: boolean;
}

export default function ExperienceCard({ experience, isOwnProfile = false }: ExperienceCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
        💼
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{experience.title}</h3>
            <p className="text-gray-600">{experience.company}</p>
            <p className="text-sm text-gray-500">
              {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
              {experience.location && ` • ${experience.location}`}
            </p>
            {experience.description && (
              <p className="text-gray-700 mt-2">{experience.description}</p>
            )}
          </div>
          {isOwnProfile && (
            <button className="text-gray-400 hover:text-gray-600">
              ✏️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


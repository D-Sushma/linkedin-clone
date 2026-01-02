interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

interface EducationCardProps {
  education: Education;
  isOwnProfile?: boolean;
}

export default function EducationCard({ education, isOwnProfile = false }: EducationCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
        🎓
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{education.degree}</h3>
            {education.field && <p className="text-gray-600">{education.field}</p>}
            <p className="text-gray-600">{education.school}</p>
            <p className="text-sm text-gray-500">
              {education.startDate} - {education.current ? 'Present' : education.endDate}
            </p>
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


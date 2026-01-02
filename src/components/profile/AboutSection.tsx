interface AboutSectionProps {
  about: string;
  isOwnProfile?: boolean;
}

export default function AboutSection({ about, isOwnProfile = false }: AboutSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">About</h2>
        {isOwnProfile && (
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{about}</p>
    </div>
  );
}


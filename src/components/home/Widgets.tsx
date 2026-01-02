import Link from 'next/link';
import { HiTrendingUp, HiNewspaper } from 'react-icons/hi';

export default function Widgets() {
  const newsItems = [
    {
      id: '1',
      category: 'Technology',
      title: 'AI Revolution in Software Development',
      time: '2h ago',
    },
    {
      id: '2',
      category: 'Business',
      title: 'Remote Work Trends 2024',
      time: '4h ago',
    },
    {
      id: '3',
      category: 'Tech',
      title: 'Next.js 16 New Features',
      time: '6h ago',
    },
    {
      id: '4',
      category: 'Career',
      title: 'Top Skills in Demand',
      time: '1d ago',
    },
  ];

  return (
    <aside className="w-64 space-y-4 sticky top-20 h-fit">
      {/* LinkedIn News Widget */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <HiTrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 text-sm">LinkedIn News</h3>
        </div>
        <ul className="space-y-3">
          {newsItems.map((item, index) => (
            <li key={item.id}>
              <Link href="#" className="block group">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-400 mt-1">•</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="#" className="block mt-4 text-xs text-gray-600 hover:text-blue-600 font-medium">
          Show more
        </Link>
      </div>

      {/* Additional Widget */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <HiNewspaper className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 text-sm">Today's Top Reads</h3>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Stay updated with the latest industry insights and trends.
        </p>
        <Link href="#" className="text-xs text-blue-600 hover:underline font-medium">
          Discover more
        </Link>
      </div>
    </aside>
  );
}


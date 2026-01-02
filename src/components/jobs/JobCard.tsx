import { Job } from '@/types';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
            {job.title}
          </h3>
          <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
          <div className="flex items-center gap-4 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {job.type}
            </span>
            <span className="text-sm text-gray-500">{job.applicants} applicants</span>
            <span className="text-sm text-gray-500">• {job.timestamp}</span>
          </div>
          <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Avatar user={job.postedBy} size="sm" />
            <span>Posted by {job.postedBy.name}</span>
          </div>
        </div>
        <div className="ml-4">
          <Button variant="primary">Apply</Button>
        </div>
      </div>
    </div>
  );
}


'use client';

import { jobs } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import HomeSidebar from '@/components/home/HomeSidebar';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';

export default function JobsPage() {
  const handleFilterChange = (filters: { location: string; type: string; search: string }) => {
    // Handle filter changes
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab="jobs" />
      
      {/* Main Container with max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Left Sidebar - Home Sidebar */}
          <div className="hidden lg:block">
            <HomeSidebar />
          </div>

          {/* Main Jobs Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
              <p className="text-gray-600">Discover your next opportunity</p>
            </div>

            <JobFilters onFilterChange={handleFilterChange} />

            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { useHub } from '../context/HubContext';
import { ClubCard } from '../components/ClubCard';
import { Search, X, Filter, Users } from 'lucide-react';

export const Clubs: React.FC = () => {
  const { clubs } = useHub();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Arts & Media', 'Entrepreneurship'];

  // Filtered clubs logic
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      // Category match
      const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = club.name.toLowerCase().includes(query);
      const matchesDesc = club.description.toLowerCase().includes(query) || club.shortDescription.toLowerCase().includes(query);
      const matchesTags = club.tags.some(t => t.toLowerCase().includes(query));
      const matchesCoord = club.facultyCoordinator.name.toLowerCase().includes(query) || club.studentCoordinator.name.toLowerCase().includes(query);

      return matchesCategory && (matchesName || matchesDesc || matchesTags || matchesCoord);
    });
  }, [clubs, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Users className="w-3.5 h-3.5" />
          <span>Student Activity Directory</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          College Clubs Directory
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Explore all official student clubs, meet faculty and student leads, and discover communities tailored to your skills and aspirations.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by club name, tag, or coordinator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredClubs.length}</strong> of {clubs.length} clubs
          {hasActiveFilters && ` (filtered)`}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Reset to all
          </button>
        )}
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No clubs found</h3>
          <p className="text-xs text-slate-600">
            We couldn't find any club matching your search "{searchQuery}" in category "{selectedCategory}". Try modifying your search or clearing filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useHub } from '../context/HubContext';
import { EventCard } from '../components/EventCard';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import type { ClubEvent } from '../types/hub';
import { Search, X, Calendar } from 'lucide-react';

export const Events: React.FC = () => {
  const { events, clubs, eventRegistrations } = useHub();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClubId, setSelectedClubId] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusTab, setStatusTab] = useState<'All' | 'Upcoming' | 'Completed'>('Upcoming');

  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Hackathon', 'Competition', 'Workshop', 'Cultural', 'Sports', 'Contest', 'Entrepreneurship'];

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Status tab
      if (statusTab !== 'All' && evt.status !== statusTab) {
        return false;
      }

      // Club filter
      if (selectedClubId !== 'All' && evt.clubId !== selectedClubId) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && evt.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      const matchesName = evt.name.toLowerCase().includes(query);
      const matchesClub = evt.clubName.toLowerCase().includes(query);
      const matchesDesc = evt.description.toLowerCase().includes(query);
      const matchesVenue = evt.venue.toLowerCase().includes(query);

      return matchesName || matchesClub || matchesDesc || matchesVenue;
    });
  }, [events, statusTab, selectedClubId, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedClubId !== 'All' || selectedCategory !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedClubId('All');
    setSelectedCategory('All');
  };

  const handleRegister = (event: ClubEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Calendar className="w-3.5 h-3.5" />
          <span>Campus Events & Competitions</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          College Events & Hackathons
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Find hackathons, robotics tournaments, guest workshops, and cultural fests. Register with one click using your student credentials.
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        {/* Status Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          {(['Upcoming', 'All', 'Completed'] as const).map((tab) => {
            const isActive = statusTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab === 'Upcoming' ? 'Upcoming Events' : tab === 'Completed' ? 'Past Events' : 'All Events'}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event, club, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
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

          {/* Filter by Club */}
          <div>
            <select
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="All">All Organizing Clubs</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Category */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Event Categories' : cat}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors shrink-0 cursor-pointer"
                title="Clear filters"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredEvents.length}</strong> event{filteredEvents.length !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isRegistered = eventRegistrations.some(r => r.eventId === event.id);
            return (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                isRegistered={isRegistered}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No events matched</h3>
          <p className="text-xs text-slate-600">
            No events found for your selected filters and search query. Try adjusting your filter parameters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};

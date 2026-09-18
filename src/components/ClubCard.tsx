import React from 'react';
import { Link } from 'react-router-dom';
import type { Club } from '../types/hub';
import { ClubIcon } from './ClubIcon';
import { Users, ArrowRight } from 'lucide-react';

interface ClubCardProps {
  club: Club;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cultural':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Sports':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Arts & Media':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Entrepreneurship':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Header & Icon */}
      <div className="p-6 pb-4 flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-13 h-13 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors duration-200 shrink-0">
            <ClubIcon name={club.logoIcon} className="w-7 h-7" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(club.category)}`}>
            {club.category}
          </span>
        </div>

        {/* Club Name & Short Description */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          <Link to={`/clubs/${club.id}`} className="focus:outline-none">
            {club.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {club.shortDescription}
        </p>

        {/* Coordinators Section */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-600">
            <span className="font-semibold text-slate-900 shrink-0">Faculty Coord:</span>
            <span className="truncate" title={`${club.facultyCoordinator.name} (${club.facultyCoordinator.department})`}>
              {club.facultyCoordinator.name}
            </span>
          </div>
          <div className="flex items-start gap-2 text-slate-600">
            <span className="font-semibold text-slate-900 shrink-0">Student Coord:</span>
            <span className="truncate" title={`${club.studentCoordinator.name} (${club.studentCoordinator.branch}, ${club.studentCoordinator.year})`}>
              {club.studentCoordinator.name}
            </span>
          </div>
        </div>

        {/* Member Count & Upcoming badge */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span><strong className="text-slate-900">{club.members}</strong> members</span>
          </div>
          {club.upcomingEvents.length > 0 && (
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium text-[11px]">
              {club.upcomingEvents.length} event{club.upcomingEvents.length > 1 ? 's' : ''} planned
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/clubs/${club.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl transition-colors shadow-xs"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/join?club=${club.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <span>Join Club</span>
        </Link>
      </div>
    </div>
  );
};

import React from 'react';
import type { ClubEvent } from '../types/hub';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: ClubEvent;
  onRegister: (event: ClubEvent) => void;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister, isRegistered = false }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Ongoing':
        return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
      case 'Completed':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const isClosed = event.status === 'Completed';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Visual Header Banner */}
      <div className={`h-3 bg-gradient-to-r ${event.bannerGradient || 'from-blue-600 to-indigo-700'}`} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link
            to={`/clubs/${event.clubId}`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate"
          >
            {event.clubName}
          </Link>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(event.status)}`}>
            {event.status}
          </span>
        </div>

        {/* Event Name */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Date, Time & Venue */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span><strong className="text-slate-800">Date:</strong> {event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span><strong className="text-slate-800">Time:</strong> {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate"><strong className="text-slate-800">Venue:</strong> {event.venue}</span>
          </div>
        </div>

        {/* Attendee Count & Register Button */}
        <div className="mt-5 pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>{event.registrationCount}</strong> registered</span>
          </div>

          {isRegistered ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              Registered
            </span>
          ) : isClosed ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 font-medium text-xs">
              Concluded
            </span>
          ) : (
            <button
              onClick={() => onRegister(event)}
              type="button"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer hover:shadow-sm"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

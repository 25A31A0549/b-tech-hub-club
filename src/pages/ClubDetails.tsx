import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHub } from '../context/HubContext';
import { ClubIcon } from '../components/ClubIcon';
import { EventCard } from '../components/EventCard';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import type { ClubEvent } from '../types/hub';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  UserPlus, 
  Target,
  Activity,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const ClubDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getClubById, getEventsForClub, eventRegistrations } = useHub();

  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const club = id ? getClubById(id) : undefined;
  const clubEvents = club ? getEventsForClub(club.id) : [];

  const handleRegister = (event: ClubEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // If club not found
  if (!club) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Club Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested club "{id}" could not be located in our campus club directory.
        </p>
        <div className="pt-2">
          <Link
            to="/clubs"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Clubs</span>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Navigation Bar */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Club Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shrink-0">
              <ClubIcon name={club.logoIcon} className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(club.category)}`}>
                  {club.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Est. {club.establishedYear}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {club.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pt-1">
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <strong>{club.members}</strong> Enrolled Members
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  {club.meetingSchedule}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {club.roomVenue}
                </span>
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="pt-4 lg:pt-0 shrink-0">
            <Link
              to={`/join?club=${club.id}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>Join Club</span>
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-1.5">
          {club.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Description & Objectives / Coordinators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Objectives, Activities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>About the Club</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {club.description}
            </p>
          </div>

          {/* Objectives Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Core Objectives</span>
            </h2>
            <ul className="space-y-3">
              {club.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>Regular Activities & Workshops</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {club.activities.map((act, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  {act}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Leadership / Coordinators Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Club Coordinators</span>
            </h2>

            {/* Faculty Coordinator */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                Faculty Coordinator
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {club.facultyCoordinator.name}
              </h3>
              <p className="text-xs text-slate-600">
                {club.facultyCoordinator.designation}
              </p>
              <p className="text-xs text-slate-500">
                Department of {club.facultyCoordinator.department}
              </p>
              <div className="pt-1 text-xs">
                <a
                  href={`mailto:${club.facultyCoordinator.email}`}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{club.facultyCoordinator.email}</span>
                </a>
              </div>
            </div>

            {/* Student Coordinator */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                Student Coordinator
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {club.studentCoordinator.name}
              </h3>
              <p className="text-xs text-slate-600">
                {club.studentCoordinator.branch} • {club.studentCoordinator.year}
              </p>
              <div className="pt-1 space-y-1 text-xs">
                <div>
                  <a
                    href={`tel:${club.studentCoordinator.phone}`}
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{club.studentCoordinator.phone}</span>
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${club.studentCoordinator.email}`}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{club.studentCoordinator.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Join CTA In Sidebar */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                to={`/join?club=${club.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs cursor-pointer"
              >
                <span>Apply for Membership</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events for This Club */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Events by {club.name}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Check out current and upcoming hackathons, contests, and sessions organized by this club.
            </p>
          </div>
          <Link
            to="/events"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View all campus events
          </Link>
        </div>

        {clubEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubEvents.map((event) => {
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
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-500 text-sm">
            No upcoming events currently scheduled for {club.name}. Check back soon or contact the coordinators!
          </div>
        )}
      </section>

      {/* Registration Modal */}
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

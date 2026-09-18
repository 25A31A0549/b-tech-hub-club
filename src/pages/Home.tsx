import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHub } from '../context/HubContext';
import { StatCard } from '../components/StatCard';
import { ClubCard } from '../components/ClubCard';
import { EventCard } from '../components/EventCard';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import type { ClubEvent } from '../types/hub';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Zap, 
  UserCheck, 
  Award, 
  Briefcase
} from 'lucide-react';

export const Home: React.FC = () => {
  const { clubs, events, stats, eventRegistrations } = useHub();
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Featured clubs (top 3 by member count or prominent ones)
  const featuredClubs = clubs.slice(0, 3);

  // Upcoming events
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 3);

  const handleRegister = (event: ClubEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Campus Student Organizations • B.Tech Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Explore Your College Clubs
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Discover passionate student communities, hone technical and creative skills, participate in hackathons and cultural fests, and build lifelong friendships throughout your engineering journey.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/clubs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Explore Clubs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur transition-all cursor-pointer"
            >
              <span>View Events</span>
              <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Total Clubs"
            value={stats.totalClubs}
            icon={Users}
            color="blue"
            subtext="Active student societies"
          />
          <StatCard
            label="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
            color="indigo"
            subtext="Hackathons, fests & workshops"
          />
          <StatCard
            label="Total Members"
            value={stats.totalMembers}
            icon={UserCheck}
            color="emerald"
            subtext="Enrolled B.Tech students"
          />
          <StatCard
            label="Upcoming Events"
            value={stats.upcomingEventsCount}
            icon={Trophy}
            color="amber"
            subtext="Scheduled this semester"
          />
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Spotlight
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Clubs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Check out some of our most active student communities this semester.
            </p>
          </div>
          <Link
            to="/clubs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Browse All {clubs.length} Clubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Campus Agenda
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Upcoming Events
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Mark your calendar and register for upcoming competitions, fests, and workshops.
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>See All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => {
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
      </section>

      {/* Why Join a Club Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-indigo-900/50">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Student Growth & Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Join a Club?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              College is more than lectures and exams. Discover how getting involved in campus clubs elevates your engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Develop skills */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Develop Skills
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gain hands-on coding, hardware fabrication, leadership, and public speaking experience beyond regular classroom theory.
              </p>
            </div>

            {/* Pillar 2: Meet students */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Meet Students
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Collaborate with peers from all engineering branches and years. Form hackathon teams and build lifelong friendships.
              </p>
            </div>

            {/* Pillar 3: Participate in events */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Participate in Events
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compete in national hackathons, cultural battles, robotics arenas, and sports tournaments with full institutional support.
              </p>
            </div>

            {/* Pillar 4: Build experience */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Build Experience
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Add real leadership roles, coordinator achievements, and technical project portfolios to strengthen your placement resume.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-300">
              Ready to find your community? Applications are currently open across all clubs!
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-sm cursor-pointer shrink-0 text-sm"
            >
              <span>Apply for Club Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
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

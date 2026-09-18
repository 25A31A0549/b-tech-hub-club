import React, { useState } from 'react';
import { useHub } from '../context/HubContext';
import { StatCard } from '../components/StatCard';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Trophy, 
  BarChart3, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Clock3, 
  UserPlus,
  Shield
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { clubs, events, stats, membershipRequests } = useHub();
  const [chartView, setChartView] = useState<'category' | 'club'>('category');

  // Category distribution
  const categoryDistribution = clubs.reduce((acc, club) => {
    acc[club.category] = (acc[club.category] || 0) + club.members;
    return acc;
  }, {} as Record<string, number>);

  const categoryEntries = Object.entries(categoryDistribution);
  const maxCategoryMembers = Math.max(...categoryEntries.map(([, count]) => count), 1);

  // Top clubs by members
  const topClubs = [...clubs].sort((a, b) => b.members - a.members).slice(0, 6);
  const maxClubMembers = Math.max(...topClubs.map(c => c.members), 1);

  // Upcoming events
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Club Administration & Analytics</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Campus Club Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time enrollment metrics, membership distributions, and event operations across all departments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Join Request</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics */}
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
          subtext="Conducted & scheduled"
        />
        <StatCard
          label="Total Members"
          value={stats.totalMembers}
          icon={UserCheck}
          color="emerald"
          subtext="Verified student members"
        />
        <StatCard
          label="Upcoming Events"
          value={stats.upcomingEventsCount}
          icon={Trophy}
          color="amber"
          subtext="Scheduled next 60 days"
        />
      </div>

      {/* Chart Section: Club Membership Distribution */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Club Membership Distribution</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Visualizing student participation across {chartView === 'category' ? 'activity sectors' : 'top clubs'}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setChartView('category')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                chartView === 'category'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Category
            </button>
            <button
              onClick={() => setChartView('club')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                chartView === 'club'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Top Clubs
            </button>
          </div>
        </div>

        {/* Responsive Bar Chart View */}
        {chartView === 'category' ? (
          <div className="space-y-4 pt-2">
            {categoryEntries.map(([category, count]) => {
              const percentage = Math.round((count / stats.totalMembers) * 100);
              const barWidth = Math.round((count / maxCategoryMembers) * 100);

              const colorPalette: Record<string, string> = {
                Technical: 'bg-blue-600',
                Cultural: 'bg-pink-500',
                Sports: 'bg-emerald-500',
                'Arts & Media': 'bg-purple-500',
                Entrepreneurship: 'bg-amber-500'
              };

              return (
                <div key={category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span className="font-semibold text-slate-900">{category}</span>
                    <span className="text-slate-500">
                      <strong>{count}</strong> members ({percentage}% of total)
                    </span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${colorPalette[category] || 'bg-blue-600'}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {topClubs.map((club) => {
              const barWidth = Math.round((club.members / maxClubMembers) * 100);
              return (
                <div key={club.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span className="font-semibold text-slate-900">{club.name} ({club.category})</span>
                    <span className="text-slate-500">
                      <strong>{club.members}</strong> members
                    </span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Grid: Upcoming Events List & Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events List */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Upcoming Events Agenda</span>
              </h2>
              <p className="text-xs text-slate-500">Schedule of scheduled club activities</p>
            </div>
            <Link
              to="/events"
              className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                    {event.clubName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {event.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {event.date} • {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {event.venue}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {event.registrationCount} registered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Membership Requests */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <span>Recent Membership Requests</span>
              </h2>
              <p className="text-xs text-slate-500">Live feed of student membership enrollments</p>
            </div>
            <Link
              to="/join"
              className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Student & Roll No</th>
                  <th className="pb-3 font-semibold">Target Club</th>
                  <th className="pb-3 font-semibold">Branch & Year</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {membershipRequests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-2">
                      <p className="font-bold text-slate-900">{req.studentName}</p>
                      <p className="text-[11px] text-slate-500">{req.rollNumber}</p>
                    </td>
                    <td className="py-3 pr-2 font-medium text-slate-800">
                      {req.clubName}
                    </td>
                    <td className="py-3 pr-2 text-slate-500">
                      {req.branch} • {req.year}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : req.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {req.status === 'Approved' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock3 className="w-3 h-3" />
                        )}
                        <span>{req.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

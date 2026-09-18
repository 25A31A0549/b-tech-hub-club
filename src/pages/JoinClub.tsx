import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useHub } from '../context/HubContext';
import { 
  UserPlus, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export const JoinClub: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { clubs, submitJoinRequest } = useHub();

  const clubParam = searchParams.get('club') || '';

  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    branch: 'Computer Science & Engineering',
    year: '1st Year',
    email: '',
    phone: '',
    clubId: '',
    reason: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [successClubName, setSuccessClubName] = useState('');

  // Pre-select club if present in search params
  useEffect(() => {
    if (clubParam) {
      const match = clubs.find(c => c.id.toLowerCase() === clubParam.toLowerCase());
      if (match) {
        setFormData(prev => ({ ...prev, clubId: match.id }));
      }
    } else if (clubs.length > 0 && !formData.clubId) {
      setFormData(prev => ({ ...prev, clubId: clubs[0].id }));
    }
  }, [clubParam, clubs]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'University Roll Number is required (e.g. 24BCE1023)';
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year of study is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.clubId) {
      newErrors.clubId = 'Please select a club';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for joining this club';
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedClub = clubs.find(c => c.id === formData.clubId);
    const clubName = selectedClub ? selectedClub.name : 'College Club';

    submitJoinRequest({
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber.trim().toUpperCase(),
      branch: formData.branch,
      year: formData.year,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      clubId: formData.clubId,
      clubName,
      reason: formData.reason.trim()
    });

    setSuccessClubName(clubName);
    setSubmittedSuccess(true);
  };

  const handleResetForm = () => {
    setSubmittedSuccess(false);
    setFormData({
      studentName: '',
      rollNumber: '',
      branch: 'Computer Science & Engineering',
      year: '1st Year',
      email: '',
      phone: '',
      clubId: clubs[0]?.id || '',
      reason: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Membership Enrollment</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Join a College Club
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Submit your membership request to join a student club. Your application will be sent directly to the faculty and student coordinators for review.
        </p>
      </div>

      {/* Main Form or Success State */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {submittedSuccess ? (
          /* SUCCESS VIEW REQUIRED BY SPECIFICATION */
          <div className="p-8 sm:p-14 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">
                Application Received
              </h2>
              <p className="text-base text-emerald-700 font-medium bg-emerald-50 py-3 px-4 rounded-xl border border-emerald-200">
                Your club membership request has been submitted successfully.
              </p>
              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                You applied for <strong>{successClubName}</strong>. You can monitor the review status of your application in the college dashboard.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Information</h2>
                <p className="text-xs text-slate-500">All fields marked with an asterisk are required.</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-blue-600 hidden sm:block" />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav Patel"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                  errors.studentName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-600`}
              />
              {errors.studentName && (
                <p className="text-xs text-rose-600 mt-1">{errors.studentName}</p>
              )}
            </div>

            {/* Roll Number, Branch & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Roll Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 23BCE1042"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                    errors.rollNumber ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.rollNumber && (
                  <p className="text-xs text-rose-600 mt-1">{errors.rollNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="AI & Data Science">AI & Data Science (AIDS)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                  <option value="Civil Engineering">Civil Engineering (CE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Study <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="1st Year">1st Year (Fresher)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / Personal Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                    errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (10-Digit Mobile) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                    errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Select Club */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Club to Join <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.clubId}
                onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                  errors.clubId ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white`}
              >
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.category} — {c.members} members)
                  </option>
                ))}
              </select>
              {errors.clubId && (
                <p className="text-xs text-rose-600 mt-1">{errors.clubId}</p>
              )}
            </div>

            {/* Reason for Joining */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Joining <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell the club coordinators about your interests, prior experience, and what you hope to learn or contribute..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                  errors.reason ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-600`}
              />
              {errors.reason && (
                <p className="text-xs text-rose-600 mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Submit Request Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

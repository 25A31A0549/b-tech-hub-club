import React, { useState, useEffect } from 'react';
import type { ClubEvent } from '../types/hub';
import { useHub } from '../context/HubContext';
import { X, Calendar, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface EventRegistrationModalProps {
  event: ClubEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const { registerForEvent } = useHub();

  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage(null);
      setErrorMessage(null);
      setErrors({});
    }
  }, [isOpen, event]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Full name is required';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'College Roll Number is required (e.g. 23BCE1042)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    const cleanedPhone = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const res = registerForEvent({
      eventId: event.id,
      eventName: event.name,
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber.trim().toUpperCase(),
      branch: formData.branch,
      year: formData.year,
      email: formData.email.trim(),
      phone: formData.phone.trim()
    });

    if (res.success) {
      setSuccessMessage(res.message);
      setErrorMessage(null);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-blue-800 mb-2">
            Event Registration
          </span>
          <h2 id="modal-title" className="text-xl font-bold pr-6 leading-snug">
            {event.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1">Organized by {event.clubName}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Content / Form */}
        <div className="p-6 overflow-y-auto">
          {successMessage ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Registration Confirmed!</h3>
              <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                {successMessage}
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
                <p><strong>Student:</strong> {formData.studentName} ({formData.rollNumber})</p>
                <p><strong>Branch:</strong> {formData.branch} • {formData.year}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohan Sharma"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                    errors.studentName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.studentName && (
                  <p className="text-xs text-rose-600 mt-1">{errors.studentName}</p>
                )}
              </div>

              {/* Roll Number & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Roll Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 23BCE1042"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.rollNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors.rollNumber && (
                    <p className="text-xs text-rose-600 mt-1">{errors.rollNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="1st Year">1st Year (Fresher)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                  </select>
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

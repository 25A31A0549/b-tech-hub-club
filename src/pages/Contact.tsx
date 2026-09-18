import React, { useState } from 'react';
import { useHub } from '../context/HubContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Clock 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { submitContactMessage } = useHub();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim()
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Mail className="w-3.5 h-3.5" />
          <span>Support & Inquiries</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact College Club Hub
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Have a question about club registrations, event logistics, or founding a new student chapter? Reach out to our campus student activities council.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Cols: College and Hub Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 shadow-md border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">College Club Hub</h2>
                <p className="text-xs text-blue-300">Office of Student Affairs & Activities</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              We coordinate student governance, facilitate inter-collegiate hackathons, allocate club activity budgets, and support student-led innovation across all engineering departments.
            </p>

            <div className="space-y-4 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Campus Address</strong>
                  <span>
                    Student Activity Center (SAC), 2nd Floor, Innovation Block, Tech Campus, Knowledge City - 500081
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Official Email</strong>
                  <span>clubs@college.edu</span>
                  <span className="block text-xs text-slate-400">sac.affairs@college.edu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Direct Help Desk</strong>
                  <span>+91 (0) 120-4567890</span>
                  <span className="block text-xs text-slate-400">Ext: 204 (Student Council Desk)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Office Working Hours</strong>
                  <span>Monday – Friday: 09:00 AM – 05:30 PM</span>
                  <span className="block text-xs text-slate-400">Saturday: 10:00 AM – 01:00 PM (Club Meetings)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            {isSuccess ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600">
                    Thank you for reaching out. Your inquiry has been forwarded to the Student Activity Council. A coordinator will respond to your registered email shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Send us a Message</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priyanshu Roy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                      errors.name ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@college.edu or personal email"
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

                {/* Subject / Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="General Inquiry">General Club Inquiry</option>
                    <option value="Event Registration Issue">Event Registration Issue</option>
                    <option value="Club Membership Status">Club Membership Status</option>
                    <option value="Propose New Club">Propose New Club or Chapter</option>
                    <option value="Sponsorship / Collaboration">Sponsorship / Collaboration</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you? Write your query or question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                      errors.message ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

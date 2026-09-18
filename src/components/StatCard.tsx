import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'indigo' | 'emerald' | 'amber' | 'purple';
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, subtext }) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-100',
      iconBg: 'bg-blue-600',
      ring: 'group-hover:border-blue-300'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-600',
      ring: 'group-hover:border-indigo-300'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-600',
      ring: 'group-hover:border-emerald-300'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-100',
      iconBg: 'bg-amber-600',
      ring: 'group-hover:border-amber-300'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-100',
      iconBg: 'bg-purple-600',
      ring: 'group-hover:border-purple-300'
    }
  };

  const scheme = colorMap[color];

  return (
    <div className={`group relative p-6 bg-white rounded-2xl border ${scheme.border} ${scheme.ring} shadow-xs hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>
          {subtext && (
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {subtext}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${scheme.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${scheme.text}`} />
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export default function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-center gap-5">
      {Icon && (
        <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
          <Icon size={28} />
        </div>
      )}
      <div>
        <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{value}</div>
        <div className="text-sm font-semibold text-primary-500 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

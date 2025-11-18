import React from 'react';

export function KPI({ label, value, sublabel, trend }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{sublabel}</div>
      {trend && (
        <div className={`mt-2 text-xs ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{trend} vs last period</div>
      )}
    </div>
  );
}

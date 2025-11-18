import React from 'react';

export function LineChart({ title }) {
  // Placeholder responsive chart using CSS gradients; replace with real chart lib if needed
  return (
    <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5">
      <div className="mb-3 text-sm text-slate-300 font-medium">{title}</div>
      <div className="h-40 w-full rounded-md bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_60%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_60%_40%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900/80 pointer-events-none" />
      </div>
    </div>
  );
}

export function BarChart({ title }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5">
      <div className="mb-3 text-sm text-slate-300 font-medium">{title}</div>
      <div className="h-40 w-full grid grid-cols-12 gap-1 items-end">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-blue-500/30 hover:bg-blue-500/50 transition h-10 rounded" style={{ height: `${20 + (i % 6) * 10}px` }} />
        ))}
      </div>
    </div>
  );
}

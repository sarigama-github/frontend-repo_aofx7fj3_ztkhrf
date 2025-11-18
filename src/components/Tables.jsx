import React, { useState } from 'react';

function StatusBadge({ status }) {
  const map = {
    paid: 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30',
    pending: 'bg-yellow-500/20 text-yellow-200 ring-1 ring-yellow-500/30',
    failed: 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/30',
    refunded: 'bg-slate-500/20 text-slate-300 ring-1 ring-slate-500/30',
    ok: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20',
    'high-usage': 'bg-yellow-500/10 text-yellow-200 ring-1 ring-yellow-500/20',
    'payment-failed': 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20'
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${map[status] || ''}`}>{status}</span>;
}

export function DataTable({ columns, data, searchable=true, onRowClick }) {
  const [q, setQ] = useState('');
  const filtered = data.filter(row => !q || JSON.stringify(row).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl overflow-hidden">
      {searchable && (
        <div className="p-3 border-b border-slate-800/60">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="w-full bg-slate-800/60 border border-slate-700/60 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/80">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="text-left px-4 py-3 font-medium text-slate-300 whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={idx}
                className={`border-t border-slate-800/60 hover:bg-slate-800/40 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : (
                      col.key === 'status' ? <StatusBadge status={row[col.key]} /> : row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExpandableJSON({ json }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm text-slate-300">Raw JSON</div>
        <button onClick={()=>setOpen(!open)} className="text-xs px-2 py-1 bg-slate-800/60 rounded border border-slate-700/60">{open ? 'Hide' : 'Show'}</button>
      </div>
      {open && (
        <div className="p-3">
          <pre className="text-xs overflow-auto max-h-80 bg-slate-950 p-3 rounded border border-slate-800/60">{JSON.stringify(json, null, 2)}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(json, null, 2))}
            className="mt-2 text-xs px-2 py-1 bg-slate-800/60 rounded border border-slate-700/60"
          >Copy JSON</button>
        </div>
      )}
    </div>
  );
}

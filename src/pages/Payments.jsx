import React, { useState } from 'react';
import { DataTable, ExpandableJSON } from '../components/Tables';

export default function Payments() {
  const [detail, setDetail] = useState(null);

  const rows = Array.from({length:30}).map((_,i)=>({
    charge_id:`chrg_${1000+i}`,
    amount:`$${(50 + (i%9)*12).toFixed(2)}`,
    status: i%7===0? 'failed' : (i%9===0? 'refunded' : (i%5===0? 'pending':'paid')),
    org_name:`Org ${i+1}`,
    created_at:'2025-10-12',
    paid_at: i%7===0? '-' : '2025-10-13',
    raw:{ id:`chrg_${1000+i}`, amount: (50 + (i%9)*12)*100, currency:'usd', failure_message: i%7===0? 'insufficient_funds': null, card_last_digits:'4242', gateway:'omise'}
  }));

  const columns = [
    { key: 'charge_id', label: 'Charge' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'org_name', label: 'Org' },
    { key: 'created_at', label: 'Created' },
    { key: 'paid_at', label: 'Paid' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input placeholder="Charge ID" className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm" />
        <input placeholder="Organization ID" className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm" />
        <select className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm"><option value="">Status</option><option>paid</option><option>pending</option><option>failed</option><option>refunded</option></select>
        <input type="date" className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm" />
      </div>

      <DataTable columns={columns} data={rows} onRowClick={setDetail} />

      {detail && (
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{detail.charge_id} • {detail.amount} • <span className="capitalize">{detail.status}</span></div>
              <div className="text-slate-400 text-sm">Org: {detail.org_name}</div>
            </div>
            <div className="flex gap-2">
              <a href={`https://dashboard.omise.co/charges/${detail.charge_id}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded bg-slate-800/60 border border-slate-700/60 text-sm">Open in Omise</a>
              <button onClick={()=>setDetail(null)} className="px-3 py-1.5 rounded bg-slate-800/60 border border-slate-700/60 text-sm">Close</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-slate-950/60 border border-slate-800/60 rounded p-3"><div className="text-slate-400 text-xs">failure_message</div><div>{detail.raw.failure_message || '-'}</div></div>
            <div className="bg-slate-950/60 border border-slate-800/60 rounded p-3"><div className="text-slate-400 text-xs">card_last_digits</div><div>{detail.raw.card_last_digits}</div></div>
            <div className="bg-slate-950/60 border border-slate-800/60 rounded p-3"><div className="text-slate-400 text-xs">gateway</div><div>{detail.raw.gateway}</div></div>
          </div>
          <ExpandableJSON json={detail.raw} />
        </div>
      )}

      <div className="text-xs text-slate-500">Tip: Click a row to view details</div>
    </div>
  );
}

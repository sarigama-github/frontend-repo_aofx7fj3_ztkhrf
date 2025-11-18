import React from 'react';
import { DataTable } from '../components/Tables';

export default function Alerts() {
  const failedPayments = Array.from({length:10}).map((_,i)=>({
    id:`fp_${i}`, organization:`Org ${i+1}`, amount:`$${(50+i*10).toFixed(2)}`, status:'failed', created_at:'2025-11-12'
  }));
  const highUsage = Array.from({length:10}).map((_,i)=>({
    id:`hu_${i}`, organization:`Org ${i+1}`, tokens:(2_000_000 + i*150_000).toLocaleString(), status:'high-usage', created_at:'2025-11-10'
  }));
  const spikes = Array.from({length:8}).map((_,i)=>({
    id:`sp_${i}`, organization:`Org ${i+1}`, change:`+${(120 - i*8)}%`, status:'suspicious', created_at:'2025-11-11'
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 text-sm text-slate-300 font-medium">Failed payments</div>
        <DataTable columns={[{key:'organization',label:'Organization'},{key:'amount',label:'Amount'},{key:'status',label:'Status'},{key:'created_at',label:'When'}]} data={failedPayments} />
      </div>
      <div>
        <div className="mb-2 text-sm text-slate-300 font-medium">High usage</div>
        <DataTable columns={[{key:'organization',label:'Organization'},{key:'tokens',label:'Tokens (24h)'},{key:'status',label:'Status'},{key:'created_at',label:'When'}]} data={highUsage} />
      </div>
      <div>
        <div className="mb-2 text-sm text-slate-300 font-medium">Suspicious token spikes</div>
        <DataTable columns={[{key:'organization',label:'Organization'},{key:'change',label:'Change'},{key:'status',label:'Status'},{key:'created_at',label:'When'}]} data={spikes} />
      </div>
    </div>
  );
}

import React from 'react';
import { DataTable } from '../components/Tables';

export default function Organizations() {
  const rows = Array.from({length:20}).map((_,i)=>({
    organization: `Organization ${i+1}`,
    organization_id: `org_${1000+i}`,
    plan: ['Free','Pro','Business','Enterprise'][i%4],
    tokens_month: (100000 + i*4500).toLocaleString(),
    paid_month: `$${(1000 + i*35).toLocaleString()}`,
    status: i%7===0 ? 'payment-failed' : (i%4===0 ? 'high-usage' : 'ok')
  }));

  const columns = [
    { key: 'organization', label: 'Organization' },
    { key: 'organization_id', label: 'ID' },
    { key: 'plan', label: 'Plan' },
    { key: 'tokens_month', label: 'Tokens (mo)' },
    { key: 'paid_month', label: 'Paid (mo)' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm">
          <option value="">All plans</option>
          <option>Free</option>
          <option>Pro</option>
          <option>Business</option>
          <option>Enterprise</option>
        </select>
        <select className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm">
          <option value="">Usage range</option>
          <option>0 - 100k</option>
          <option>100k - 1M</option>
          <option>1M - 10M</option>
          <option>10M+</option>
        </select>
        <select className="bg-slate-900/60 border border-slate-700/60 rounded px-3 py-2 text-sm">
          <option value="">Billing status</option>
          <option>ok</option>
          <option>high-usage</option>
          <option>payment-failed</option>
        </select>
      </div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}

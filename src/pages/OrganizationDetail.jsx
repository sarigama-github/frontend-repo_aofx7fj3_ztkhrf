import React, { useState } from 'react';
import { LineChart, BarChart } from '../components/Charts';
import { DataTable, ExpandableJSON } from '../components/Tables';
import { Link, useParams } from 'react-router-dom';

export default function OrganizationDetail() {
  const { orgId = 'org_1234' } = useParams();
  const [tab, setTab] = useState('overview');

  const usageRows = Array.from({length:20}).map((_,i)=>({
    request_at: `2025-11-${String((i%28)+1).padStart(2,'0')} 12:0${i%10}`,
    model: ['gpt-4o-mini','gpt-4.1','gpt-3.5-turbo'][i%3],
    tokens_input: 100 + i*4,
    tokens_output: 60 + i*3,
    tokens_total: 160 + i*7,
    meta: { path: '/chat/completions', feature: ['assist','search','summarize'][i%3], ip: `10.0.0.${i}` }
  }));

  const paymentRows = Array.from({length:8}).map((_,i)=>({
    charge_id:`chrg_test_${i+1}`,
    amount:`$${(120 + i*15).toFixed(2)}`,
    status: i%4===0 ? 'failed' : 'paid',
    paid_at: i%4===0 ? '-' : '2025-10-12',
    created_at: '2025-10-12'
  }));

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-400"><Link to="/" className="hover:underline">Dashboard</Link> / <Link to="/organizations" className="hover:underline">Organizations</Link> / <span className="text-slate-200 font-medium">{orgId}</span></div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Organization Detail</div>
          <div className="text-slate-400 text-sm">{orgId} • Pro plan</div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-slate-900/60 border border-slate-700/60 text-sm">Refresh</button>
          <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Export CSV</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800/60">
        {['overview','usage','payments'].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 text-sm border-b-2 ${tab===t? 'border-blue-500 text-white' : 'border-transparent text-slate-400'}`}>{t.toUpperCase()}</button>
        ))}
      </div>

      {tab==='overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4"><div className="text-slate-400 text-sm">Monthly tokens</div><div className="text-2xl font-semibold mt-1">2.4M</div></div>
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4"><div className="text-slate-400 text-sm">Requests</div><div className="text-2xl font-semibold mt-1">84,120</div></div>
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4"><div className="text-slate-400 text-sm">Total payments</div><div className="text-2xl font-semibold mt-1">$12,480</div></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BarChart title="Usage per model" />
            <LineChart title="Usage per day" />
          </div>
          <div>
            <div className="mb-2 text-sm text-slate-300 font-medium">Payments timeline</div>
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 text-sm text-slate-300">Paid invoices visible here with statuses.</div>
          </div>
        </div>
      )}

      {tab==='usage' && (
        <div className="space-y-4">
          <LineChart title="Daily usage" />
          <DataTable
            columns={[
              { key: 'request_at', label: 'Request At' },
              { key: 'model', label: 'Model' },
              { key: 'tokens_input', label: 'Input' },
              { key: 'tokens_output', label: 'Output' },
              { key: 'tokens_total', label: 'Total' },
              { key: 'meta', label: 'Meta', render: (v)=> <ExpandableJSON json={v} /> },
            ]}
            data={usageRows}
          />
        </div>
      )}

      {tab==='payments' && (
        <div className="space-y-4">
          <DataTable
            columns={[
              { key: 'charge_id', label: 'Charge' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status' },
              { key: 'paid_at', label: 'Paid At' },
              { key: 'created_at', label: 'Created' },
            ]}
            data={paymentRows}
          />
        </div>
      )}
    </div>
  );
}

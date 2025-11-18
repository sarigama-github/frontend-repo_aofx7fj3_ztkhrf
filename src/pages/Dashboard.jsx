import React from 'react';
import Spline from '@splinetool/react-spline';
import { KPI } from '../components/KPI';
import { LineChart, BarChart } from '../components/Charts';
import { DataTable } from '../components/Tables';

export default function Dashboard() {
  const payments = Array.from({length:10}).map((_,i)=>({
    charge_id:`chrg_test_${1000+i}`,
    amount:`$${(100 + i*12).toFixed(2)}`,
    status: i%5===0? 'failed' : 'paid',
    org: `Org ${i+1}`,
    created_at: '2025-11-01',
    paid_at: i%5===0? '-' : '2025-11-02'
  }));

  const highUsage = Array.from({length:6}).map((_,i)=>({
    organization:`Org ${i+1}`,
    organization_id:`org_${i+1}`,
    tokens_month: (200000 + i*50000).toLocaleString(),
    status: i%3===0? 'high-usage' : 'ok'
  }));

  const anomalies = [
    { id: 'anom_001', organization: 'Org 7', type: 'Payment Failure', severity: 'high', time: '2h ago' },
    { id: 'anom_002', organization: 'Org 2', type: 'Token Spike', severity: 'medium', time: '6h ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero with Spline */}
      <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4">
          <div className="text-lg font-semibold">Internal Billing & Usage Console</div>
          <div className="text-slate-400 text-sm">Monitor revenue, usage, and alerts across all organizations</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPI label="Revenue (mo)" value="$128,240" sublabel="Updated 5 min ago" trend="+12.4%" />
        <KPI label="Tokens (mo)" value="58.2M" sublabel="Across 1,204 orgs" trend="+8.1%" />
        <KPI label="Paid orgs (mo)" value="1,048" sublabel="Active subscriptions" trend="+3.2%" />
        <KPI label="Failed payments (7d)" value="32" sublabel="Requires action" trend="-4.0%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChart title="Revenue per day" />
        <LineChart title="Token usage per day" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1">
          <div className="mb-2 text-sm text-slate-300 font-medium">Recent payments</div>
          <DataTable
            columns={[
              { key: 'charge_id', label: 'Charge' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status' },
              { key: 'org', label: 'Org' },
              { key: 'created_at', label: 'Created' },
              { key: 'paid_at', label: 'Paid' },
            ]}
            data={payments}
          />
        </div>
        <div className="xl:col-span-1">
          <div className="mb-2 text-sm text-slate-300 font-medium">High-usage organizations</div>
          <DataTable
            columns={[
              { key: 'organization', label: 'Organization' },
              { key: 'organization_id', label: 'ID' },
              { key: 'tokens_month', label: 'Tokens (mo)' },
              { key: 'status', label: 'Status' },
            ]}
            data={highUsage}
          />
        </div>
        <div className="xl:col-span-1">
          <div className="mb-2 text-sm text-slate-300 font-medium">Recent anomalies</div>
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl divide-y divide-slate-800/60">
            {anomalies.map(a => (
              <div key={a.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.type}</div>
                  <div className="text-xs text-slate-400">{a.organization} • {a.time}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${a.severity==='high'?'border-rose-500/40 text-rose-300 bg-rose-500/10': 'border-yellow-500/40 text-yellow-200 bg-yellow-500/10'}`}>{a.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

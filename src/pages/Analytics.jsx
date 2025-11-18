import React from 'react';
import { BarChart, LineChart } from '../components/Charts';
import { DataTable } from '../components/Tables';

export default function Analytics() {
  const topUsage = Array.from({length:10}).map((_,i)=>({ rank: i+1, organization:`Org ${i+1}`, tokens: (5_000_000 - i*250_000).toLocaleString() }));
  const topGrowth = Array.from({length:10}).map((_,i)=>({ rank: i+1, organization:`Org ${i+1}`, growth: `+${(30 - i*2).toFixed(1)}%` }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChart title="Tokens per model (stacked)" />
        <BarChart title="Requests per feature" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 text-sm text-slate-300 font-medium">Top 10 organizations by usage</div>
          <DataTable columns={[{key:'rank',label:'#'},{key:'organization',label:'Organization'},{key:'tokens',label:'Tokens'}]} data={topUsage} />
        </div>
        <div>
          <div className="mb-2 text-sm text-slate-300 font-medium">Top 10 orgs by usage growth</div>
          <DataTable columns={[{key:'rank',label:'#'},{key:'organization',label:'Organization'},{key:'growth',label:'Growth'}]} data={topGrowth} />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Building2, CreditCard, BarChart2, AlertTriangle, Settings } from 'lucide-react';

function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
        }`
      }
      end
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col h-screen sticky top-0 border-r border-slate-800/60 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40">
          <div className="px-5 py-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
              <div>
                <div className="text-sm text-slate-400">Admin Console</div>
                <div className="font-semibold">Billing & Usage</div>
              </div>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" />
            <SidebarLink to="/organizations" icon={Building2} label="Organizations" />
            <SidebarLink to="/payments" icon={CreditCard} label="Payments" />
            <SidebarLink to="/analytics" icon={BarChart2} label="Usage Analytics" />
            <SidebarLink to="/alerts" icon={AlertTriangle} label="Alerts & Risk" />
            <SidebarLink to="/settings" icon={Settings} label="Settings" />
          </nav>
        </aside>
        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-10 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/30">
            <div className="px-4 md:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 md:hidden">
                <img src="/flame-icon.svg" alt="Flames" className="w-7 h-7" />
                <div className="font-semibold">Billing & Usage</div>
              </div>
              <div className="text-sm text-slate-400">Internal • Finance, Ops, Support, Eng</div>
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

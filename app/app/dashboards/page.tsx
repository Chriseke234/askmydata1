'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Plus, Sparkles, ArrowRight } from 'lucide-react';

export default function DashboardsPage() {
  const dashboards = [
    { id: 'dash-1', title: 'Executive Sales & Revenue Command Center', itemsCount: 6, author: 'AI Generated', updated: 'Today' },
    { id: 'dash-2', title: 'European Distribution & Support Health', itemsCount: 4, author: 'Alex Morgan', updated: 'Yesterday' },
    { id: 'dash-3', title: 'Product Category Margin & YoY Growth', itemsCount: 5, author: 'Alex Morgan', updated: '3 days ago' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Dashboards Workspace</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Interactive dashboards and one-click AI dashboard generation.</p>
        </div>

        <Link
          href="/app/dashboards/dash-1"
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Generate Dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dash) => (
          <Link
            key={dash.id}
            href={`/app/dashboards/${dash.id}`}
            className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Dashboard</span>
              </div>
              <span>{dash.itemsCount} Widgets</span>
            </div>

            <h2 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">{dash.title}</h2>

            <div className="pt-3 border-t border-[#1A1D24] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>By {dash.author}</span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

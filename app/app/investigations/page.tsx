'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function InvestigationsHubPage() {
  const investigations = [
    {
      id: 'inv-1',
      title: 'Why did European revenue contract by 22.4% in recent period?',
      status: 'In Progress',
      trigger: 'European orders dropped by 9.4% and support delay tickets surged 38%.',
      stepsCount: 5,
      updated: '2 hours ago',
      author: 'Alex Morgan'
    },
    {
      id: 'inv-2',
      title: 'Software Category Margin Expansion & Enterprise Upgrade Cohorts',
      status: 'Resolved',
      trigger: 'Software category revenue surged +34.2% YoY driven by Enterprise Analytics Suite.',
      stepsCount: 4,
      updated: 'Yesterday',
      author: 'Alex Morgan'
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Persistent Investigations Hub</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Multi-step analytical journeys tracing root causes and decision evidence.</p>
        </div>

        <Link
          href="/app/investigations/inv-1"
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>New Investigation Thread</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investigations.map((inv) => (
          <Link
            key={inv.id}
            href={`/app/investigations/${inv.id}`}
            className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Investigation • {inv.stepsCount} Analytical Steps
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                inv.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {inv.status}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
              {inv.title}
            </h2>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Trigger: {inv.trigger}
            </p>

            <div className="pt-3 border-t border-[#1A1D24] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{inv.updated}</span>
              </span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Explore Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

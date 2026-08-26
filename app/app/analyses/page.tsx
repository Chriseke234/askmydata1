'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, Plus, Search, Code, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SavedAnalysesPage() {
  const analyses = [
    { id: 'an-1', title: 'Regional Revenue Divergence & AOV Breakdown', dataset: 'Orders', query: 'SELECT region, SUM(amount)...', updated: '10 mins ago', author: 'Alex Morgan' },
    { id: 'an-2', title: 'European Customer Churn vs Shipping Delays', dataset: 'Support Tickets', query: 'SELECT csat_score, resolution_hours...', updated: '1 hour ago', author: 'Alex Morgan' },
    { id: 'an-3', title: 'Software Category Margin Expansion', dataset: 'Products', query: 'SELECT category, growth_rate_yoy...', updated: 'Yesterday', author: 'Alex Morgan' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Saved Analyses & SQL Canvas</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Explore, write read-only queries, format, and audit analytical computations.</p>
        </div>

        <Link
          href="/app/analyses/an-1"
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis Canvas</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyses.map((an) => (
          <Link
            key={an.id}
            href={`/app/analyses/${an.id}`}
            className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 transition-all group shadow-md"
          >
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Analysis</span>
            </div>

            <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">{an.title}</h3>
            
            <pre className="p-2 bg-[#0B0C0E] text-[#9CA3AF] font-mono text-[10px] rounded border border-[#1A1D24] truncate">
              {an.query}
            </pre>

            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-[#1A1D24]">
              <span>Dataset: {an.dataset}</span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Open Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

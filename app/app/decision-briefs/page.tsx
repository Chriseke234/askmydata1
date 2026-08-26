'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DecisionBriefsPage() {
  const briefs = [
    {
      id: 'db-1',
      title: 'Action Plan for European Account Retention & Fulfillment Realignment',
      situation: 'European revenue contracted by 22.4% due to fulfillment delays on the Smart IoT Hub line.',
      evidenceLevel: 'Verified',
      actionsCount: 3,
      date: 'August 2026'
    },
    {
      id: 'db-[#102]',
      title: 'Software Category Expansion & Enterprise Pricing Optimization',
      situation: 'Software segment margin expanded +34.2% YoY with high retention.',
      evidenceLevel: 'Strong evidence',
      actionsCount: 2,
      date: 'July 2026'
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Executive Decision Briefs</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Structured decision briefs turning complex analytics into clear executive action.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {briefs.map((b) => (
          <Link
            key={b.id}
            href="/app/decision-briefs/db-1"
            className="p-6 bg-[#121417] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl space-y-4 transition-all group shadow-xl gold-border-glow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-4 h-4" />
                <span>Executive Brief • {b.date}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                ✓ {b.evidenceLevel}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">{b.title}</h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{b.situation}</p>

            <div className="pt-3 border-t border-[#1A1D24] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>{b.actionsCount} Recommended Actions</span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>View Decision Brief</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, ArrowLeft, AlertTriangle, CheckCircle2, TrendingUp, Share2 } from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { NORTHSTAR_REVENUE_TREND } from '@/lib/demo/northstar-data';

export default function DecisionBriefDetailPage() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/app/decision-briefs" className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px] uppercase">Executive Decision Brief #104</span>
              <span className="text-xs text-emerald-400 font-bold">✓ Verified Evidence Level</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Action Plan for European Account Retention & Distribution Realignment</h1>
          </div>
        </div>

        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow">
          <Share2 className="w-4 h-4" />
          <span>Share Brief</span>
        </button>
      </div>

      {/* Decision Brief Structure */}
      <div className="space-y-6">
        {/* Situation */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-2">
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">1. Situation Summary</div>
          <p className="text-sm text-gray-200 leading-relaxed font-medium">
            European revenue contracted by **22.4%** ($128,000 vs $165,000 previous period). This decline accounts for over 70% of Northstar Commerce's overall month-over-month revenue dip.
          </p>
        </div>

        {/* Evidence Data */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">2. Empirical Data Evidence</div>
          <ul className="list-disc list-inside text-xs text-gray-300 space-y-2">
            <li>European order volume dropped **9.4%** (to 310 orders).</li>
            <li>European support tickets citing *Shipping Delays* increased by **38%** over the last 30 days.</li>
            <li>Enterprise accounts *Berlin Tech Solutions* and *London Financial Ltd* flagged as **At Risk** ($99,900 combined LTV).</li>
          </ul>

          <AskChart
            spec={{
              type: 'bar',
              title: 'European Revenue Contraction ($ USD)',
              data: NORTHSTAR_REVENUE_TREND,
              xAxisKey: 'month',
              yAxisKeys: ['Europe'],
              unit: '$'
            }}
          />
        </div>

        {/* Drivers */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-2">
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">3. Associated Drivers</div>
          <p className="text-sm text-gray-200 leading-relaxed">
            Supply chain bottlenecks in the Rotterdam logistics hub led to a 14-day delay in *Smart IoT Workstation Hub* inventory shipments.
          </p>
        </div>

        {/* Opportunities & Risks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Growth Opportunities</div>
            <p className="text-xs text-gray-300">
              Shift focus to Software category (+34.2% YoY) in Europe to cushion hardware fulfillment lag.
            </p>
          </div>

          <div className="p-5 bg-amber-950/20 border border-amber-800/40 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">High Risks</div>
            <p className="text-xs text-gray-300">
              Potential loss of $99,900 LTV if European enterprise accounts churn before inventory arrives.
            </p>
          </div>
        </div>

        {/* Suggested Next Actions */}
        <div className="p-6 bg-[#121417] border border-[#D4AF37]/50 rounded-2xl space-y-4 gold-border-glow">
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>4. Executive Action Recommendations</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#0B0C0E] border border-[#262B36] rounded-xl flex items-start space-x-3 text-xs text-white">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Action 1: Air-freight 200 units of Smart IoT Hubs</strong>
                <span className="text-[#9CA3AF]">Transfer emergency inventory from NA East warehouse to Frankfurt hub to resolve delays.</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#0B0C0E] border border-[#262B36] rounded-xl flex items-start space-x-3 text-xs text-white">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Action 2: Executive Outreach to Berlin Tech Solutions</strong>
                <span className="text-[#9CA3AF]">Assign Account Executive to offer temporary Software analytics credits.</span>
              </div>
            </div>
          </div>
        </div>

        <EvidencePanel
          evidence={{
            level: 'Verified',
            metricsUsed: ['Revenue MoM', 'Support CSAT', 'Inventory Stock Level'],
            datasetsReferenced: ['Orders', 'Products', 'Support Tickets', 'Customers']
          }}
        />
      </div>
    </div>
  );
}

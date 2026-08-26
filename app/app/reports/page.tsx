'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Plus, Sparkles, ArrowRight, Printer, Share2 } from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { NORTHSTAR_REVENUE_TREND } from '@/lib/demo/northstar-data';

export default function ReportsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Executive Report • August 2026</span>
          <h1 className="text-2xl font-extrabold text-white mt-1">Northstar Commerce Monthly Performance Audit</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-xs font-bold text-white rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Surface */}
      <div className="p-6 sm:p-10 bg-[#121417] border border-[#1A1D24] rounded-3xl space-y-8 shadow-2xl">
        {/* Title Block */}
        <div className="border-b border-[#1A1D24] pb-6 space-y-2">
          <div className="text-xs font-mono text-[#D4AF37] uppercase">CONFIDENTIAL EXECUTIVE ANALYSIS</div>
          <h2 className="text-3xl font-extrabold text-white">Q2-Q3 Business Health & Operational Risk Assessment</h2>
          <div className="text-xs text-[#9CA3AF]">Prepared by AskMyData AI Analyst • Verified against 5 active data tables</div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#D4AF37]">1. Executive Summary</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            Northstar Commerce generated **$485,200** in monthly revenue, representing an **11.8% contraction** compared to the previous period. The primary driver of this contraction is localized in the European distribution hub, where Electronics sales slid by **22.4%** due to inventory fulfillment delays.
          </p>
        </div>

        {/* Section 2: Regional Performance & Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#D4AF37]">2. Regional Performance Breakdown</h3>
          <AskChart
            spec={{
              type: 'bar',
              title: 'Regional Revenue Divergence ($ USD)',
              data: NORTHSTAR_REVENUE_TREND,
              xAxisKey: 'month',
              yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
              unit: '$'
            }}
          />
        </div>

        {/* Section 3: Recommendations */}
        <div className="space-y-3 p-5 bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-2xl">
          <h3 className="text-base font-bold text-white">3. Strategic Recommendations</h3>
          <ol className="list-decimal list-inside text-xs text-gray-300 space-y-2">
            <li>Re-allocate 200 units of Smart IoT Workstation Hubs from US warehouses to Frankfurt hub immediately.</li>
            <li>Extend Software category promotion (+34.2% YoY) to European enterprise accounts.</li>
          </ol>
        </div>

        {/* Audit Evidence */}
        <EvidencePanel
          evidence={{
            level: 'Verified',
            metricsUsed: ['Monthly Revenue', 'Regional Divergence', 'CSAT Delay Correlation'],
            datasetsReferenced: ['Orders', 'Products', 'Support Tickets', 'Customers']
          }}
        />
      </div>
    </div>
  );
}

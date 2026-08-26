'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Search, 
  Send, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Zap, 
  AlertCircle, 
  Users, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { NORTHSTAR_REVENUE_TREND, NORTHSTAR_SUMMARY_METRICS } from '@/lib/demo/northstar-data';

export default function OverviewPage() {
  const [askQuery, setAskQuery] = useState('');
  const router = useRouter();

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;
    router.push(`/app/ask?q=${encodeURIComponent(askQuery.trim())}`);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What do you want to understand?
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Active Workspace: <span className="text-[#D4AF37] font-semibold">Northstar Commerce</span> • 5 Datasets Connected
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/app/data"
            className="px-3.5 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-xs font-semibold text-white rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Database className="w-4 h-4 text-[#D4AF37]" />
            <span>Data Health (98/100)</span>
          </Link>
          <Link
            href="/app/investigations"
            className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors shadow-md gold-glow"
          >
            <Zap className="w-4 h-4" />
            <span>New Investigation</span>
          </Link>
        </div>
      </div>

      {/* Primary AI Input Hero Box */}
      <div className="p-6 bg-[#121417] border border-[#D4AF37]/50 rounded-2xl shadow-2xl gold-border-glow space-y-4">
        <form onSubmit={handleAskSubmit} className="relative flex items-center">
          <Sparkles className="w-6 h-6 text-[#D4AF37] absolute left-4" />
          <input
            type="text"
            value={askQuery}
            onChange={(e) => setAskQuery(e.target.value)}
            placeholder="Ask your data anything (e.g. 'Why did sales fall last month?')..."
            className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-xl pl-12 pr-28 py-3.5 text-sm sm:text-base text-white placeholder-[#9CA3AF] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs sm:text-sm rounded-lg flex items-center space-x-1.5 transition-colors shadow-md"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Example Chip Starters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#9CA3AF] shrink-0 font-medium">Try asking:</span>
          {[
            "How is my business doing?",
            "Why did sales fall last month?",
            "Find my biggest opportunities",
            "Create an executive dashboard",
            "Forecast revenue"
          ].map((ex, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/app/ask?q=${encodeURIComponent(ex)}`)}
              className="px-3 py-1.5 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-lg text-xs text-gray-300 hover:text-white shrink-0 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Monthly Revenue</span>
            <span className="px-2 py-0.5 bg-red-950/60 border border-red-800/40 text-red-400 font-bold rounded flex items-center space-x-1">
              <TrendingDown className="w-3 h-3" />
              <span>-11.8%</span>
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">${NORTHSTAR_SUMMARY_METRICS.monthly_revenue.toLocaleString()}</div>
          <div className="text-[11px] text-[#9CA3AF]">vs $550,000 previous period</div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Total Orders</span>
            <span className="px-2 py-0.5 bg-red-950/60 border border-red-800/40 text-red-400 font-bold rounded flex items-center space-x-1">
              <TrendingDown className="w-3 h-3" />
              <span>-9.4%</span>
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">{NORTHSTAR_SUMMARY_METRICS.total_orders.toLocaleString()}</div>
          <div className="text-[11px] text-[#9CA3AF]">AOV: ${NORTHSTAR_SUMMARY_METRICS.average_order_value} (-2.6%)</div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Top Growth Category</span>
            <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-bold rounded flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24.1%</span>
            </span>
          </div>
          <div className="text-xl font-bold text-white">Home & Office</div>
          <div className="text-[11px] text-[#9CA3AF]">Ergonomic Desk Pro line leading</div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Primary Anomaly</span>
            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-800/40 text-amber-400 font-bold rounded">
              High Risk
            </span>
          </div>
          <div className="text-sm font-bold text-white">Europe Electronics (-22.4%)</div>
          <div className="text-[11px] text-[#9CA3AF]">38% increase in shipping delay tickets</div>
        </div>
      </div>

      {/* Revenue Trend Chart Widget */}
      <AskChart
        spec={{
          type: 'bar',
          title: 'Regional Revenue Performance & Divergence',
          description: 'Europe experienced a 22.4% contraction while North America grew +3.5%.',
          data: NORTHSTAR_REVENUE_TREND,
          xAxisKey: 'month',
          yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
          unit: '$'
        }}
      />

      {/* Two Column Layout: Recent Investigations & Decision Briefs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investigations */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1D24]">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-bold text-white text-base">Active Investigations</h3>
            </div>
            <Link href="/app/investigations" className="text-xs text-[#D4AF37] hover:underline font-semibold">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            <Link
              href="/app/investigations/inv-1"
              className="p-4 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl block space-y-2 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Why did European revenue decline in Q2?
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-bold">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">Root Cause: Component fulfillment delay on Smart IoT Hub line in Berlin.</p>
              <div className="text-[10px] text-[#C5A059] flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>Updated 2 hours ago by Alex Morgan</span>
              </div>
            </Link>

            <Link
              href="/app/investigations/inv-2"
              className="p-4 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl block space-y-2 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-[#D4AF37]">
                  Software category margin expansion opportunities
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">
                  Resolved
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">Outcome: Enterprise Analytics Suite expansion (+34.2% YoY).</p>
            </Link>
          </div>
        </div>

        {/* Executive Decision Briefs */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1D24]">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-bold text-white text-base">Executive Decision Briefs</h3>
            </div>
            <Link href="/app/decision-briefs" className="text-xs text-[#D4AF37] hover:underline font-semibold">
              View All →
            </Link>
          </div>

          <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Brief #104 • Verified Evidence</span>
              <span className="text-[10px] text-[#9CA3AF]">August 2026</span>
            </div>
            <h4 className="font-bold text-white text-sm">Action Plan for European Account Retention</h4>
            <p className="text-xs text-gray-300">
              Data confirms 38% support ticket backlog in Europe. Recommended action: Shift 200 units of Smart IoT Hubs from NA warehouse to European distribution center.
            </p>
            <Link
              href="/app/decision-briefs/db-1"
              className="inline-flex items-center space-x-1.5 text-xs text-[#D4AF37] font-bold hover:underline"
            >
              <span>Review Full Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

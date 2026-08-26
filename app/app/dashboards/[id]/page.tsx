'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ArrowLeft, RefreshCw, Filter, Share2, Download, TrendingDown, TrendingUp } from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { NORTHSTAR_REVENUE_TREND, NORTHSTAR_SUMMARY_METRICS } from '@/lib/demo/northstar-data';

export default function DashboardDetailPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/app/dashboards" className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Executive Sales & Revenue Command Center</h1>
            <p className="text-xs text-[#9CA3AF]">AI Generated • Auto-refreshes daily • Northstar Commerce</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-[#121417] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-lg flex items-center space-x-1.5 transition-colors">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Filter Region</span>
          </button>
          <button className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors gold-glow">
            <Download className="w-3.5 h-3.5" />
            <span>Export View</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-1">
          <div className="text-xs text-[#9CA3AF]">Monthly Revenue</div>
          <div className="text-2xl font-extrabold text-white">${NORTHSTAR_SUMMARY_METRICS.monthly_revenue.toLocaleString()}</div>
          <div className="text-[11px] text-red-400 font-semibold">-11.8% MoM</div>
        </div>

        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-1">
          <div className="text-xs text-[#9CA3AF]">Total Order Volume</div>
          <div className="text-2xl font-extrabold text-white">{NORTHSTAR_SUMMARY_METRICS.total_orders.toLocaleString()}</div>
          <div className="text-[11px] text-red-400 font-semibold">-9.4% MoM</div>
        </div>

        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-1">
          <div className="text-xs text-[#9CA3AF]">Average Order Value</div>
          <div className="text-2xl font-extrabold text-white">${NORTHSTAR_SUMMARY_METRICS.average_order_value}</div>
          <div className="text-[11px] text-gray-400">-2.6% MoM</div>
        </div>

        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-1">
          <div className="text-xs text-[#9CA3AF]">Active Customers</div>
          <div className="text-2xl font-extrabold text-white">{NORTHSTAR_SUMMARY_METRICS.active_customers}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Churn Rate: 4.2%</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AskChart
          spec={{
            type: 'bar',
            title: 'Regional Revenue Performance ($ USD)',
            data: NORTHSTAR_REVENUE_TREND,
            xAxisKey: 'month',
            yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
            unit: '$'
          }}
        />

        <AskChart
          spec={{
            type: 'line',
            title: 'Customer Acquisition & Growth Trend',
            data: [
              { month: 'Mar 2026', Enterprise: 12, SMB: 45, Consumer: 120 },
              { month: 'Apr 2026', Enterprise: 15, SMB: 48, Consumer: 135 },
              { month: 'May 2026', Enterprise: 18, SMB: 52, Consumer: 140 },
              { month: 'Jun 2026', Enterprise: 19, SMB: 50, Consumer: 138 },
              { month: 'Jul 2026', Enterprise: 22, SMB: 55, Consumer: 150 },
              { month: 'Aug 2026', Enterprise: 24, SMB: 58, Consumer: 162 },
            ],
            xAxisKey: 'month',
            yAxisKeys: ['Enterprise', 'SMB', 'Consumer']
          }}
        />
      </div>
    </div>
  );
}

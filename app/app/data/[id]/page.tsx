'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Database, 
  ShieldCheck, 
  Table, 
  BarChart3, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Search
} from 'lucide-react';
import { NORTHSTAR_CUSTOMERS } from '@/lib/demo/northstar-data';

export default function DatasetDetailPage() {
  const params = useParams();
  const datasetId = params?.id || 'ds-orders';
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { name: 'customer_id', type: 'VARCHAR', nullRate: '0.0%', distinct: 50, quality: '100%' },
    { name: 'name', type: 'VARCHAR', nullRate: '0.0%', distinct: 50, quality: '100%' },
    { name: 'email', type: 'VARCHAR', nullRate: '0.0%', distinct: 50, quality: '100%' },
    { name: 'region', type: 'VARCHAR', nullRate: '0.0%', distinct: 4, quality: '100%' },
    { name: 'segment', type: 'VARCHAR', nullRate: '0.0%', distinct: 3, quality: '100%' },
    { name: 'ltv', type: 'NUMERIC', nullRate: '0.0%', distinct: 48, quality: '98%' },
    { name: 'signup_date', type: 'DATE', nullRate: '0.0%', distinct: 42, quality: '100%' },
    { name: 'status', type: 'VARCHAR', nullRate: '0.0%', distinct: 3, quality: '100%' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Back Link */}
      <Link href="/app/data" className="inline-flex items-center space-x-2 text-xs font-bold text-[#D4AF37] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Data Catalog</span>
      </Link>

      {/* Header Banner */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-white">Dataset: Customers</h1>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                Health Score: 98/100
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1">Source: PostgreSQL Analytics Cluster • Last synced 10 minutes ago</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/app/ask?q=Analyze+customers+dataset`}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg transition-colors gold-glow"
          >
            Ask AI About Dataset
          </Link>
        </div>
      </div>

      {/* Data Health Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Completeness</div>
          <div className="text-lg font-bold text-white mt-1">100%</div>
        </div>
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Consistency</div>
          <div className="text-lg font-bold text-white mt-1">98%</div>
        </div>
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Validity</div>
          <div className="text-lg font-bold text-white mt-1">99%</div>
        </div>
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Uniqueness</div>
          <div className="text-lg font-bold text-white mt-1">100%</div>
        </div>
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Freshness</div>
          <div className="text-lg font-bold text-white mt-1">Optimal</div>
        </div>
        <div className="p-3 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Integrity</div>
          <div className="text-lg font-bold text-white mt-1">Passed</div>
        </div>
      </div>

      {/* Schema Columns & Profiling */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
        <h2 className="font-bold text-white text-base flex items-center space-x-2">
          <Table className="w-5 h-5 text-[#D4AF37]" />
          <span>Column Schemas & Profiling Statistics</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                <th className="pb-3 font-semibold">Column Name</th>
                <th className="pb-3 font-semibold">Data Type</th>
                <th className="pb-3 font-semibold">Null Rate</th>
                <th className="pb-3 font-semibold">Distinct Count</th>
                <th className="pb-3 font-semibold">Quality Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24]">
              {columns.map((col, idx) => (
                <tr key={idx} className="hover:bg-[#0B0C0E]/50">
                  <td className="py-3 font-mono font-bold text-white">{col.name}</td>
                  <td className="py-3 text-[#D4AF37]">{col.type}</td>
                  <td className="py-3 text-[#9CA3AF]">{col.nullRate}</td>
                  <td className="py-3 text-white">{col.distinct}</td>
                  <td className="py-3 font-bold text-emerald-400">{col.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample Records Explorer */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Sample Records Preview</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sample rows..."
              className="bg-[#0B0C0E] border border-[#262B36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#9CA3AF] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Region</th>
                <th className="pb-3 font-semibold">Segment</th>
                <th className="pb-3 font-semibold">LTV ($)</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24]">
              {NORTHSTAR_CUSTOMERS.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#0B0C0E]/50">
                  <td className="py-3 font-mono text-[#9CA3AF]">{c.customer_id}</td>
                  <td className="py-3 font-bold text-white">{c.name}</td>
                  <td className="py-3 text-gray-300">{c.region}</td>
                  <td className="py-3 text-[#D4AF37]">{c.segment}</td>
                  <td className="py-3 font-mono font-bold text-white">${c.ltv.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

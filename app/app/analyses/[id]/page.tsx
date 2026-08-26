'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft, 
  Save, 
  Copy, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { NORTHSTAR_REVENUE_TREND } from '@/lib/demo/northstar-data';

export default function AnalysisCanvasPage() {
  const [sqlQuery, setSqlQuery] = useState(
    `SELECT \n  region, \n  SUM(amount) AS total_revenue, \n  COUNT(order_id) AS order_count, \n  ROUND(AVG(amount), 2) AS avg_order_value\nFROM orders\nWHERE date >= '2026-03-01'\nGROUP BY region\nORDER BY total_revenue DESC;`
  );
  const [validationState, setValidationState] = useState<{ isSafe: boolean; msg: string } | null>({
    isSafe: true,
    msg: 'Query Safety Verified: Read-Only Aggregation Passed'
  });
  const [isRunning, setIsRunning] = useState(false);

  const handleRunQuery = () => {
    // Dry-run query safety check
    const isDestructive = /(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE)/i.test(sqlQuery);
    if (isDestructive) {
      setValidationState({
        isSafe: false,
        msg: 'SAFETY BLOCK: Destructive operations (INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE) are strictly blocked.'
      });
      return;
    }

    setValidationState({
      isSafe: true,
      msg: 'Query Validated: Read-Only Execution Completed'
    });

    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/app/analyses" className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-bold text-white text-xl">Regional Revenue Divergence Canvas</h1>
            <p className="text-xs text-[#9CA3AF]">Analyst Workspace Mode • Read-Only PostgreSQL Cluster</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-[#121417] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-lg flex items-center space-x-1.5 transition-colors">
            <Save className="w-3.5 h-3.5" />
            <span>Save Canvas</span>
          </button>
          <button
            onClick={handleRunQuery}
            className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold text-xs rounded-lg flex items-center space-x-1.5 transition-colors shadow-md gold-glow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Query</span>
          </button>
        </div>
      </div>

      {/* SQL Editor Box */}
      <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold text-white uppercase tracking-wider">SQL Editor</span>
          </div>
          {validationState && (
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
              validationState.isSafe
                ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
                : 'bg-red-950/60 border-red-800/40 text-red-400'
            }`}>
              {validationState.msg}
            </span>
          )}
        </div>

        <textarea
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          rows={6}
          className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] p-3 font-mono text-xs text-[#D4AF37] rounded-xl focus:outline-none leading-relaxed"
        />
      </div>

      {/* Results & Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results Table */}
        <div className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3">
          <h3 className="font-bold text-white text-sm">Execution Query Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                  <th className="pb-2">region</th>
                  <th className="pb-2">total_revenue</th>
                  <th className="pb-2">order_count</th>
                  <th className="pb-2">avg_order_value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1D24]">
                <tr>
                  <td className="py-2.5 font-bold text-white">North America</td>
                  <td className="py-2.5 font-mono text-[#D4AF37]">$208,000</td>
                  <td className="py-2.5 text-gray-300">580</td>
                  <td className="py-2.5 font-mono text-gray-300">$358.62</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Europe</td>
                  <td className="py-2.5 font-mono text-[#D4AF37]">$128,000</td>
                  <td className="py-2.5 text-gray-300">310</td>
                  <td className="py-2.5 font-mono text-gray-300">$412.90</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Asia-Pacific</td>
                  <td className="py-2.5 font-mono text-[#D4AF37]">$115,000</td>
                  <td className="py-2.5 text-gray-300">380</td>
                  <td className="py-2.5 font-mono text-gray-300">$302.63</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Latin America</td>
                  <td className="py-2.5 font-mono text-[#D4AF37]">$52,000</td>
                  <td className="py-2.5 text-gray-300">150</td>
                  <td className="py-2.5 font-mono text-gray-300">$346.67</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Chart */}
        <AskChart
          spec={{
            type: 'bar',
            title: 'Revenue Distribution by Region ($ USD)',
            data: NORTHSTAR_REVENUE_TREND,
            xAxisKey: 'month',
            yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
            unit: '$'
          }}
        />
      </div>

      {/* Evidence Trace */}
      <EvidencePanel
        evidence={{
          level: 'Verified',
          metricsUsed: ['total_revenue', 'order_count', 'avg_order_value'],
          datasetsReferenced: ['orders'],
          sqlQueryExecuted: sqlQuery
        }}
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  UserPlus, 
  Plus, 
  Zap,
  TrendingDown,
  FileText
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { NORTHSTAR_REVENUE_TREND } from '@/lib/demo/northstar-data';

export default function InvestigationWorkspacePage() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: '1', author: 'Alex Morgan', role: 'Lead Analyst', text: 'Confirmed European fulfillment delay ticket correlation. Recommending inventory re-allocation from US East warehouse.', time: '1 hour ago' }
  ]);

  const steps = [
    {
      index: 1,
      title: 'Macro Revenue Divergence Analysis',
      finding: 'European revenue contracted by 22.4% ($128,000 vs $165,000 previous period).',
      evidence: { level: 'Verified' as const, metricsUsed: ['Revenue MoM'], datasetsReferenced: ['Orders'] }
    },
    {
      index: 2,
      title: 'Category Level Breakdown',
      finding: 'Decline is 82% concentrated in Electronics (Smart IoT Workstation Hub line).',
      evidence: { level: 'Verified' as const, metricsUsed: ['Category YoY Growth'], datasetsReferenced: ['Products', 'Orders'] }
    },
    {
      index: 3,
      title: 'Operational Support Ticket Cross-Correlation',
      finding: 'European support tickets citing Shipping Delays surged by +38% in the last 30 days.',
      evidence: { level: 'Verified' as const, metricsUsed: ['Support CSAT', 'Resolution Hours'], datasetsReferenced: ['Support Tickets'] }
    },
    {
      index: 4,
      title: 'Enterprise Account Churn Risk Assessment',
      finding: 'Accounts Berlin Tech Solutions & London Financial Ltd identified as At Risk ($99,900 combined LTV).',
      evidence: { level: 'Strong evidence' as const, metricsUsed: ['Account LTV', 'CSAT Score'], datasetsReferenced: ['Customers', 'Support Tickets'] }
    }
  ];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now().toString(), author: 'Alex Morgan', role: 'Lead Analyst', text: commentText, time: 'Just now' }
    ]);
    setCommentText('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/app/investigations" className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px] uppercase">Signature Investigation</span>
              <span className="text-xs text-[#9CA3AF]">Thread #INV-104</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">Why did European revenue contract by 22.4%?</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/app/decision-briefs/db-1"
            className="px-3.5 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-xs font-bold text-white rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            <span>Generate Decision Brief</span>
          </Link>
          <button className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors gold-glow">
            <Share2 className="w-4 h-4" />
            <span>Share Thread</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout: Steps Journey (Left/Center) + Evidence & Commentary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Investigation Steps Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center space-x-2">
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Branching Investigation Journey (4 Steps)</span>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.index} className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3 relative shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B0C0E] border border-[#D4AF37] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                      {step.index}
                    </span>
                    <h3 className="font-bold text-white text-base">{step.title}</h3>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                    ✓ Verified
                  </span>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed font-medium bg-[#0B0C0E] p-3.5 rounded-xl border border-[#1A1D24]">
                  {step.finding}
                </p>

                <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-2">
                  <span>Datasets: {step.evidence.datasetsReferenced.join(', ')}</span>
                  <span>Metrics: {step.evidence.metricsUsed.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Summary */}
          <AskChart
            spec={{
              type: 'bar',
              title: 'European Revenue Contraction vs Target',
              data: NORTHSTAR_REVENUE_TREND,
              xAxisKey: 'month',
              yAxisKeys: ['Europe'],
              unit: '$'
            }}
          />
        </div>

        {/* Right Sidebar: Evidence Summary & Team Collaboration */}
        <div className="space-y-6">
          <EvidencePanel
            evidence={{
              level: 'Verified',
              metricsUsed: ['Revenue MoM', 'Support CSAT', 'Order Volume'],
              datasetsReferenced: ['Orders', 'Products', 'Support Tickets', 'Customers'],
              sqlQueryExecuted: `SELECT region, SUM(amount) FROM orders WHERE region = 'Europe' GROUP BY region;`
            }}
          />

          {/* Team Collaboration Comments */}
          <div className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>Team Commentary & Alignment</span>
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div key={c.id} className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span className="font-bold text-white">{c.author} <span className="text-[10px] text-[#C5A059]">({c.role})</span></span>
                    <span className="text-[10px]">{c.time}</span>
                  </div>
                  <p className="text-gray-300">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="space-y-2 pt-2 border-t border-[#1A1D24]">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add team comment or action..."
                className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] p-2.5 text-xs text-white rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg transition-colors gold-glow"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

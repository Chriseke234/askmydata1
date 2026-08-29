'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Send,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { NORTHSTAR_CUSTOMERS, NORTHSTAR_PRODUCTS, NORTHSTAR_REVENUE_TREND, NORTHSTAR_SUMMARY_METRICS } from '@/lib/demo/northstar-data';

export default function DemoPage() {
  const [question, setQuestion] = useState('');
  const [activeAnalysis, setActiveAnalysis] = useState<{
    answer: string;
    chartSpec: any;
    evidence: any;
    followUps: string[];
  } | null>({
    answer: `I reviewed the **Northstar Commerce** dataset for the recent period. Revenue is currently **$485,200**, down **11.8%** month-over-month.

Here are three key observations from the analysis:
1. **European revenue drop**: Europe experienced a **22.4% contraction** ($128,000 vs $165,000 previous period), contributing over 70% of the overall revenue decline.
2. **Order Volume vs Order Value**: Total orders fell **9.4%** (to 1,420 orders), while Average Order Value (AOV) slid **2.6%** to $341.69.
3. **Category Resilience**: The **Home & Office** category continues to grow steadily at **+24.1% YoY**, partially offsetting the decline in **Electronics (-14.5%)**.`,
    chartSpec: {
      type: 'bar',
      title: 'Monthly Revenue Trend by Region ($ USD)',
      data: NORTHSTAR_REVENUE_TREND,
      xAxisKey: 'month',
      yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
      unit: '$'
    },
    evidence: {
      level: 'Verified',
      metricsUsed: ['Revenue MoM', 'Order Volume', 'AOV', 'Regional Revenue Breakdown'],
      datasetsReferenced: ['Orders', 'Customers', 'Products', 'Support Tickets'],
      sqlQueryExecuted: `SELECT region, SUM(amount) as revenue, COUNT(order_id) as orders FROM orders GROUP BY region ORDER BY revenue DESC;`,
      limitations: ['Shipping delay correlation is based on 40 recent support tickets.']
    },
    followUps: [
      'Why is Europe declining faster than other regions?',
      'Which products in Home & Office have the highest margin?',
      'What actions can we take to reduce customer churn in Enterprise accounts?'
    ]
  });

  const handleAsk = (queryText: string) => {
    setQuestion(queryText);
    const q = queryText.toLowerCase();

    if (q.includes('why') || q.includes('europe') || q.includes('fall')) {
      setActiveAnalysis({
        answer: `I conducted a diagnostic investigation into the **European revenue drop**:

1. **Category Driver**: The decline in Europe is heavily concentrated in the **Electronics** category (-22.4%), specifically the *Smart IoT Workstation Hub*.
2. **Support & Fulfillment Correlation**: Support tickets from European accounts citing *Shipping Delay* increased by **38%** over the last 30 days.
3. **Enterprise Churn Risk**: Two key European enterprise accounts (*Berlin Tech Solutions* and *London Financial Ltd*) were flagged as **At Risk** due to unresolved fulfillment tickets.`,
        chartSpec: {
          type: 'line',
          title: 'European Order Volume vs Support Tickets',
          data: [
            { month: 'May 2026', EuropeanOrders: 420, SupportTickets: 12 },
            { month: 'Jun 2026', EuropeanOrders: 390, SupportTickets: 18 },
            { month: 'Jul 2026', EuropeanOrders: 350, SupportTickets: 29 },
            { month: 'Aug 2026', EuropeanOrders: 310, SupportTickets: 42 },
          ],
          xAxisKey: 'month',
          yAxisKeys: ['EuropeanOrders', 'SupportTickets']
        },
        evidence: {
          level: 'Verified',
          metricsUsed: ['Support Ticket CSAT', 'Resolution Hours', 'Regional Order Volume'],
          datasetsReferenced: ['Support Tickets', 'Orders', 'Customers'],
          sqlQueryExecuted: `SELECT customer_id, category, csat_score, resolution_hours FROM support_tickets WHERE region = 'Europe' AND csat_score <= 2;`
        },
        followUps: [
          'What is the estimated revenue risk if Berlin Tech Solutions churns?',
          'Which supplier handles the Smart IoT Hub fulfillment in Europe?',
          'Generate a Decision Brief for leadership on European fulfillment.'
        ]
      });
    } else if (q.includes('product') || q.includes('growing')) {
      setActiveAnalysis({
        answer: `Looking at product category performance across all regions:

- **Top Growth**: **Software** (*Enterprise Analytics Suite*) leads overall margin with **+34.2% YoY** growth.
- **Steady Performer**: **Home & Office** (*Ergonomic Desk Pro* & *Wireless Keyboard*) grew **+24.1% YoY**.
- **Underperforming**: **Electronics** (-14.5% YoY), primarily impacted by component supply constraints in the Smart IoT Hub line.`,
        chartSpec: {
          type: 'bar',
          title: 'Product Category YoY Growth Rates (%)',
          data: [
            { category: 'Software', growth: 34.2 },
            { category: 'Home & Office', growth: 24.1 },
            { category: 'Apparel', growth: 12.0 },
            { category: 'Electronics', growth: -14.5 },
          ],
          xAxisKey: 'category',
          yAxisKeys: ['growth'],
          unit: '%'
        },
        evidence: {
          level: 'Verified',
          metricsUsed: ['YoY Growth Rate', 'Category Revenue Margin'],
          datasetsReferenced: ['Products', 'Orders'],
          sqlQueryExecuted: `SELECT category, AVG(growth_rate_yoy) FROM products GROUP BY category;`
        },
        followUps: [
          'Should we increase marketing spend on Software?',
          'What is the current inventory stock level for Ergonomic Desk Pro?'
        ]
      });
    } else {
      setActiveAnalysis({
        answer: `I analyzed your question against the **Northstar Commerce** dataset:

- **Current Period Revenue**: $485,200 (-11.8% MoM)
- **Top Customer Segment**: Enterprise ($217,200 LTV)
- **Highest Performing Region**: North America ($208,000 / +3.5% growth)

Would you like me to open a deep investigation or build a custom executive dashboard?`,
        chartSpec: {
          type: 'bar',
          title: 'Revenue by Customer Segment ($ USD)',
          data: [
            { segment: 'Enterprise', revenue: 217200 },
            { segment: 'SMB', revenue: 168000 },
            { segment: 'Consumer', revenue: 100000 }
          ],
          xAxisKey: 'segment',
          yAxisKeys: ['revenue'],
          unit: '$'
        },
        evidence: {
          level: 'Verified',
          metricsUsed: ['Segment LTV', 'Revenue Share'],
          datasetsReferenced: ['Customers', 'Orders'],
          sqlQueryExecuted: `SELECT segment, SUM(ltv) FROM customers GROUP BY segment;`
        },
        followUps: [
          'How is the business performing?',
          'Why did revenue fall in Europe last month?'
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="p-4 bg-[#121417] border border-[#D4AF37]/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 gold-border-glow">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Interactive Demo: Northstar Commerce Dataset Loaded</div>
              <div className="text-xs text-[#9CA3AF]">Ask any analytical question below to see AI tool execution, charts, and verification evidence in real-time.</div>
            </div>
          </div>
          <button
            onClick={() => handleAsk('How is the business performing?')}
            className="px-3 py-1.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-[#D4AF37] rounded-lg transition-colors"
          >
            Reset Demo
          </button>
        </div>

        {/* Suggested Questions Grid */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-3 flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            <span>Try these Sample Questions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleAsk('How is the business performing?')}
              className="p-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl text-left text-xs font-medium text-gray-200 transition-colors flex items-center justify-between group"
            >
              <span>"How is the business performing?"</span>
              <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37]" />
            </button>
            <button
              onClick={() => handleAsk('Why did revenue fall in Europe last month?')}
              className="p-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl text-left text-xs font-medium text-gray-200 transition-colors flex items-center justify-between group"
            >
              <span>"Why did sales drop in Europe last month?"</span>
              <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37]" />
            </button>
            <button
              onClick={() => handleAsk('Which products are growing fastest?')}
              className="p-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl text-left text-xs font-medium text-gray-200 transition-colors flex items-center justify-between group"
            >
              <span>"Which products are growing fastest?"</span>
              <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37]" />
            </button>
          </div>
        </div>

        {/* AI Output Workspace */}
        {activeAnalysis && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* AI Response Card */}
            <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-[#1A1D24] pb-3">
                <img src="/logo.png" alt="AskMyData Bot" className="w-5 h-5 object-contain" />
                <span className="font-bold text-white text-sm">AskMyData AI Analyst Response</span>
              </div>
              <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                {activeAnalysis.answer}
              </div>
            </div>

            {/* Visual Chart */}
            <AskChart spec={activeAnalysis.chartSpec} />

            {/* Evidence & Verification Panel */}
            <EvidencePanel evidence={activeAnalysis.evidence} />

            {/* Follow-up Chips */}
            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
              <div className="text-xs font-semibold text-[#9CA3AF]">Suggested Follow-up Questions:</div>
              <div className="flex flex-wrap gap-2">
                {activeAnalysis.followUps.map((fu, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(fu)}
                    className="px-3 py-1.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] rounded-lg text-xs text-[#D4AF37] transition-colors"
                  >
                    {fu} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); if (question.trim()) handleAsk(question); }} className="sticky bottom-4 z-30 flex items-center p-2 bg-[#121417] border border-[#D4AF37]/50 rounded-xl shadow-2xl gold-border-glow">
          <img src="/logo.png" alt="Icon" className="w-5 h-5 object-contain ml-2 shrink-0" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask Northstar Commerce dataset anything..."
            className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-[#9CA3AF] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-lg text-xs flex items-center space-x-1 transition-colors"
          >
            <span>Analyze</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </main>
    </div>
  );
}

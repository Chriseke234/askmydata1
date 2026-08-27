'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Database,
  Code,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

export function HeroWorkflowCard() {
  const [activeStep, setActiveStep] = useState<'ask' | 'investigate' | 'verify' | 'decide'>('ask');
  const [autoRotate, setAutoRotate] = useState(true);

  const steps = [
    { id: 'ask', number: '01', title: 'ASK', icon: MessageSquare, label: 'Plain English Query' },
    { id: 'investigate', number: '02', title: 'INVESTIGATE', icon: Search, label: 'Root Cause Engine' },
    { id: 'verify', number: '03', title: 'VERIFY', icon: ShieldCheck, label: 'SQL Evidence Trace' },
    { id: 'decide', number: '04', title: 'DECIDE', icon: FileText, label: 'Executive Decision Brief' },
  ];

  // Auto-rotate steps every 4.5 seconds unless user manually interacts
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 'ask') return 'investigate';
        if (prev === 'investigate') return 'verify';
        if (prev === 'verify') return 'decide';
        return 'ask';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleStepClick = (stepId: 'ask' | 'investigate' | 'verify' | 'decide') => {
    setAutoRotate(false);
    setActiveStep(stepId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-[#D4AF37]/40 bg-[#0B0C0E]/95 backdrop-blur-xl p-4 sm:p-6 shadow-2xl gold-border-glow text-left space-y-6">
      {/* Window Controls & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1A1D24] gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-[#9CA3AF] font-mono ml-2">askmydata.app/investigation/eu-revenue-q3</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full font-mono font-bold flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Product Engine Preview</span>
          </span>
        </div>
      </div>

      {/* 4-Step Interactive Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#121417] p-1.5 rounded-2xl border border-[#1A1D24]">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id as any)}
              className={`p-3 rounded-xl transition-all flex flex-col items-start space-y-1 text-left ${
                isActive
                  ? 'bg-[#0B0C0E] border border-[#D4AF37] text-white shadow-lg'
                  : 'hover:bg-[#1A1D24] text-[#9CA3AF] hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'bg-[#1A1D24] text-[#9CA3AF]'
                }`}>
                  {step.number}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`} />
              </div>
              <div className="font-bold text-xs tracking-wide">{step.title}</div>
              <div className="text-[10px] opacity-80 line-clamp-1">{step.label}</div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Visual Display */}
      <div className="min-h-[260px] p-5 bg-[#121417]/80 rounded-2xl border border-[#1A1D24] relative overflow-hidden">
        {/* Step 1: ASK */}
        {activeStep === 'ask' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Step 1: Plain English Natural Inquiry</span>
            </div>

            <div className="p-4 bg-[#0B0C0E] border border-[#262B36] rounded-xl flex items-start space-x-3 shadow-inner">
              <div className="w-8 h-8 rounded-lg bg-[#1A1D24] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 font-bold text-xs">
                CEO
              </div>
              <div className="space-y-1">
                <div className="text-xs text-[#9CA3AF]">User Inquiry</div>
                <div className="text-sm font-semibold text-white">
                  "Why did revenue fall in Europe last month, and which customer segment was affected most?"
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#0B0C0E]/60 border border-[#1A1D24] rounded-xl flex items-center justify-between text-xs text-[#9CA3AF]">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-[#D4AF37]" />
                <span>Connected Source: <strong className="text-white">Production Business Postgres</strong></span>
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Schema Profiled</span>
              </span>
            </div>
          </div>
        )}

        {/* Step 2: INVESTIGATE */}
        {activeStep === 'investigate' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <Search className="w-4 h-4" />
                <span>Step 2: Multi-Step Root Cause Investigation</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded font-mono">
                Anomaly Detected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#0B0C0E] border border-red-900/40 rounded-xl space-y-1">
                <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Finding #1 — Macro</div>
                <div className="font-bold text-red-400 flex items-center space-x-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>EU Revenue: -22.4%</span>
                </div>
                <p className="text-[11px] text-gray-300">$128k in July vs $165k in June</p>
              </div>

              <div className="p-3 bg-[#0B0C0E] border border-[#262B36] rounded-xl space-y-1">
                <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Finding #2 — Product</div>
                <div className="font-bold text-white">Electronics Category</div>
                <p className="text-[11px] text-gray-300">Smart IoT Hubs dropped 34% in Germany</p>
              </div>

              <div className="p-3 bg-[#0B0C0E] border border-[#262B36] rounded-xl space-y-1">
                <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Finding #3 — Operations</div>
                <div className="font-bold text-amber-400 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Logistics Bottleneck</span>
                </div>
                <p className="text-[11px] text-gray-300">38% spike in delivery delay support tickets</p>
              </div>
            </div>

            <div className="p-3 bg-[#0B0C0E] border border-[#D4AF37]/30 rounded-xl text-xs text-gray-200">
              <span className="text-[#D4AF37] font-bold">Root Cause Conclusion:</span> Revenue decline in Europe is concentrated in German Electronics orders caused by logistics fulfillment delays, placing returning enterprise accounts at risk.
            </div>
          </div>
        )}

        {/* Step 3: VERIFY */}
        {activeStep === 'verify' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Step 3: Audit Evidence & SQL Transparency</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Certified</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
                <div className="text-[10px] text-[#9CA3AF]">Source Dataset</div>
                <div className="font-bold text-white font-mono text-[11px]">business_orders</div>
              </div>
              <div className="p-2.5 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
                <div className="text-[10px] text-[#9CA3AF]">Records Analyzed</div>
                <div className="font-bold text-white font-mono text-[11px]">184,203 rows</div>
              </div>
              <div className="p-2.5 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
                <div className="text-[10px] text-[#9CA3AF]">Certified Metric</div>
                <div className="font-bold text-[#D4AF37] font-mono text-[11px]">Net Revenue</div>
              </div>
              <div className="p-2.5 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
                <div className="text-[10px] text-[#9CA3AF]">Query Guardrail</div>
                <div className="font-bold text-emerald-400 font-mono text-[11px]">Read-Only SQL</div>
              </div>
            </div>

            <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl text-xs space-y-1">
              <div className="text-[#9CA3AF] flex items-center space-x-1.5 text-[10px] font-bold uppercase">
                <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Executable Read-Only Audit SQL</span>
              </div>
              <pre className="p-2 bg-[#121417] text-[#D4AF37] font-mono text-[11px] rounded border border-[#1A1D24] overflow-x-auto">
                {`SELECT region, category, SUM(price * qty - discount) AS net_revenue 
FROM business_orders 
WHERE period IN ('2026-06', '2026-07') AND region = 'Europe' 
GROUP BY 1, 2 ORDER BY net_revenue ASC;`}
              </pre>
            </div>
          </div>
        )}

        {/* Step 4: DECIDE */}
        {activeStep === 'decide' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Step 4: Executive Decision Brief & Recommended Action</span>
              </div>
              <span className="text-[10px] px-2.5 py-1 bg-[#D4AF37] text-black font-extrabold rounded-lg shadow-sm">
                Ready to Export
              </span>
            </div>

            <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-xl space-y-3">
              <div className="font-bold text-white text-sm border-b border-[#1A1D24] pb-2 flex items-center justify-between">
                <span>Executive Decision Brief: EU Revenue Recovery</span>
                <span className="text-xs text-[#9CA3AF] font-normal">Generated for Executive Leadership</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="text-[#D4AF37] font-bold text-[11px] uppercase">Key Risks</div>
                  <p className="text-gray-300">Enterprise accounts flagged as churn risks due to shipping delays.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-400 font-bold text-[11px] uppercase">Recommended Action Plan</div>
                  <ul className="list-disc list-inside text-gray-300 space-y-0.5 text-[11px]">
                    <li>Re-route German orders to Amsterdam fulfillment center.</li>
                    <li>Initiate VIP account manager outreach to at-risk accounts.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 text-xs pt-1">
              <button className="px-3 py-1.5 bg-[#1A1D24] hover:bg-[#262B36] text-white rounded-lg transition-colors font-medium">
                Share with Team
              </button>
              <button className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-lg transition-colors flex items-center space-x-1">
                <span>Export Brief PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

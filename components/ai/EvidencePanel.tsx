'use client';

import React from 'react';
import { ShieldCheck, Database, Code, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';

interface EvidencePanelProps {
  evidence: {
    level: 'Verified' | 'Strong evidence' | 'Limited evidence' | 'Exploratory';
    metricsUsed: string[];
    datasetsReferenced: string[];
    sqlQueryExecuted?: string;
    limitations?: string[];
  };
}

export function EvidencePanel({ evidence }: EvidencePanelProps) {
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'Verified':
        return 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]';
      case 'Strong evidence':
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
      default:
        return 'bg-amber-500/20 border-amber-500 text-amber-400';
    }
  };

  return (
    <div className="bg-[#121417] border border-[#1A1D24] rounded-xl p-4 space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1A1D24]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-bold text-white text-sm">Evidence & Verification</span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${getBadgeStyle(evidence.level)}`}>
          ✓ {evidence.level}
        </span>
      </div>

      {/* Datasets & Metrics Used */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
          <div className="text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
            <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Data Sources</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {evidence.datasetsReferenced.map((ds, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-[#1A1D24] text-white rounded text-[11px]">
                {ds}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg">
          <div className="text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Certified Metrics</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {evidence.metricsUsed.map((m, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-[#1A1D24] text-[#D4AF37] rounded text-[11px] font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SQL Query Audit Trace */}
      {evidence.sqlQueryExecuted && (
        <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg text-xs space-y-1">
          <div className="text-[#9CA3AF] flex items-center space-x-1.5">
            <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Executed SQL Trace</span>
          </div>
          <pre className="p-2 bg-[#121417] text-[#D4AF37] font-mono text-[11px] rounded overflow-x-auto border border-[#1A1D24]">
            {evidence.sqlQueryExecuted}
          </pre>
        </div>
      )}

      {/* Limitations & Caveats */}
      {evidence.limitations && evidence.limitations.length > 0 && (
        <div className="p-3 bg-[#0B0C0E] border border-amber-900/30 rounded-lg text-xs space-y-1">
          <div className="text-amber-400 flex items-center space-x-1.5 font-semibold text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Analytical Limitations</span>
          </div>
          <ul className="list-disc list-inside text-[#9CA3AF] space-y-0.5 text-[11px]">
            {evidence.limitations.map((lim, idx) => (
              <li key={idx}>{lim}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

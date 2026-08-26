'use client';

import React from 'react';
import { Bell, Plus, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  const alerts = [
    { id: '1', metric: 'Monthly Revenue Drop', condition: 'Contraction > 10.0%', status: 'Triggered (Alert Sent)', lastTriggered: 'Today at 09:14 AM' },
    { id: '2', metric: 'Customer Churn Rate', condition: 'Churn > 5.0%', status: 'Active (Monitoring)', lastTriggered: 'Never' },
    { id: '3', metric: 'European Support Delays', condition: 'Delay Tickets > 30', status: 'Triggered (Alert Sent)', lastTriggered: 'Yesterday at 04:30 PM' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Metric Anomaly & Alert Rules</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Configure automated notifications for critical threshold breaches.</p>
        </div>

        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow">
          <Plus className="w-4 h-4" />
          <span>New Alert Rule</span>
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((al) => (
          <div key={al.id} className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{al.metric}</h3>
                <span className="text-xs text-[#9CA3AF]">Condition: <strong className="text-white">{al.condition}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <span className={`px-3 py-1 rounded-full font-bold ${
                al.status.includes('Triggered') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {al.status}
              </span>
              <span className="text-[#9CA3AF]">{al.lastTriggered}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

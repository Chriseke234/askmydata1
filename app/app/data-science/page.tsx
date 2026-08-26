'use client';

import React, { useState } from 'react';
import { FlaskConical, Sparkles, Sliders, TrendingUp, Cpu, BarChart2, ShieldCheck } from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';

export default function DataScienceWorkspacePage() {
  const [marketingIncrease, setMarketingIncrease] = useState(20);

  const baselineRevenue = 485200;
  const projectedRevenue = Math.round(baselineRevenue * (1 + (marketingIncrease * 0.45) / 100));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Data Science Workspace</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Statistical analysis, time-series forecasting, ML experiment tracking, and scenario simulation.</p>
        </div>

        <div className="px-3 py-1.5 bg-[#121417] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-lg flex items-center space-x-1.5">
          <FlaskConical className="w-4 h-4" />
          <span>Isolated Compute Architecture</span>
        </div>
      </div>

      {/* Scenario Analysis Simulator Widget */}
      <div className="p-6 bg-[#121417] border border-[#D4AF37]/50 rounded-2xl space-y-6 shadow-xl gold-border-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-bold text-white text-base">Scenario Analysis Simulator: "What-If" Engine</h2>
          </div>
          <span className="text-xs text-[#9CA3AF]">Statistical Regression Model • 95% Confidence Interval</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9CA3AF]">Simulated Marketing Spend Adjustment:</span>
            <span className="font-bold text-[#D4AF37] text-base">+{marketingIncrease}% Spend</span>
          </div>
          <input
            type="range"
            min="-50"
            max="100"
            value={marketingIncrease}
            onChange={(e) => setMarketingIncrease(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl space-y-1">
              <div className="text-xs text-[#9CA3AF]">Baseline Revenue Projection</div>
              <div className="text-xl font-bold text-white">${baselineRevenue.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-xl space-y-1">
              <div className="text-xs text-[#D4AF37] font-bold uppercase">Simulated Projected Revenue</div>
              <div className="text-2xl font-extrabold text-white">${projectedRevenue.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400 font-bold">
                Projected Impact: +{((projectedRevenue - baselineRevenue) / baselineRevenue * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecasting & ML Model Tracking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time-Series Forecast */}
        <AskChart
          spec={{
            type: 'line',
            title: 'Q3-Q4 Time-Series Revenue Forecast (ARIMA/Prophet Model)',
            description: 'Shaded area represents 95% statistical confidence bounds.',
            data: [
              { month: 'Jul 2026', Actual: 500000, Forecast: 500000 },
              { month: 'Aug 2026', Actual: 485200, Forecast: 485200 },
              { month: 'Sep 2026', Forecast: 512000 },
              { month: 'Oct 2026', Forecast: 535000 },
              { month: 'Nov 2026', Forecast: 570000 },
              { month: 'Dec 2026', Forecast: 610000 },
            ],
            xAxisKey: 'month',
            yAxisKeys: ['Actual', 'Forecast'],
            unit: '$'
          }}
        />

        {/* ML Model Tracking Registry */}
        <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-base">ML Model Registry & Tracking</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Customer Churn Classifier v2.1</div>
                <div className="text-[11px] text-[#9CA3AF]">XGBoost • Trained on 10,000 accounts</div>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded">AUC: 0.92</span>
            </div>

            <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Revenue Anomaly Detector v1.4</div>
                <div className="text-[11px] text-[#9CA3AF]">Isolation Forest • Real-time stream</div>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded">F1: 0.89</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

interface ChartProps {
  spec: {
    type: 'kpi' | 'line' | 'bar' | 'area' | 'scatter' | 'donut';
    title: string;
    description?: string;
    data: any[];
    xAxisKey?: string;
    yAxisKeys?: string[];
    unit?: string;
  };
}

export function AskChart({ spec }: ChartProps) {
  if (!spec || !spec.data || spec.data.length === 0) {
    return (
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-xl text-center text-sm text-[#9CA3AF]">
        No chart data available to render.
      </div>
    );
  }

  const { type, title, description, data, xAxisKey = 'month', yAxisKeys = ['value'], unit = '' } = spec;

  const GOLD = '#D4AF37';
  const LIGHT_GOLD = '#E5B800';
  const WHITE = '#FFFFFF';
  const NEUTRAL_GRAY = '#9CA3AF';
  const DARK_GRAY = '#262B36';

  const colorPalette = [GOLD, WHITE, '#C5A059', '#6B7280', '#D1D5DB'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-[#0B0C0E] border border-[#D4AF37]/50 rounded-lg shadow-xl text-xs">
          <div className="font-semibold text-white mb-1">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
              <span className="font-bold text-white">
                {unit}{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#121417] border border-[#1A1D24] rounded-xl p-4 sm:p-5 gold-border-glow">
      <div className="mb-4">
        <h4 className="font-bold text-white text-base tracking-wide flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[10px] px-2 py-0.5 bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] rounded font-bold uppercase">
            {type.toUpperCase()}
          </span>
        </h4>
        {description && <p className="text-xs text-[#9CA3AF] mt-1">{description}</p>}
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
              <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} tickFormatter={(val) => `${unit}${val / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
              {yAxisKeys.map((key, idx) => (
                <Bar key={key} dataKey={key} fill={colorPalette[idx % colorPalette.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          ) : type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
              <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              {yAxisKeys.map((key, idx) => (
                <Area key={key} type="monotone" dataKey={key} stroke={GOLD} fill="url(#colorGold)" fillOpacity={0.2} />
              ))}
              <defs>
                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={GOLD} stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
              <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
              {yAxisKeys.map((key, idx) => (
                <Line key={key} type="monotone" dataKey={key} stroke={colorPalette[idx % colorPalette.length]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

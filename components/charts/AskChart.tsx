'use client';

import React, { useState, useRef } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  BarChart2,
  LineChart as LineChartIcon,
  TrendingUp,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Download,
  Image as ImageIcon,
  Check
} from 'lucide-react';

interface ChartProps {
  spec: {
    type: 'kpi' | 'line' | 'bar' | 'area' | 'scatter' | 'donut' | 'pie';
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
      <div className="p-6 bg-[#121417]/80 backdrop-blur-md border border-[#1A1D24] rounded-2xl text-center text-sm text-[#9CA3AF]">
        No chart data available to render.
      </div>
    );
  }

  const { title, description, data, xAxisKey = 'month', yAxisKeys = ['value'], unit = '' } = spec;

  // Local state for interactive view switching (bar, line, area, pie, table)
  const [activeType, setActiveType] = useState<'bar' | 'line' | 'area' | 'pie' | 'table'>(
    spec.type === 'donut' || spec.type === 'pie' ? 'pie' :
    spec.type === 'area' ? 'area' :
    spec.type === 'line' ? 'line' : 'bar'
  );

  const [copiedNotification, setCopiedNotification] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const GOLD = '#D4AF37';
  const LIGHT_GOLD = '#E5B800';
  const BLUE = '#3B82F6';
  const EMERALD = '#10B981';
  const PURPLE = '#8B5CF6';
  const PINK = '#EC4899';
  const AMBER = '#F59E0B';

  const colorPalette = [GOLD, BLUE, EMERALD, PURPLE, LIGHT_GOLD, PINK, AMBER];

  // Custom Tooltip with glassmorphism style
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-[#0B0C0E]/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl shadow-2xl text-xs space-y-1 z-50">
          {label && <div className="font-bold text-white border-b border-[#1A1D24] pb-1 mb-1">{label}</div>}
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-[#9CA3AF]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="font-medium text-gray-300">{entry.name}:</span>
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

  // CSV Export handler
  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const val = row[header];
            const escaped = typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
            return escaped;
          })
          .join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // PNG Image Export handler
  const handleExportPNG = () => {
    if (!chartRef.current) return;
    const svgElement = chartRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = (svgElement.clientWidth || 800) * 2;
      canvas.height = (svgElement.clientHeight || 400) * 2;
      if (ctx) {
        ctx.fillStyle = '#121417';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${title.toLowerCase().replace(/\s+/g, '_')}_chart.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // Prepare data for Pie Chart
  const primaryYKey = yAxisKeys[0] || 'value';
  const pieData = data.map((d, i) => ({
    name: String(d[xAxisKey] || `Item ${i + 1}`),
    value: Number(d[primaryYKey]) || 0
  }));

  return (
    <div
      ref={chartRef}
      className="bg-[#121417]/90 backdrop-blur-md border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl p-4 sm:p-6 shadow-2xl transition-all duration-300 space-y-4"
    >
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1A1D24] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-white text-base tracking-wide">{title}</h4>
            <span className="text-[10px] px-2 py-0.5 bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] rounded-md font-mono font-bold uppercase tracking-wider">
              {activeType.toUpperCase()}
            </span>
          </div>
          {description && <p className="text-xs text-[#9CA3AF] mt-1">{description}</p>}
        </div>

        {/* View Switcher & Export Actions */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {/* View Type Toggle Group */}
          <div className="flex items-center p-1 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl space-x-1">
            <button
              onClick={() => setActiveType('bar')}
              title="Bar Chart"
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${
                activeType === 'bar'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveType('line')}
              title="Line Chart"
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${
                activeType === 'line'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveType('area')}
              title="Area Chart"
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${
                activeType === 'area'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveType('pie')}
              title="Pie / Donut Chart"
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${
                activeType === 'pie'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveType('table')}
              title="Data Table View"
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${
                activeType === 'table'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-px bg-[#1A1D24] mx-1 hidden sm:block" />

          {/* Export Actions */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleExportCSV}
              title="Export CSV Data"
              className="px-2.5 py-1.5 bg-[#0B0C0E] hover:bg-[#1A1D24] border border-[#262B36] hover:border-[#D4AF37]/50 rounded-xl text-xs text-[#9CA3AF] hover:text-[#D4AF37] transition-all flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">CSV</span>
            </button>

            <button
              onClick={handleExportPNG}
              title="Export PNG Image"
              className="px-2.5 py-1.5 bg-[#0B0C0E] hover:bg-[#1A1D24] border border-[#262B36] hover:border-[#D4AF37]/50 rounded-xl text-xs text-[#9CA3AF] hover:text-[#D4AF37] transition-all flex items-center space-x-1"
            >
              {copiedNotification ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline font-semibold">
                {copiedNotification ? 'Exported!' : 'PNG'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Render Canvas / Table View */}
      <div className="w-full h-64 sm:h-72">
        {activeType === 'table' ? (
          <div className="w-full h-full overflow-auto border border-[#1A1D24] rounded-xl bg-[#0B0C0E]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121417] text-[#D4AF37] border-b border-[#1A1D24] sticky top-0">
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2.5 font-bold capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1D24] text-gray-300">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#121417]/60 transition-colors">
                    {Object.values(row).map((val: any, colIdx) => (
                      <td key={colIdx} className="px-4 py-2 whitespace-nowrap font-mono text-[11px]">
                        {typeof val === 'number' ? `${unit}${val.toLocaleString()}` : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {activeType === 'bar' ? (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
                <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} tickFormatter={(val) => `${unit}${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
                {yAxisKeys.map((key, idx) => (
                  <Bar key={key} dataKey={key} fill={colorPalette[idx % colorPalette.length]} radius={[6, 6, 0, 0]} />
                ))}
              </BarChart>
            ) : activeType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
                <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
                {yAxisKeys.map((key, idx) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colorPalette[idx % colorPalette.length]}
                    fill="url(#colorGold)"
                    fillOpacity={0.25}
                  />
                ))}
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={GOLD} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            ) : activeType === 'pie' ? (
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} stroke="#0B0C0E" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
                <XAxis dataKey={xAxisKey} stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
                {yAxisKeys.map((key, idx) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colorPalette[idx % colorPalette.length]}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: colorPalette[idx % colorPalette.length], stroke: '#0B0C0E', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}


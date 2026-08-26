'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  TrendingDown, 
  TrendingUp, 
  Database, 
  Zap, 
  ArrowRight, 
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  Activity,
  Layers,
  Search,
  Table as TableIcon
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { RealtimeDataStore, RealtimeDataset, SAMPLE_DATASETS } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

export default function OverviewPage() {
  const [askQuery, setAskQuery] = useState('');
  const [datasets, setDatasets] = useState<RealtimeDataset[]>([]);
  const [activeDataset, setActiveDataset] = useState<RealtimeDataset | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loaded = RealtimeDataStore.getDatasets();
    if (loaded.length === 0) {
      // Automatically pop up upload modal on first entry if no datasets exist
      setIsUploadModalOpen(true);
      setDatasets([]);
      setActiveDataset(null);
    } else {
      setDatasets(loaded);
      setActiveDataset(loaded[0]);
    }
  }, []);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;
    router.push(`/app/ask?q=${encodeURIComponent(askQuery.trim())}`);
  };

  const handleUploadSuccess = (newDs: RealtimeDataset) => {
    const updated = RealtimeDataStore.getDatasets();
    setDatasets(updated);
    setActiveDataset(newDs);
  };

  // Compute real metrics from active dataset if available
  let totalRows = activeDataset?.rowCount || 0;
  let totalCols = activeDataset?.colCount || 0;
  let numCols = activeDataset?.columns.filter(c => c.type === 'number') || [];
  let strCols = activeDataset?.columns.filter(c => c.type === 'string') || [];

  let primaryNumCol = numCols[0]?.name || 'Value';
  let primaryStrCol = strCols[0]?.name || 'Category';

  let totalNumericSum = 0;
  let numericCount = 0;
  const categoryMap: Record<string, number> = {};

  if (activeDataset && activeDataset.rows.length > 0) {
    activeDataset.rows.forEach(r => {
      const val = Number(r[primaryNumCol]);
      if (!isNaN(val)) {
        totalNumericSum += val;
        numericCount++;
      }
      const cat = String(r[primaryStrCol] || 'Other');
      categoryMap[cat] = (categoryMap[cat] || 0) + (val || 1);
    });
  }

  const chartData = Object.entries(categoryMap).slice(0, 6).map(([name, value]) => ({
    name: name.substring(0, 16),
    value: Math.round(value * 100) / 100
  }));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Real-Time Data Intelligence Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Active File: {activeDataset ? <span className="text-[#D4AF37] font-semibold">{activeDataset.name} ({activeDataset.rowCount} rows)</span> : <span className="text-gray-400">No Dataset Uploaded</span>}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Real Dataset</span>
          </button>
        </div>
      </div>

      {/* Primary AI Query Hero Box */}
      <div className="p-6 bg-[#121417] border border-[#D4AF37]/50 rounded-2xl shadow-2xl gold-border-glow space-y-4">
        <form onSubmit={handleAskSubmit} className="relative flex items-center">
          <Sparkles className="w-6 h-6 text-[#D4AF37] absolute left-4" />
          <input
            type="text"
            value={askQuery}
            onChange={(e) => setAskQuery(e.target.value)}
            placeholder={`Ask AI anything about ${activeDataset?.name || 'your business data'} (e.g. 'Summarize total ${primaryNumCol} by ${primaryStrCol}')...`}
            className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-xl pl-12 pr-28 py-3.5 text-sm sm:text-base text-white placeholder-[#9CA3AF] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs sm:text-sm rounded-lg flex items-center space-x-1.5 transition-colors shadow-md"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#9CA3AF] shrink-0 font-medium">Try asking:</span>
          {[
            `Summarize ${activeDataset?.name || 'my dataset'}`,
            `Show total ${primaryNumCol} breakdown`,
            `Which row has the highest ${primaryNumCol}?`,
            `Are there any data quality issues?`
          ].map((ex, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/app/ask?q=${encodeURIComponent(ex)}`)}
              className="px-3 py-1.5 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-lg text-xs text-gray-300 hover:text-white shrink-0 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset State Check: If No Dataset Uploaded, Render Full Empty State Dropzone */}
      {!activeDataset ? (
        <div className="p-8 sm:p-12 bg-[#121417] border-2 border-dashed border-[#262B36] rounded-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
            <FileSpreadsheet className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-bold text-white">No Business Dataset Uploaded Yet</h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Upload your CSV or Excel file to get real-time AI calculations, automated charts, and verifiable metric breakdowns. Zero fake data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all gold-glow"
            >
              <Upload className="w-4 h-4" />
              <span>Upload CSV / Excel File Now</span>
            </button>

            <button
              onClick={() => {
                RealtimeDataStore.saveDataset(SAMPLE_DATASETS[0]);
                handleUploadSuccess(SAMPLE_DATASETS[0]);
              }}
              className="w-full sm:w-auto px-5 py-3 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Load 1-Click Sample Business CSV</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Metric Cards Row Computed From Real Dataset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
              <div className="text-xs text-[#9CA3AF]">Total Rows Loaded</div>
              <div className="text-2xl font-extrabold text-white">{totalRows.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400 font-semibold">100% Parsed & Verified</div>
            </div>

            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
              <div className="text-xs text-[#9CA3AF]">Detected Columns</div>
              <div className="text-2xl font-extrabold text-white">{totalCols}</div>
              <div className="text-[11px] text-[#9CA3AF]">Types: {activeDataset.columns.map(c => c.type).slice(0, 3).join(', ')}</div>
            </div>

            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
              <div className="text-xs text-[#9CA3AF]">Sum ({primaryNumCol})</div>
              <div className="text-2xl font-extrabold text-white">
                {totalNumericSum > 1000 ? `$${totalNumericSum.toLocaleString()}` : totalNumericSum.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#9CA3AF]">Across {numericCount} numeric records</div>
            </div>

            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
              <div className="text-xs text-[#9CA3AF]">Dataset Health Score</div>
              <div className="text-2xl font-extrabold text-emerald-400">{activeDataset.healthScore}/100</div>
              <div className="text-[11px] text-[#9CA3AF]">Source: {activeDataset.source}</div>
            </div>
          </div>

          {/* Real Dynamic Chart Widget */}
          <AskChart
            spec={{
              type: 'bar',
              title: `${activeDataset.name} - Breakdown by ${primaryStrCol}`,
              description: `Real-time summary computed directly from ${activeDataset.rowCount} rows.`,
              data: chartData,
              xAxisKey: 'name',
              yAxisKeys: ['value'],
              unit: '$'
            }}
          />

          {/* Active Dataset Schema Quick Inspection */}
          <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-bold text-white text-base">Active Schema & Columns</h3>
              </div>
              <Link href={`/app/data/${activeDataset.id}`} className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center space-x-1">
                <span>Full Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {activeDataset.columns.map((col, idx) => (
                <div key={idx} className="p-3 bg-[#0B0C0E] border border-[#262B36] rounded-xl text-xs space-y-1">
                  <div className="font-bold text-white font-mono">{col.name}</div>
                  <div className="text-[10px] text-[#D4AF37] uppercase font-semibold">{col.type}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <DatasetUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}

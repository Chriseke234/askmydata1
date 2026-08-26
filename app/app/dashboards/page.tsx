'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

export default function DashboardsPage() {
  const [activeDataset, setActiveDataset] = useState<RealtimeDataset | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const loaded = RealtimeDataStore.getDatasets();
    if (loaded.length > 0) {
      setActiveDataset(loaded[0]);
    }
  }, []);

  const numCol = activeDataset?.columns.find(c => c.type === 'number')?.name || 'value';
  const strCol = activeDataset?.columns.find(c => c.type === 'string')?.name || 'category';

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Dashboards Workspace</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Interactive dashboards generated from your real business data.</p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Dataset</span>
        </button>
      </div>

      {!activeDataset ? (
        <div className="p-8 sm:p-12 bg-[#121417] border-2 border-dashed border-[#262B36] rounded-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-white">No Dashboards Created Yet</h3>
            <p className="text-xs text-[#9CA3AF]">
              Upload a business dataset to generate interactive dashboards, visual chart widgets, and real-time metric trackers.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all gold-glow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Dataset to Build Dashboard</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href={`/app/ask?q=${encodeURIComponent(`Build interactive dashboard for ${activeDataset.name}`)}`}
            className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-xl"
          >
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Dashboard</span>
              </div>
              <span>{activeDataset.colCount} Widgets</span>
            </div>

            <h2 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
              {activeDataset.name} Command Center
            </h2>

            <p className="text-xs text-[#9CA3AF]">
              Breakdown of {numCol} by {strCol} across {activeDataset.rowCount} rows.
            </p>

            <div className="pt-3 border-t border-[#1A1D24] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Real Dataset</span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      )}

      <DatasetUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={(ds) => setActiveDataset(ds)}
      />
    </div>
  );
}

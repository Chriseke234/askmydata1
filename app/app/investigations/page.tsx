'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, ArrowRight, Clock, Database, Sparkles, Upload } from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

export default function InvestigationsHubPage() {
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Persistent Investigations Hub</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Multi-step analytical journeys tracing root causes and verified decision evidence.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/app/ask?q=${encodeURIComponent(`Investigate root cause of ${numCol} variations in ${activeDataset?.name || 'my dataset'}`)}`}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Start AI Investigation</span>
          </Link>
        </div>
      </div>

      {!activeDataset ? (
        <div className="p-8 sm:p-12 bg-[#121417] border-2 border-dashed border-[#262B36] rounded-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
            <Search className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-white">No Active Investigations Yet</h3>
            <p className="text-xs text-[#9CA3AF]">
              Upload a business dataset to run multi-step root cause investigations and generate verified evidence panels.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all gold-glow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Dataset to Investigate</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/app/ask?q=${encodeURIComponent(`Investigate ${numCol} distribution across ${strCol}`)}`}
            className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Active Investigation • Real Dataset Thread
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                Active Analysis
              </span>
            </div>

            <h2 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
              Root Cause Analysis of {numCol} in {activeDataset.name}
            </h2>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Evaluating variation drivers across {activeDataset.rowCount} records and {activeDataset.colCount} column dimensions ({strCol}, {numCol}).
            </p>

            <div className="pt-3 border-t border-[#1A1D24] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Updated recently</span>
              </span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Open in AI Workspace</span>
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Upload, ArrowRight } from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

export default function SavedAnalysesPage() {
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Saved Analyses & SQL Canvas</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Explore, write read-only queries, format, and audit analytical computations.</p>
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
            <BarChart3 className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-white">No Saved Analyses Created Yet</h3>
            <p className="text-xs text-[#9CA3AF]">
              Upload a business dataset to write read-only queries, inspect column distributions, and save SQL canvases.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all gold-glow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Dataset to Start Analysis</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            href={`/app/ask?q=${encodeURIComponent(`SELECT ${strCol}, SUM(${numCol}) FROM "${activeDataset.name}" GROUP BY 1;`)}`}
            className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 transition-all group shadow-md"
          >
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Analysis Canvas</span>
            </div>

            <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">
              {activeDataset.name} Summary Query
            </h3>

            <pre className="p-2 bg-[#0B0C0E] text-[#9CA3AF] font-mono text-[10px] rounded border border-[#1A1D24] truncate">
              SELECT {strCol}, SUM({numCol}) FROM "{activeDataset.name}" GROUP BY 1;
            </pre>

            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-[#1A1D24]">
              <span>Dataset: {activeDataset.name}</span>
              <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                <span>Open Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
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

'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, FileSpreadsheet, CheckCircle2, AlertCircle, Database, Sparkles } from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset, SAMPLE_DATASETS } from '@/lib/data/realtime-store';

interface DatasetUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (dataset: RealtimeDataset) => void;
}

export function DatasetUploadModal({ isOpen, onClose, onSuccess }: DatasetUploadModalProps) {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewDataset, setPreviewDataset] = useState<RealtimeDataset | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
        throw new Error('Please select a valid CSV or JSON data file.');
      }
      const parsed = await RealtimeDataStore.parseCSVFile(file);
      setPreviewDataset(parsed);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse file. Please check file format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmSave = () => {
    if (!previewDataset) return;
    RealtimeDataStore.saveDataset(previewDataset);
    if (onSuccess) onSuccess(previewDataset);
    setPreviewDataset(null);
    onClose();
    router.push(`/app/ask?ds=${previewDataset.id}&autoRead=1`);
  };

  const handleLoadSample = (sample: RealtimeDataset) => {
    RealtimeDataStore.saveDataset(sample);
    if (onSuccess) onSuccess(sample);
    onClose();
    router.push(`/app/ask?ds=${sample.id}&autoRead=1`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121417] border border-[#262B36] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="p-5 border-b border-[#1A1D24] flex items-center justify-between bg-[#0B0C0E]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#121417] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Upload Real Business Dataset</h2>
              <p className="text-xs text-[#9CA3AF]">Parse CSV / JSON instantly and let AI read your data.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {!previewDataset ? (
            <>
              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-[0.99]'
                    : 'border-[#262B36] hover:border-[#D4AF37]/50 bg-[#0B0C0E]/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.json,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                />

                <div className="w-14 h-14 rounded-2xl bg-[#121417] border border-[#262B36] text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FileSpreadsheet className="w-7 h-7" />
                  )}
                </div>

                <h3 className="text-sm font-bold text-white">
                  {isProcessing ? 'Parsing Columns & Reading Dataset Schema...' : 'Drop your CSV dataset here, or click to browse'}
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Supports CSV, TSV, and JSON formats up to 50,000 rows. Instant AI reading and visualization.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Sample Templates Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#9CA3AF]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Or try a 1-click business sample dataset:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_DATASETS.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleLoadSample(sample)}
                      className="p-3 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/60 rounded-xl text-left transition-all hover:scale-[1.01] group space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">{sample.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full font-bold">
                          {sample.rowCount} rows
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9CA3AF] line-clamp-2">{sample.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Preview Dataset Area */
            <div className="space-y-4">
              <div className="p-4 bg-[#0B0C0E] border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{previewDataset.name}</h4>
                    <p className="text-xs text-emerald-400/90 font-medium">
                      Parsed {previewDataset.rowCount} rows and {previewDataset.colCount} columns ({previewDataset.healthScore}% health)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDataset(null)}
                  className="text-xs text-[#9CA3AF] hover:text-white underline"
                >
                  Choose another
                </button>
              </div>

              {/* Detected Columns */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-300">Detected Schema Columns:</h5>
                <div className="flex flex-wrap gap-2">
                  {previewDataset.columns.map((col, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 bg-[#1A1D24] border border-[#262B36] rounded-lg text-xs flex items-center space-x-1.5"
                    >
                      <span className="font-semibold text-white">{col.name}</span>
                      <span className="text-[10px] text-[#D4AF37] font-mono uppercase">({col.type})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Rows Preview Table */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-300">Data Sample Preview:</h5>
                <div className="border border-[#262B36] rounded-xl overflow-x-auto bg-[#0B0C0E]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#121417] text-[#9CA3AF] border-b border-[#262B36]">
                      <tr>
                        {previewDataset.columns.slice(0, 5).map((col, idx) => (
                          <th key={idx} className="p-2.5 font-bold">{col.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1D24] text-gray-200">
                      {previewDataset.rows.slice(0, 4).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#121417]/60">
                          {previewDataset.columns.slice(0, 5).map((col, cIdx) => (
                            <td key={cIdx} className="p-2.5 whitespace-nowrap">{String(row[col.name] ?? '')}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Confirm Actions */}
              <div className="pt-4 border-t border-[#1A1D24] flex items-center justify-end space-x-3">
                <button
                  onClick={() => setPreviewDataset(null)}
                  className="px-4 py-2 bg-[#1A1D24] hover:bg-[#262B36] text-xs font-semibold text-gray-300 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black text-xs font-bold rounded-xl transition-colors gold-glow flex items-center space-x-1.5"
                >
                  <span>Read Dataset with AI</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

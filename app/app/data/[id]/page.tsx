'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Database, 
  Table, 
  ArrowLeft, 
  Sparkles, 
  Search,
  CheckCircle2,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';

export default function DatasetDetailPage() {
  const params = useParams();
  const datasetId = (params?.id as string) || 'sample-saas-revenue';
  
  const [dataset, setDataset] = useState<RealtimeDataset | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loaded = RealtimeDataStore.getDatasetById(datasetId);
    setDataset(loaded);
  }, [datasetId]);

  if (!dataset) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6 text-center">
        <Link href="/app/data" className="inline-flex items-center space-x-2 text-xs font-bold text-[#D4AF37] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Data Catalog</span>
        </Link>
        <div className="p-8 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3">
          <Database className="w-8 h-8 text-[#9CA3AF] mx-auto" />
          <h2 className="text-lg font-bold text-white">Dataset Not Found</h2>
          <p className="text-xs text-[#9CA3AF]">The requested dataset may have been removed or does not exist.</p>
        </div>
      </div>
    );
  }

  const filteredRows = dataset.rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Back Link */}
      <Link href="/app/data" className="inline-flex items-center space-x-2 text-xs font-bold text-[#D4AF37] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Data Catalog</span>
      </Link>

      {/* Header Banner */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-white">{dataset.name}</h1>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                Health Score: {dataset.healthScore}/100
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1">{dataset.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/app/ask?q=Analyze+${encodeURIComponent(dataset.name)}+dataset`}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl transition-all gold-glow flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI About Dataset</span>
          </Link>
        </div>
      </div>

      {/* Data Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Total Rows</div>
          <div className="text-xl font-bold text-white mt-1">{dataset.rowCount.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Total Columns</div>
          <div className="text-xl font-bold text-white mt-1">{dataset.colCount}</div>
        </div>
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Data Source</div>
          <div className="text-base font-bold text-[#D4AF37] mt-1">{dataset.source}</div>
        </div>
        <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl text-center">
          <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Quality Profile</div>
          <div className="text-base font-bold text-emerald-400 mt-1">Verified</div>
        </div>
      </div>

      {/* Schema Columns & Profiling */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
        <h2 className="font-bold text-white text-base flex items-center space-x-2">
          <Table className="w-5 h-5 text-[#D4AF37]" />
          <span>Auto-Detected Schema Columns & Types</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                <th className="pb-3 font-semibold">Column Name</th>
                <th className="pb-3 font-semibold">Inferred Type</th>
                <th className="pb-3 font-semibold">Sample Values</th>
                <th className="pb-3 font-semibold">Null Count</th>
                <th className="pb-3 font-semibold">Unique Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24]">
              {dataset.columns.map((col, idx) => (
                <tr key={idx} className="hover:bg-[#0B0C0E]/50">
                  <td className="py-3 font-mono font-bold text-white">{col.name}</td>
                  <td className="py-3 font-mono text-[#D4AF37] uppercase">{col.type}</td>
                  <td className="py-3 text-gray-300">
                    {col.sampleValues.map((s) => String(s)).join(', ')}
                  </td>
                  <td className="py-3 text-[#9CA3AF]">{col.nullCount}</td>
                  <td className="py-3 font-bold text-emerald-400">{col.uniqueCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real Records Explorer Table */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-bold text-white text-base">Real Data Records ({filteredRows.length})</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dataset rows..."
              className="bg-[#0B0C0E] border border-[#262B36] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="border border-[#1A1D24] rounded-xl overflow-x-auto bg-[#0B0C0E]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#121417] text-[#9CA3AF] border-b border-[#1A1D24]">
              <tr>
                {dataset.columns.map((col, idx) => (
                  <th key={idx} className="p-3 font-bold whitespace-nowrap">{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24] text-gray-200">
              {filteredRows.slice(0, 50).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#121417]/70">
                  {dataset.columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-3 whitespace-nowrap font-mono text-[11px]">
                      {String(row[col.name] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

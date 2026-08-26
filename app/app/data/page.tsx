'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Upload, 
  Plus, 
  ShieldCheck, 
  ArrowRight, 
  Trash2, 
  FileSpreadsheet, 
  Sparkles,
  Table as TableIcon,
  Activity,
  Layers
} from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset, SAMPLE_DATASETS } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

export default function DataCatalogPage() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'connectors'>('datasets');
  const [datasets, setDatasets] = useState<RealtimeDataset[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = () => {
    const userDatasets = RealtimeDataStore.getDatasets();
    if (userDatasets.length === 0) {
      // Provide default sample dataset if user has no datasets yet
      setDatasets(SAMPLE_DATASETS);
    } else {
      setDatasets(userDatasets);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = RealtimeDataStore.deleteDataset(id);
    if (updated.length === 0) {
      setDatasets(SAMPLE_DATASETS);
    } else {
      setDatasets(updated);
    }
  };

  const handleUploadSuccess = (newDataset: RealtimeDataset) => {
    loadDatasets();
  };

  const connectors = [
    { name: 'CSV & TSV Direct Stream', type: 'File Upload', status: 'Active Engine', desc: 'Client-side chunked parser with automatic data type inference.' },
    { name: 'JSON & Nested Objects', type: 'File Upload', status: 'Active Engine', desc: 'JSON object flattener for structured analytics querying.' },
    { name: 'Supabase PostgreSQL', type: 'Database', status: 'Connected', desc: 'Multi-tenant database backend with Row-Level Security (RLS).' },
    { name: 'PostgreSQL Direct', type: 'Database', status: 'Available', desc: 'Direct read-only connection string integration.' },
    { name: 'Google BigQuery', type: 'Data Warehouse', status: 'Available', desc: 'Cloud data warehouse connector for enterprise datasets.' },
    { name: 'Snowflake', type: 'Data Warehouse', status: 'Available', desc: 'Snowflake data warehouse replica reader.' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Real-Time Data Catalog</h1>
            <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold rounded-full">
              Real Data Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Upload your business datasets (CSV/JSON), inspect auto-detected schema properties, and run AI analysis in real time.
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

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-[#1A1D24] text-sm">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'datasets'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Active Datasets ({datasets.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('connectors')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'connectors'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Connectors ({connectors.length})</span>
        </button>
      </div>

      {/* Datasets Grid */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {datasets.map((ds) => (
              <Link
                key={ds.id}
                href={`/app/data/${ds.id}`}
                className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#262B36] flex items-center justify-center text-[#D4AF37]">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">{ds.name}</h3>
                        <span className="text-[11px] text-[#9CA3AF]">{ds.source}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDelete(ds.id, e)}
                      title="Delete dataset"
                      className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#9CA3AF] line-clamp-2">{ds.description}</p>

                  {/* Stat Badge */}
                  <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl">
                    <div>
                      <span className="text-[#9CA3AF]">Rows:</span>
                      <span className="ml-1 font-bold text-white">{ds.rowCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[#9CA3AF]">Columns:</span>
                      <span className="ml-1 font-bold text-white">{ds.colCount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1A1D24]">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold rounded-full border border-emerald-500/30">
                    {ds.healthScore}% Health
                  </span>
                  <span className="text-[#D4AF37] font-semibold group-hover:underline flex items-center space-x-1">
                    <span>Inspect Data</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Upload Action Bar */}
          <div className="p-6 bg-[#121417] border border-[#262B36] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Have your own business CSV data?</h4>
                <p className="text-xs text-[#9CA3AF]">Upload sales, customer, or operational data to run AI queries in real time.</p>
              </div>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all gold-glow shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload CSV / JSON</span>
            </button>
          </div>
        </div>
      )}

      {/* Connectors Grid */}
      {activeTab === 'connectors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {connectors.map((c, idx) => (
            <div key={idx} className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  c.status === 'Active Engine' || c.status === 'Connected'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-[#1A1D24] text-[#9CA3AF]'
                }`}>
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">{c.desc}</p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full py-2 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-xl transition-colors"
              >
                Use Connector
              </button>
            </div>
          ))}
        </div>
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

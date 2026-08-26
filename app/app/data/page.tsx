'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Upload, 
  ArrowRight, 
  Trash2, 
  FileSpreadsheet, 
  Sparkles,
  Layers,
  CheckCircle2,
  FileText
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
    setDatasets(userDatasets);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = RealtimeDataStore.deleteDataset(id);
    setDatasets(updated);
  };

  const handleUploadSuccess = (newDataset: RealtimeDataset) => {
    loadDatasets();
  };

  const connectors = [
    {
      name: 'Upload CSV or Excel File',
      type: 'File Stream Engine',
      status: 'Active Connector',
      desc: 'Upload CSV, XLSX, XLS, TSV, or JSON files. Client-side stream parser with instant AI auto-reading and zero server lock-in.',
      isPrimary: true
    },
    {
      name: 'Supabase PostgreSQL',
      type: 'Database',
      status: 'Connected',
      desc: 'Multi-tenant database backend with Row-Level Security (RLS) policies.',
      isPrimary: false
    },
    {
      name: 'PostgreSQL Direct',
      type: 'Database',
      status: 'Available',
      desc: 'Direct connection string for custom PostgreSQL analytics replicas.',
      isPrimary: false
    },
    {
      name: 'Google BigQuery',
      type: 'Data Warehouse',
      status: 'Available',
      desc: 'Enterprise cloud analytics warehouse connector for Google Cloud datasets.',
      isPrimary: false
    },
    {
      name: 'Snowflake Warehouse',
      type: 'Data Warehouse',
      status: 'Available',
      desc: 'Snowflake cloud warehouse connector for large-scale enterprise analytics.',
      isPrimary: false
    },
    {
      name: 'REST API & Webhook Stream',
      type: 'API Ingestion',
      status: 'Available',
      desc: 'Stream JSON payloads directly into real-time memory buffer via REST endpoints.',
      isPrimary: false
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Data Catalog & Connectors</h1>
            <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold rounded-full">
              Real Data Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Upload your business CSV/Excel datasets, manage active schema properties, and configure connectors.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload CSV or Excel File</span>
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
          <span>Data Connectors ({connectors.length})</span>
        </button>
      </div>

      {/* Datasets View */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          {datasets.length === 0 ? (
            <div className="p-8 sm:p-12 bg-[#121417] border-2 border-dashed border-[#262B36] rounded-2xl text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-white">No Datasets Uploaded Yet</h3>
                <p className="text-xs text-[#9CA3AF]">
                  Upload your business CSV or Excel file to inspect column schemas, view health scores, and ask AI questions in real time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload CSV / Excel Dataset</span>
                </button>

                <button
                  onClick={() => {
                    RealtimeDataStore.saveDataset(SAMPLE_DATASETS[0]);
                    loadDatasets();
                  }}
                  className="px-4 py-2.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Load 1-Click Sample Business CSV</span>
                </button>
              </div>
            </div>
          ) : (
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
                      <span>Inspect Schema</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Connectors View */}
      {activeTab === 'connectors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {connectors.map((c, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl space-y-4 transition-all ${
                c.isPrimary
                  ? 'bg-[#121417] border-2 border-[#D4AF37]/80 shadow-xl gold-border-glow'
                  : 'bg-[#121417] border border-[#1A1D24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {c.isPrimary ? <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" /> : <Database className="w-5 h-5 text-[#9CA3AF]" />}
                  <h3 className="font-bold text-white text-base">{c.name}</h3>
                </div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  c.isPrimary ? 'bg-[#D4AF37] text-black' : 'bg-[#1A1D24] text-[#9CA3AF]'
                }`}>
                  {c.status}
                </span>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed">{c.desc}</p>

              {c.isPrimary ? (
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all gold-glow"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload CSV or Excel File Now</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full py-2 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-xl transition-colors"
                >
                  Configure Connector
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <DatasetUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}

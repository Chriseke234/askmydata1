'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Database, Upload, FileSpreadsheet, Plus, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DataCatalogPage() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'connectors'>('datasets');

  const datasets = [
    { id: 'ds-orders', name: 'Orders', rows: 1420, cols: 8, health: 98, source: 'PostgreSQL', status: 'Active', updated: '10 mins ago' },
    { id: 'ds-customers', name: 'Customers', rows: 840, cols: 9, health: 95, source: 'PostgreSQL', status: 'Active', updated: '1 hour ago' },
    { id: 'ds-products', name: 'Products', rows: 150, cols: 7, health: 100, source: 'CSV Upload', status: 'Active', updated: '2 hours ago' },
    { id: 'ds-marketing', name: 'Marketing Campaigns', rows: 320, cols: 6, health: 92, source: 'BigQuery', status: 'Active', updated: 'Yesterday' },
    { id: 'ds-support', name: 'Support Tickets', rows: 410, cols: 6, health: 96, source: 'PostgreSQL', status: 'Active', updated: '3 hours ago' },
  ];

  const connectors = [
    { name: 'CSV File Upload', type: 'File', status: 'Connected', desc: 'Direct client/server chunked CSV parser' },
    { name: 'Excel XLSX', type: 'File', status: 'Connected', desc: 'Excel spreadsheet ingestion engine' },
    { name: 'PostgreSQL', type: 'Database', status: 'Connected', desc: 'Supabase PostgreSQL database backend' },
    { name: 'MySQL', type: 'Database', status: 'Available', desc: 'MySQL production analytics replica' },
    { name: 'Google BigQuery', type: 'Data Warehouse', status: 'Connected', desc: 'Google Cloud enterprise analytics warehouse' },
    { name: 'Snowflake', type: 'Data Warehouse', status: 'Available', desc: 'Snowflake cloud data warehouse connector' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Data Catalog & Connectors</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Manage connected datasets, view profiling health scores, and configure sources.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow">
            <Upload className="w-4 h-4" />
            <span>Upload Dataset</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-[#1A1D24] text-sm">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'datasets'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-[#9CA3AF] hover:text-white'
          }`}
        >
          Active Datasets (5)
        </button>
        <button
          onClick={() => setActiveTab('connectors')}
          className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
            activeTab === 'connectors'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-[#9CA3AF] hover:text-white'
          }`}
        >
          Data Connectors (6)
        </button>
      </div>

      {/* Datasets View */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((ds) => (
            <Link
              key={ds.id}
              href={`/app/data/${ds.id}`}
              className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B0C0E] border border-[#262B36] flex items-center justify-center text-[#D4AF37]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">{ds.name}</h3>
                    <span className="text-[11px] text-[#9CA3AF]">{ds.source}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/40">
                  {ds.health}/100 Health
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#1A1D24]">
                <div>
                  <span className="text-[#9CA3AF]">Rows:</span>
                  <span className="ml-1 font-bold text-white">{ds.rows.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF]">Columns:</span>
                  <span className="ml-1 font-bold text-white">{ds.cols}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-1">
                <span>Sync: {ds.updated}</span>
                <span className="text-[#D4AF37] font-semibold group-hover:underline flex items-center space-x-1">
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Connectors View */}
      {activeTab === 'connectors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectors.map((c, idx) => (
            <div key={idx} className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  c.status === 'Connected' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#1A1D24] text-[#9CA3AF]'
                }`}>
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">{c.desc}</p>
              <button className="w-full py-1.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-lg transition-colors">
                Configure Source
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

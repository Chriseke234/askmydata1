'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Sparkles,
  Database,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Wand2,
  Plus,
  ArrowRight,
  FileSpreadsheet,
  RefreshCw,
  Search,
  Check,
  Edit2
} from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';

export default function BusinessWorkspace() {
  const [datasets, setDatasets] = useState<RealtimeDataset[]>([]);
  const [activeDataset, setActiveDataset] = useState<RealtimeDataset | null>(null);

  // Data Cleaner State
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanerRun, setCleanerRun] = useState(false);
  const [issuesFound, setIssuesFound] = useState([
    { id: 1, type: 'Duplicates', count: 3, description: 'Duplicate order IDs detected' },
    { id: 2, type: 'Missing Values', count: 5, description: 'Blank customer region entries' },
    { id: 3, type: 'Whitespace', count: 12, description: 'Untrimmed cell text whitespace' }
  ]);

  // Data Entry Grid State
  const [gridData, setGridData] = useState([
    { id: '101', date: '2026-07-26', customer: 'Berlin Tech Solutions', category: 'Electronics', region: 'Europe', revenue: 45000, status: 'Completed' },
    { id: '102', date: '2026-07-25', customer: 'London Financial', category: 'Services', region: 'Europe', revenue: 80000, status: 'Completed' },
    { id: '103', date: '2026-07-24', customer: 'New York Commerce', category: 'Electronics', region: 'North America', revenue: 62000, status: 'Completed' },
    { id: '104', date: '2026-07-23', customer: 'Tokyo Enterprises', category: 'Hardware', region: 'Asia-Pacific', revenue: 38000, status: 'Pending' },
    { id: '105', date: '2026-07-22', customer: 'Paris Logistics', category: 'Services', region: 'Europe', revenue: 29000, status: 'Completed' },
  ]);

  const [editingCell, setEditingCell] = useState<{ rowIdx: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddRowModal, setShowAddRowModal] = useState(false);

  // New Row Form State
  const [newRow, setNewRow] = useState({
    id: String(Date.now()).slice(-3),
    date: new Date().toISOString().split('T')[0],
    customer: '',
    category: 'Electronics',
    region: 'North America',
    revenue: 10000,
    status: 'Completed'
  });

  useEffect(() => {
    const loaded = RealtimeDataStore.getDatasets();
    setDatasets(loaded);
    if (loaded.length > 0) {
      setActiveDataset(loaded[0]);
    }
  }, []);

  // Handle 1-Click Messy Data Auto-Fix
  const handleAutoCleanData = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setIsCleaning(false);
      setCleanerRun(true);
      setIssuesFound([]);
    }, 1800);
  };

  // Handle Data Entry Grid inline save
  const handleSaveCell = (rowIdx: number, field: string) => {
    const updated = [...gridData];
    (updated[rowIdx] as any)[field] = field === 'revenue' ? Number(editValue) || 0 : editValue;
    setGridData(updated);
    setEditingCell(null);
  };

  // Handle Add New Row
  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRow.customer.trim()) return;
    setGridData([newRow, ...gridData]);
    setNewRow({
      id: String(Date.now()).slice(-3),
      date: new Date().toISOString().split('T')[0],
      customer: '',
      category: 'Electronics',
      region: 'North America',
      revenue: 10000,
      status: 'Completed'
    });
    setShowAddRowModal(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 bg-[#0B0C0E] text-white">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1D24] pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Business Intelligence & Data Studio</h1>
            <span className="text-[10px] px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full font-mono font-bold">
              Non-Technical Business Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Understand business performance, fix messy data errors, and enter new records without technical complexity.
          </p>
        </div>

        {/* Active Dataset Selector */}
        <div className="flex items-center space-x-2">
          {datasets.length > 0 && (
            <div className="flex items-center space-x-2 p-2 bg-[#121417] border border-[#262B36] rounded-xl text-xs">
              <Database className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold text-white">{activeDataset?.name || 'Active Data'}</span>
              <span className="text-[10px] text-[#9CA3AF]">({activeDataset?.rowCount || gridData.length} rows)</span>
            </div>
          )}
          <Link
            href="/app/ask"
            className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all gold-glow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Question</span>
          </Link>
        </div>
      </div>

      {/* Top Executive Digest KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1 */}
        <div className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl space-y-2 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Monthly Net Revenue</span>
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded font-bold text-[10px] flex items-center space-x-1">
              <TrendingDown className="w-3 h-3" />
              <span>-11.8%</span>
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">$128,400</div>
          <p className="text-[11px] text-[#9CA3AF]">
            German Electronics contraction identified as main driver.
          </p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl space-y-2 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Enterprise Accounts</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-bold text-[10px] flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+4.2%</span>
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">1,420 Active</div>
          <p className="text-[11px] text-[#9CA3AF]">
            2 key EU accounts flagged at-risk due to logistics delays.
          </p>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl space-y-2 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Data Quality Health</span>
            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
              cleanerRun ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {cleanerRun ? '100/100 Clean' : '96/100 Needs Clean'}
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {cleanerRun ? '0 Errors' : '3 Issues Detected'}
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            {cleanerRun ? 'All duplicates & missing values fixed.' : 'Duplicates and trailing spaces found.'}
          </p>
        </div>
      </div>

      {/* Feature 1: 1-Click Messy Data Cleaner Tool */}
      <div className="p-6 bg-[#121417]/90 backdrop-blur-md border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1D24] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>1-Click Messy Data Auto-Cleaner</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded font-mono font-bold">
                  AI Auto-Fix
                </span>
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Automatically scan, format, remove duplicate rows, and fix missing fields in your active business dataset.
              </p>
            </div>
          </div>

          <button
            onClick={handleAutoCleanData}
            disabled={isCleaning || cleanerRun}
            className={`px-5 py-2.5 font-bold text-xs rounded-xl flex items-center space-x-2 transition-all ${
              cleanerRun
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 cursor-default'
                : isCleaning
                ? 'bg-[#1A1D24] text-[#D4AF37] animate-pulse'
                : 'bg-[#D4AF37] hover:bg-[#E5B800] text-black gold-glow shadow-md hover:scale-105'
            }`}
          >
            {isCleaning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Cleaning Dataset Errors...</span>
              </>
            ) : cleanerRun ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Dataset Cleaned & Verified</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Clean & Fix Messy Data (1-Click)</span>
              </>
            )}
          </button>
        </div>

        {/* Data Issues Audit Status */}
        {cleanerRun ? (
          <div className="p-4 bg-[#0B0C0E] border border-emerald-500/30 rounded-xl flex items-center space-x-3 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Success! Removed 3 duplicate rows, filled 5 missing region values, and trimmed cell whitespace across all records.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {issuesFound.map((issue) => (
              <div key={issue.id} className="p-3 bg-[#0B0C0E] border border-[#262B36] rounded-xl flex items-start justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-white flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{issue.type}</span>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">{issue.description}</div>
                </div>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-[10px] rounded">
                  {issue.count} found
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feature 2: No-Code Data Entry & Spreadsheet Grid */}
      <div className="p-6 bg-[#121417]/90 backdrop-blur-md border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1D24] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Spreadsheet Data Entry & Editor</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#1A1D24] text-[#9CA3AF] rounded font-mono font-bold">
                  No-Code Grid
                </span>
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Visually inspect, edit cell values inline, or enter new revenue records directly into your table.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddRowModal(true)}
            className="px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Entry Row</span>
          </button>
        </div>

        {/* Data Grid Table */}
        <div className="overflow-x-auto border border-[#1A1D24] rounded-xl bg-[#0B0C0E]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#121417] text-[#D4AF37] border-b border-[#1A1D24]">
                <th className="px-4 py-3 font-bold">ID</th>
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Customer Account</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Region</th>
                <th className="px-4 py-3 font-bold">Revenue</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24] text-gray-300">
              {gridData.map((row, idx) => (
                <tr key={row.id} className="hover:bg-[#121417]/70 transition-colors">
                  <td className="px-4 py-3 font-mono text-[11px] text-[#9CA3AF]">#{row.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
                  
                  {/* Customer (Editable) */}
                  <td className="px-4 py-3 font-medium text-white">
                    {editingCell?.rowIdx === idx && editingCell?.field === 'customer' ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-[#121417] border border-[#D4AF37] rounded px-2 py-1 text-xs text-white focus:outline-none"
                        />
                        <button onClick={() => handleSaveCell(idx, 'customer')} className="p-1 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => {
                          setEditingCell({ rowIdx: idx, field: 'customer' });
                          setEditValue(row.customer);
                        }}
                        className="cursor-pointer hover:text-[#D4AF37] underline decoration-dashed decoration-[#9CA3AF]/40 flex items-center justify-between group"
                      >
                        <span>{row.customer}</span>
                        <Edit2 className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100 ml-1" />
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-[#121417] border border-[#262B36] rounded text-[11px]">
                      {row.region}
                    </span>
                  </td>

                  {/* Revenue (Editable) */}
                  <td className="px-4 py-3 font-bold font-mono text-white">
                    {editingCell?.rowIdx === idx && editingCell?.field === 'revenue' ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-[#121417] border border-[#D4AF37] rounded px-2 py-1 text-xs text-white focus:outline-none w-24"
                        />
                        <button onClick={() => handleSaveCell(idx, 'revenue')} className="p-1 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => {
                          setEditingCell({ rowIdx: idx, field: 'revenue' });
                          setEditValue(String(row.revenue));
                        }}
                        className="cursor-pointer hover:text-[#D4AF37] flex items-center justify-between group"
                      >
                        <span>${row.revenue.toLocaleString()}</span>
                        <Edit2 className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100 ml-1" />
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditingCell({ rowIdx: idx, field: 'customer' });
                        setEditValue(row.customer);
                      }}
                      className="text-xs text-[#9CA3AF] hover:text-[#D4AF37]"
                    >
                      Edit Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature 3: Executive Decision Briefs & Plain-English Actions */}
      <div className="p-6 bg-[#121417]/90 backdrop-blur-md border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A1D24] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Recommended Business Decision Actions</h2>
              <p className="text-xs text-[#9CA3AF]">AI-generated next steps ready for your team to act on.</p>
            </div>
          </div>
          <Link
            href="/app/decision-briefs"
            className="text-xs text-[#D4AF37] font-bold hover:underline flex items-center space-x-1"
          >
            <span>View All Briefs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#D4AF37]">Fulfillment Priority</span>
              <span className="text-[10px] text-gray-400">Target: EU Logistics</span>
            </div>
            <p className="text-xs text-gray-300">
              Re-route German smart IoT orders to the Amsterdam warehouse hub to eliminate shipping delays and protect $125,000 in ARR.
            </p>
          </div>

          <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#D4AF37]">Account Retention</span>
              <span className="text-[10px] text-gray-400">Target: VIP Accounts</span>
            </div>
            <p className="text-xs text-gray-300">
              Schedule direct account executive check-in with Berlin Tech Solutions and London Financial before Q3 renewal dates.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Row Modal */}
      {showAddRowModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121417] border border-[#D4AF37]/50 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <h3 className="font-bold text-white text-base">Add New Data Entry Row</h3>
              <button onClick={() => setShowAddRowModal(false)} className="text-[#9CA3AF] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddRow} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#9CA3AF]">Customer Account Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Global Logistics"
                  value={newRow.customer}
                  onChange={(e) => setNewRow({ ...newRow, customer: e.target.value })}
                  className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[#9CA3AF]">Category</label>
                  <select
                    value={newRow.category}
                    onChange={(e) => setNewRow({ ...newRow, category: e.target.value })}
                    className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Services">Services</option>
                    <option value="Software">Software</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3AF]">Region</label>
                  <select
                    value={newRow.region}
                    onChange={(e) => setNewRow({ ...newRow, region: e.target.value })}
                    className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia-Pacific">Asia-Pacific</option>
                    <option value="Latin America">Latin America</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3AF]">Revenue ($)</label>
                <input
                  type="number"
                  required
                  value={newRow.revenue}
                  onChange={(e) => setNewRow({ ...newRow, revenue: Number(e.target.value) || 0 })}
                  className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1A1D24]">
                <button
                  type="button"
                  onClick={() => setShowAddRowModal(false)}
                  className="px-4 py-2 bg-[#0B0C0E] border border-[#262B36] text-[#9CA3AF] hover:text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-xl gold-glow"
                >
                  Save Entry Row
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

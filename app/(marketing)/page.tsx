'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Zap, 
  Search, 
  CheckCircle2, 
  FileSpreadsheet,
  Upload,
  Brain,
  Layers,
  AlertCircle
} from 'lucide-react';
import { RealtimeDataStore, RealtimeDataset, SAMPLE_DATASETS } from '@/lib/data/realtime-store';

export default function LandingPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
        throw new Error('Please select a valid CSV or JSON data file.');
      }
      const parsed = await RealtimeDataStore.parseCSVFile(file);
      RealtimeDataStore.saveDataset(parsed);
      router.push(`/app/ask?ds=${parsed.id}&autoRead=1`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse file.');
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

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Marketing Header */}
      <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur border-b border-[#1A1D24] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-wide text-white">ASKMYDATA</span>
            <span className="hidden sm:block text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">Real Data Platform</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm text-[#9CA3AF]">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/for-business" className="hover:text-white transition-colors">For Business</Link>
          <Link href="/for-analysts" className="hover:text-white transition-colors">For Analysts</Link>
          <Link href="/for-data-scientists" className="hover:text-white transition-colors">For Data Scientists</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/app/data" className="px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white rounded-lg text-sm font-semibold transition-colors">
            Data Catalog
          </Link>
          <Link href="/app" className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-lg text-sm transition-colors shadow-md gold-glow">
            Open Workspace
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121417] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Real-Time Business Data Engine • Instant AI Schema Reader</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          Ask questions about <span className="text-[#D4AF37]">your real data.</span> Get instant answers.
        </h1>

        <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-3xl mx-auto font-normal leading-relaxed">
          No fake metrics or fictional datasets. Upload your business CSV or Excel file, auto-detect column schemas, and let AI calculate answers, charts, and verified insights in real time.
        </p>

        {/* Interactive Drag & Drop File Ingestion Dropzone directly in Hero */}
        <div className="max-w-2xl mx-auto text-left">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-8 sm:p-10 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all shadow-2xl ${
              isDragging
                ? 'border-[#D4AF37] bg-[#D4AF37]/15 scale-[1.01]'
                : 'border-[#D4AF37]/60 hover:border-[#D4AF37] bg-[#121417] gold-border-glow'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.json,.txt"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />

            <div className="w-16 h-16 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto mb-4 gold-glow">
              {isProcessing ? (
                <div className="w-7 h-7 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {isProcessing ? 'Parsing File & Auto-Reading Dataset...' : 'Drop your CSV or Excel file here, or click to browse'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
              Supports CSV, TSV, and JSON formats up to 50,000 rows. Instant local stream parsing with complete privacy.
            </p>

            <button
              type="button"
              className="mt-6 px-6 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-xl gold-glow inline-flex items-center space-x-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Select & Upload Business Dataset</span>
            </button>
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Alternative 1-Click Sample Dataset Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              RealtimeDataStore.saveDataset(SAMPLE_DATASETS[0]);
              router.push(`/app/ask?ds=${SAMPLE_DATASETS[0].id}&autoRead=1`);
            }}
            className="px-5 py-2.5 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Test with 1-Click SaaS Subscriptions Sample CSV</span>
          </button>
          <button
            onClick={() => {
              RealtimeDataStore.saveDataset(SAMPLE_DATASETS[1]);
              router.push(`/app/ask?ds=${SAMPLE_DATASETS[1].id}&autoRead=1`);
            }}
            className="px-5 py-2.5 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors"
          >
            <Database className="w-4 h-4 text-[#D4AF37]" />
            <span>Test with 1-Click E-Commerce Orders Sample CSV</span>
          </button>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#1A1D24]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How AskMyData <span className="text-[#D4AF37]">Analyzes Your Dataset</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] mt-4">
            Zero setup delay. Upload a file, and AskMyData handles schema detection, type inference, calculations, and visual charts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Upload Any File</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Drag & drop your CSV or Excel dataset. Client-side stream parsing instantly reads row counts, column names, data types, and health scores.
            </p>
          </div>

          <div className="p-8 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. Ask in Plain English</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Ask questions like "What is my total revenue?", "Which category is performing best?", or "Show monthly growth trend".
            </p>
          </div>

          <div className="p-8 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Get Verified Visual Answers</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Receive calculated totals, category breakdowns, auto-generated Recharts visualizations, and step-by-step query evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-[#1A1D24] text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold text-white text-sm">ASKMYDATA</span>
            <span>© 2026 AskMyData Platform. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/app/data" className="hover:text-white">Upload Dataset</Link>
            <Link href="/security" className="hover:text-white">Security</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/login" className="hover:text-white">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Code, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForAnalystsPage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white">
      <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur border-b border-[#1A1D24] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-wide text-white">ASKMYDATA</span>
        </Link>
        <Link href="/demo" className="px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg text-sm gold-glow">
          Try Live Demo
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">FOR DATA ANALYSTS</span>
          <h1 className="text-4xl font-extrabold text-white">Explore, query, validate, and communicate faster</h1>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Inspect raw SQL, audit evidence traces, build certified metrics, and deliver interactive dashboards with zero boilerplate.
          </p>
        </div>

        <div className="p-8 bg-[#121417] border border-[#1A1D24] rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white">Analyst Power Tools</h2>
          <ul className="space-y-4 text-sm text-gray-200">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">SQL Editor with Dry-Run Safety Validation</strong>
                <span className="text-xs text-[#9CA3AF]">Syntax highlighting, query formatting, explain plans, and read-only protection.</span>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Data Quality & Profiling Scores (0-100)</strong>
                <span className="text-xs text-[#9CA3AF]">Completeness, consistency, validity, uniqueness, freshness, and integrity reports.</span>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Semantic Layer & Business Glossary</strong>
                <span className="text-xs text-[#9CA3AF]">Ensure AI and human analysts use certified metric definitions.</span>
              </div>
            </li>
          </ul>

          <Link
            href="/demo"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl text-sm gold-glow"
          >
            <span>Explore Analyst Canvas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

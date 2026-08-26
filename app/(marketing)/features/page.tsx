'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BarChart3, Database, ShieldCheck, Search, Zap, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
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

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-white">Platform Features</h1>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            From natural language querying to persistent multi-step investigations and verified evidence panels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-bold text-xl text-white">AI Tool Calling Architecture</h3>
            <p className="text-sm text-[#9CA3AF]">
              Controlled execution of schema discovery, safe read-only SQL queries, and statistical metric calculations powered by Google Gemini.
            </p>
          </div>

          <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-3">
            <Search className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-bold text-xl text-white">Signature Investigations</h3>
            <p className="text-sm text-[#9CA3AF]">
              Persistent multi-step investigative threads that trace root causes across revenue, customers, products, and operational tickets.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

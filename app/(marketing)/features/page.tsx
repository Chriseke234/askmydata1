'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BarChart3, Database, ShieldCheck, Search, Zap, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="py-12">

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

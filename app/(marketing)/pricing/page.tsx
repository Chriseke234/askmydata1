'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white pt-24">
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121417] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>V1 Early Access Release</span>
        </div>

        <h1 className="text-4xl font-extrabold text-white">Free V1 Access</h1>
        <p className="text-base text-[#9CA3AF] max-w-xl mx-auto">
          AskMyData V1 is currently free for early adopters. Connect your data or explore using the Northstar Commerce dataset.
        </p>

        <div className="p-8 bg-[#121417] border border-[#D4AF37]/50 rounded-3xl max-w-md mx-auto space-y-6 shadow-2xl gold-border-glow text-left">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">AskMyData V1 Pro</h3>
            <div className="text-3xl font-extrabold text-[#D4AF37]">$0 <span className="text-xs text-[#9CA3AF] font-normal">/ month (V1 Access)</span></div>
          </div>

          <ul className="space-y-3 text-xs text-gray-200">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Full Gemini AI Tool Calling & Verification Engine</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Unlimited Datasets & Schema Profiling</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Signature Multi-Step Investigations</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Executive Decision Briefs & Slide Generator</span>
            </li>
          </ul>

          <Link
            href="/demo"
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all shadow-md gold-glow flex items-center justify-center space-x-2"
          >
            <span>Start Free Early Access</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

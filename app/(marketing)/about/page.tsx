'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AboutPage() {
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
          Live Demo
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-white">About AskMyData</h1>
        <p className="text-gray-300 leading-relaxed">
          AskMyData was created to bridge the gap between business executives who need fast answers and data teams who need rigorous analytical tools. By combining AI natural language tool execution, evidence verification, persistent investigations, and interactive dashboards, AskMyData enables teams to turn data into confident decisions.
        </p>
      </main>
    </div>
  );
}

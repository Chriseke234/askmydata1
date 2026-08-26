'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Upload, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="w-16 h-16 rounded-2xl bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] gold-glow">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="max-w-xl space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">Real-Time Data Intelligence</h1>
        <p className="text-sm text-[#9CA3AF]">
          AskMyData operates directly on your real business data. Upload your CSV/JSON file to start asking AI questions immediately.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/app/data"
          className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-sm rounded-xl flex items-center space-x-2 transition-all gold-glow"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Your Real Dataset</span>
        </Link>
        <Link
          href="/app"
          className="px-6 py-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors"
        >
          <span>Open Guest Workspace</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </Link>
      </div>
    </div>
  );
}

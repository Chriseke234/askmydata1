'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Presentation, ArrowLeft, ChevronLeft, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { NORTHSTAR_REVENUE_TREND } from '@/lib/demo/northstar-data';

export default function PresentationDetailPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'European Market Recovery Strategy',
      subtitle: 'Q3 Board Briefing & Operational Action Plan',
      content: 'Northstar Commerce Data Intelligence Report • August 2026',
      isTitleSlide: true
    },
    {
      title: 'Executive Situation Summary',
      subtitle: 'European revenue contracted -22.4% MoM',
      content: 'European revenue fell from $165,000 to $128,000. Order volume dropped -9.4% with AOV sliding -2.6%. The contraction accounts for 70%+ of overall business decline.'
    },
    {
      title: 'Regional Divergence & Root Causes',
      subtitle: '82% of European drop concentrated in Electronics line',
      chart: true
    },
    {
      title: 'Board Action Recommendations',
      subtitle: 'Emergency logistics & customer retention protocol',
      content: '1. Air-freight 200 units of Smart IoT Hubs to Frankfurt hub.\n2. Assign Account Executives to Berlin Tech Solutions & London Financial Ltd.\n3. Expand Software category marketing in Europe.'
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1D24] pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/app/presentations" className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-white">Slide Deck: European Market Recovery</h1>
            <p className="text-xs text-[#9CA3AF]">Slide {currentSlide + 1} of {slides.length}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="p-2 bg-[#121417] border border-[#262B36] disabled:opacity-50 text-white rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 bg-[#121417] border border-[#262B36] disabled:opacity-50 text-white rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Presentation Canvas Slide */}
      <div className="aspect-[16/9] w-full bg-[#0B0C0E] border border-[#D4AF37]/50 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl gold-border-glow">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>ASKMYDATA EXECUTIVE SLIDE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-sm sm:text-lg text-[#C5A059] font-medium">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {slides[currentSlide].chart ? (
          <div className="my-auto">
            <AskChart
              spec={{
                type: 'bar',
                title: 'Regional Revenue Divergence ($ USD)',
                data: NORTHSTAR_REVENUE_TREND,
                xAxisKey: 'month',
                yAxisKeys: ['NorthAmerica', 'Europe'],
                unit: '$'
              }}
            />
          </div>
        ) : (
          <div className="my-auto text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-line bg-[#121417] p-6 rounded-2xl border border-[#1A1D24]">
            {slides[currentSlide].content}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-[#9CA3AF] border-t border-[#1A1D24] pt-4">
          <span>Northstar Commerce Board Presentation</span>
          <span>AskMyData Intelligence • Verified Data</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, X, ArrowRight, Database, FileText, BarChart3, Zap } from 'lucide-react';

interface UniversalCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UniversalCommandBar({ isOpen, onClose }: UniversalCommandBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query.trim());
    onClose();
    router.push(`/app/ask?q=${encoded}`);
  };

  const quickQuestions = [
    'How is the business performing?',
    'Why did revenue drop in Europe last month?',
    'Which products are growing fastest?',
    'Find my biggest growth opportunities',
    'Show customer churn rate by region',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden gold-border-glow">
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-b border-[#1A1D24] bg-[#121417]">
          <Sparkles className="w-5 h-5 text-[#D4AF37] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your data anything (e.g. 'Why did sales fall last month?')..."
            className="w-full bg-transparent text-white text-base placeholder-[#9CA3AF] focus:outline-none"
            autoFocus
          />
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-[#9CA3AF] hover:text-white ml-2">
            <X className="w-5 h-5" />
          </button>
        </form>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Suggested Analytical Questions</span>
            </div>
            <div className="space-y-1">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onClose();
                    router.push(`/app/ask?q=${encodeURIComponent(q)}`);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/30 text-sm text-gray-200 flex items-center justify-between transition-colors group"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A1D24]">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Quick Navigation</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => { onClose(); router.push('/app/data'); }}
                className="p-2.5 bg-[#121417] hover:bg-[#1A1D24] rounded-lg border border-[#1A1D24] text-xs text-white flex items-center space-x-2"
              >
                <Database className="w-4 h-4 text-[#D4AF37]" />
                <span>Data Catalog</span>
              </button>
              <button
                onClick={() => { onClose(); router.push('/app/investigations'); }}
                className="p-2.5 bg-[#121417] hover:bg-[#1A1D24] rounded-lg border border-[#1A1D24] text-xs text-white flex items-center space-x-2"
              >
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span>Investigations</span>
              </button>
              <button
                onClick={() => { onClose(); router.push('/app/decision-briefs'); }}
                className="p-2.5 bg-[#121417] hover:bg-[#1A1D24] rounded-lg border border-[#1A1D24] text-xs text-white flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                <span>Decision Briefs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 bg-[#121417] border-t border-[#1A1D24] flex items-center justify-between text-[11px] text-[#9CA3AF]">
          <span>Press <kbd className="px-1 bg-[#0B0C0E] rounded border border-[#262B36]">Esc</kbd> to exit</span>
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Powered by Gemini AI Engine</span>
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquareCode, ArrowRight, Clock } from 'lucide-react';

export default function ConversationsHistoryPage() {
  const history = [
    { id: '1', title: 'Why did European sales drop last month?', date: 'Today at 10:30 AM', query: 'Why did sales fall in Europe?' },
    { id: '2', title: 'Northstar Commerce Overall Business Performance Audit', date: 'Yesterday', query: 'How is the business performing?' },
    { id: '3', title: 'Product Category YoY Margin & Revenue Analysis', date: '3 days ago', query: 'Which products are growing fastest?' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Conversation History</h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Reopen previous AI analytical conversations and investigations.</p>
      </div>

      <div className="space-y-4">
        {history.map((h) => (
          <Link
            key={h.id}
            href={`/app/ask?q=${encodeURIComponent(h.query)}`}
            className="p-5 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl flex items-center justify-between transition-all group shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">{h.title}</h3>
                <span className="text-xs text-[#9CA3AF]">{h.date}</span>
              </div>
            </div>

            <span className="text-[#D4AF37] text-xs font-semibold flex items-center space-x-1">
              <span>Reopen Thread</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

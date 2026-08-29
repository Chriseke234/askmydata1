'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white pt-24">
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-white">Enterprise Security & Isolation</h1>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Built with strict Supabase PostgreSQL Row Level Security (RLS) and client/server secret isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-2">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-base">Multi-Tenant RLS Enforcement</h3>
            <p className="text-xs text-[#9CA3AF]">
              Every database resource is bound to a workspace_id and enforced at the Postgres kernel level.
            </p>
          </div>

          <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-2">
            <Eye className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-base">Read-Only Query Execution</h3>
            <p className="text-xs text-[#9CA3AF]">
              AI-generated queries are dry-run validated to block destructive commands (INSERT, UPDATE, DELETE, DROP).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

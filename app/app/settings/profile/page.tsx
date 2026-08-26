'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Settings, Sparkles, Shield, BookOpen } from 'lucide-react';

export default function SettingsProfilePage() {
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@northstar.com');
  const [defaultRole, setDefaultRole] = useState('business');

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Workspace & Profile Settings</h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Manage user preferences, AI engine providers, and semantic business glossaries.</p>
      </div>

      {/* Sub-nav */}
      <div className="flex space-x-4 border-b border-[#1A1D24] text-xs font-bold">
        <Link href="/app/settings/profile" className="pb-3 border-b-2 border-[#D4AF37] text-[#D4AF37]">Profile & Role</Link>
        <Link href="/app/settings/glossary" className="pb-3 text-[#9CA3AF] hover:text-white">Business Glossary</Link>
      </div>

      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-6 shadow-xl">
        <h2 className="font-bold text-white text-base">User Profile & Default Workspace Mode</h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Default Experience Mode</label>
            <select
              value={defaultRole}
              onChange={(e) => setDefaultRole(e.target.value)}
              className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="business">Decision Mode (Business Owner / Executive)</option>
              <option value="analyst">Analyst Mode (Data Analyst / SQL Canvas)</option>
              <option value="data_scientist">Data Science Mode (Stats & ML)</option>
            </select>
          </div>
        </div>

        <button className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold text-xs rounded-lg transition-colors gold-glow">
          Save Settings
        </button>
      </div>

      {/* AI Provider Config Box */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-white text-base">Active AI Provider Configuration</h2>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          Default Engine: <strong className="text-white">Google Gemini 2.5/1.5 Tool Calling Architecture</strong>
        </p>
        <div className="p-3 bg-[#0B0C0E] border border-emerald-800/40 rounded-xl text-xs text-emerald-400 font-semibold">
          ✓ Gemini Function/Tool Calling Enabled • API Key Configured & Protected Server-Side
        </div>
      </div>
    </div>
  );
}

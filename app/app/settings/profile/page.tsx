'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Mail, Building, ShieldCheck, Key, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { GuestSessionStore, UserProfile } from '@/lib/auth/guest-store';
import { GuestGateModal } from '@/components/auth/GuestGateModal';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isGateOpen, setIsGateOpen] = useState(false);

  useEffect(() => {
    setProfile(GuestSessionStore.getUserProfile());
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Account & Profile Settings</h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Manage user identity, security settings, and session credentials.</p>
      </div>

      {/* Profile Card */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0B0C0E] border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-xl font-bold">
            {profile?.isGuest ? 'G' : 'U'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">{profile?.name || 'Guest User'}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                profile?.isGuest ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {profile?.isGuest ? 'Guest Session' : 'Verified Member'}
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{profile?.email}</p>
          </div>
        </div>

        {profile?.isGuest && (
          <div className="p-4 bg-[#0B0C0E] border border-[#D4AF37]/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 gold-border-glow">
            <div>
              <div className="text-xs font-bold text-white">Currently in Guest Mode</div>
              <div className="text-xs text-[#9CA3AF]">Create a free account to save datasets, share briefs with teammates, and connect live database replicas.</div>
            </div>
            <Link
              href="/signup"
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold text-xs rounded-xl flex items-center space-x-1.5 transition-all gold-glow shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account</span>
            </Link>
          </div>
        )}

        {/* User Details */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-1">Display Name</label>
              <input
                type="text"
                disabled={profile?.isGuest}
                value={profile?.name || 'Guest User'}
                onChange={() => {}}
                className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-xl px-3 py-2 text-xs text-white disabled:opacity-70"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-1">Work Email</label>
              <input
                type="email"
                disabled={profile?.isGuest}
                value={profile?.email || 'guest@askmydata.app'}
                onChange={() => {}}
                className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-xl px-3 py-2 text-xs text-white disabled:opacity-70"
              />
            </div>
          </div>

          {profile?.isGuest && (
            <button
              onClick={() => setIsGateOpen(true)}
              className="px-4 py-2 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs font-semibold text-white rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Edit Account Settings (Sign In Required)</span>
            </button>
          )}
        </div>
      </div>

      <GuestGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        featureName="Account Settings Editing"
      />
    </div>
  );
}

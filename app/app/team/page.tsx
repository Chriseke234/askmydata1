'use client';

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Lock } from 'lucide-react';
import { GuestSessionStore, UserProfile } from '@/lib/auth/guest-store';
import { GuestGateModal } from '@/components/auth/GuestGateModal';

export default function TeamPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isGateOpen, setIsGateOpen] = useState(false);

  useEffect(() => {
    setProfile(GuestSessionStore.getUserProfile());
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Team Workspace & Collaboration</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Manage workspace members, assign roles, and share dataset insights.</p>
        </div>

        <button
          onClick={() => setIsGateOpen(true)}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-2 transition-all gold-glow"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {profile?.isGuest && (
        <div className="p-4 bg-[#121417] border border-[#D4AF37]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 gold-border-glow">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>Guest Session Mode</span>
            </div>
            <p className="text-xs text-[#9CA3AF]">
              Team collaboration, member invitations, and shared dataset permissions are available for registered business accounts.
            </p>
          </div>

          <button
            onClick={() => setIsGateOpen(true)}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl transition-all gold-glow shrink-0"
          >
            Unlock Team Workspace
          </button>
        </div>
      )}

      {/* Members Table */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                <th className="pb-3 font-semibold">Workspace Member</th>
                <th className="pb-3 font-semibold">Email Address</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Session Status</th>
                <th className="pb-3 font-semibold">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24]">
              <tr className="hover:bg-[#0B0C0E]/50">
                <td className="py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B0C0E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                    {profile?.isGuest ? 'G' : 'U'}
                  </div>
                  <span className="font-bold text-white">{profile?.name || 'Guest User'}</span>
                </td>
                <td className="py-3 text-[#9CA3AF]">{profile?.email}</td>
                <td className="py-3">
                  <span className="px-2.5 py-1 rounded bg-[#1A1D24] text-[#D4AF37] font-bold text-[11px]">
                    {profile?.role || 'Guest Session'}
                  </span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    Active
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => setIsGateOpen(true)}
                    className="text-xs text-[#9CA3AF] hover:text-white underline"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GuestGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        featureName="Team Workspace Collaboration"
      />
    </div>
  );
}

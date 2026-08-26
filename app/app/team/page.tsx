'use client';

import React from 'react';
import { Users, UserPlus, ShieldCheck, Mail } from 'lucide-react';

export default function TeamPage() {
  const members = [
    { name: 'Alex Morgan', email: 'alex@northstar.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', status: 'Active' },
    { name: 'Sarah Chen', email: 'sarah@northstar.com', role: 'Data Analyst', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', status: 'Active' },
    { name: 'Marcus Vance', email: 'marcus@northstar.com', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', status: 'Active' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Team Workspace & Permissions</h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Manage team members, assign workspace roles, and control access permissions.</p>
        </div>

        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-2 transition-colors gold-glow">
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Members Table */}
      <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1D24] text-[#9CA3AF]">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Workspace Role</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D24]">
              {members.map((m, idx) => (
                <tr key={idx} className="hover:bg-[#0B0C0E]/50">
                  <td className="py-3 flex items-center space-x-3">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border border-[#D4AF37]" />
                    <span className="font-bold text-white">{m.name}</span>
                  </td>
                  <td className="py-3 text-[#9CA3AF]">{m.email}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded bg-[#1A1D24] text-[#D4AF37] font-bold text-[11px]">
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-[#9CA3AF] hover:text-white cursor-pointer">
                    Edit Permissions
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

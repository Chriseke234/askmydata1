'use client';

import React from 'react';
import Link from 'next/link';
import { X, Lock, Sparkles, UserPlus, ArrowRight } from 'lucide-react';

interface GuestGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function GuestGateModal({ isOpen, onClose, featureName = 'this feature' }: GuestGateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121417] border border-[#D4AF37]/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-6 gold-border-glow text-center relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto gold-glow">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Sign In to Unlock {featureName}</h2>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            You are currently using AskMyData in <strong>Guest Mode</strong>. Create a free account or sign in to unlock team member invites, production database connectors, and cloud persistence.
          </p>
        </div>

        <div className="p-3 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl text-left space-y-1.5 text-xs">
          <div className="font-semibold text-white flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Included in Free Account:</span>
          </div>
          <ul className="text-[#9CA3AF] space-y-1 list-disc list-inside text-[11px]">
            <li>Full team workspace collaboration</li>
            <li>Cloud persistence across sessions</li>
            <li>Production database connectors</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Link
            href="/signup"
            className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold text-xs rounded-xl transition-all gold-glow flex items-center justify-center space-x-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Free Account</span>
          </Link>

          <Link
            href="/login"
            className="w-full py-2.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Sign In to Existing Account</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>

          <button
            onClick={onClose}
            className="text-xs text-[#9CA3AF] hover:text-white underline pt-1"
          >
            Continue in Guest Mode
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Mail, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Password reset instructions have been sent to your email.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center p-4 selection:bg-[#D4AF37] selection:text-black">
      <div className="w-full max-w-md bg-[#121417] border border-[#1A1D24] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 gold-border-glow">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white">ASKMYDATA</span>
          </Link>
          <h1 className="text-2xl font-bold text-white pt-2">Reset password</h1>
          <p className="text-xs text-[#9CA3AF]">Enter your work email to receive password reset instructions</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-lg text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-lg text-xs text-emerald-300">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-lg text-sm transition-all shadow-md gold-glow flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Sending link...' : 'Send Reset Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#1A1D24] text-center">
          <Link href="/login" className="inline-flex items-center space-x-1.5 text-xs text-[#D4AF37] font-semibold hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

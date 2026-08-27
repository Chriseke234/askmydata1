'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, User, Building } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        if (typeof window !== 'undefined') {
          localStorage.setItem('askmydata_user_config', JSON.stringify({
            full_name: fullName,
            company_name: companyName,
            email: email,
            is_guest: false
          }));
        }
        setSuccessMsg('Account created successfully! Redirecting to setup survey...');
        setTimeout(() => {
          router.push('/onboarding');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account. Please try again.');
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
          <h1 className="text-2xl font-bold text-white pt-2">Create an account</h1>
          <p className="text-xs text-[#9CA3AF]">Start analyzing your real business data in real time</p>
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

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Company / Organization</label>
            <div className="relative">
              <Building className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Analytics Inc."
                className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-lg text-sm transition-all shadow-md gold-glow flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#1A1D24] text-center space-y-3">
          <button
            type="button"
            onClick={() => router.push('/app/data')}
            className="w-full py-2 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] rounded-lg text-xs font-semibold text-[#D4AF37] transition-colors"
          >
            Continue as Guest (No Login Required)
          </button>
          <div className="text-xs text-[#9CA3AF]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

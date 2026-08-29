'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white pt-24">
      <main className="max-w-xl mx-auto px-4 py-16 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Get in touch</h1>
          <p className="text-xs text-[#9CA3AF]">Have questions about AskMyData V1? Send us a message.</p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#121417] border border-emerald-500/40 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Message Sent</h3>
            <p className="text-xs text-gray-300">Thank you for reaching out. We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Your Email</label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can we help your team?"
                className="w-full bg-[#0B0C0E] border border-[#262B36] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold text-xs rounded-lg transition-colors gold-glow">
              Send Message
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

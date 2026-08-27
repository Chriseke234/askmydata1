'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Zap, 
  Search, 
  CheckCircle2, 
  TrendingUp,
  Layers,
  Users,
  Brain,
  Lock
} from 'lucide-react';
import { DataFlowIllustration } from '@/components/brand/DataFlowIllustration';
import { DecisionVectorIllustration } from '@/components/brand/DecisionVectorIllustration';

export default function LandingPage() {
  const dataSources = [
    'PostgreSQL', 'MySQL', 'BigQuery', 'Snowflake', 'CSV Upload', 'Excel XLSX', 'JSON Feeds'
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Marketing Header */}
      <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur border-b border-[#1A1D24] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" alt="AskMyData Logo" className="w-10 h-10 object-contain hover:scale-105 transition-transform" />
          <div>
            <span className="font-bold text-xl tracking-wide text-white">ASKMYDATA</span>
            <span className="hidden sm:block text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">AI Data Intelligence</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm text-[#9CA3AF]">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/for-business" className="hover:text-white transition-colors">For Business</Link>
          <Link href="/for-analysts" className="hover:text-white transition-colors">For Analysts</Link>
          <Link href="/for-data-scientists" className="hover:text-white transition-colors">For Data Scientists</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/demo" className="px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white rounded-lg text-sm font-semibold transition-colors">
            Live Demo
          </Link>
          <Link href="/login" className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-lg text-sm transition-colors shadow-md gold-glow">
            Start Analyzing
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121417] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-6">
          <img src="/logo.png" alt="Icon" className="w-4 h-4 object-contain" />
          <span>V1 Production Release • Powered by Google Gemini</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          Turn your data into <span className="text-[#D4AF37]">better decisions.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] max-w-3xl mx-auto font-normal leading-relaxed">
          Connect your data. Ask questions naturally. Understand what is happening, explain why, investigate root causes, and turn analysis into decisions your team can act on.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-base transition-all shadow-xl gold-glow flex items-center justify-center space-x-2"
          >
            <span>See Live Interactive Demo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white font-bold rounded-xl text-base transition-all flex items-center justify-center space-x-2"
          >
            <span>Start Free Trial</span>
          </Link>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl border border-[#D4AF37]/40 bg-[#0B0C0E] p-4 sm:p-6 shadow-2xl gold-border-glow text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1D24]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-[#9CA3AF] font-mono ml-2">askmydata.app/overview</span>
            </div>
            <span className="text-xs text-[#D4AF37] font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Evidence Engine</span>
            </span>
          </div>

          <div className="py-6 space-y-6">
            <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl flex items-start space-x-3">
              <img src="/logo.png" alt="AskMyData Bot" className="w-6 h-6 object-contain shrink-0 mt-0.5" />
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white">Question: "Why did revenue drop in Europe last month?"</div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  I analyzed the Northstar Commerce dataset. European revenue contracted **-22.4%** ($128,000 vs $165,000 previous period). The primary drivers are:
                  <ul className="list-disc list-inside mt-2 text-xs text-[#9CA3AF] space-y-1">
                    <li>Electronics category drop (-22.4% in Smart IoT Hubs)</li>
                    <li>38% increase in European shipping delay support tickets</li>
                    <li>Enterprise accounts *Berlin Tech Solutions* and *London Financial* flagged as At Risk</li>
                  </ul>
                </div>
              </div>
            </div>

            <DataFlowIllustration className="w-full h-44 rounded-xl" />
          </div>
        </div>
      </section>

      {/* Supported Data Sources Ticker */}
      <section className="py-12 border-y border-[#1A1D24] bg-[#121417]/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-6">Connects Seamlessly to Your Existing Stack</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {dataSources.map((ds, idx) => (
              <div key={idx} className="px-4 py-2 bg-[#0B0C0E] border border-[#1A1D24] rounded-lg text-sm font-semibold text-gray-300 flex items-center space-x-2">
                <Database className="w-4 h-4 text-[#D4AF37]" />
                <span>{ds}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Audiences Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for <span className="text-[#D4AF37]">Every Audience</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] mt-4">
            One underlying platform, tailored experiences for Business Owners, Data Analysts, and Data Scientists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Owner */}
          <div className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Business Owners</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Understand your business in plain English. Get Executive Decision Briefs, track revenue movements, identify growth opportunities, and manage risks without needing SQL skills.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Understand → Decide → Act
            </div>
          </div>

          {/* Data Analyst */}
          <div className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Data Analysts</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Inspect SQL, explore schemas, validate calculations with evidence panels, build certified metric definitions, and deliver interactive dashboards 10x faster.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Explore → Analyze → Explain
            </div>
          </div>

          {/* Data Scientist */}
          <div className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Data Scientists</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Deep statistical analysis, forecasting model specs, scenario analysis simulations, and machine learning experiment tracking abstractions.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Experiment → Model → Predict
            </div>
          </div>
        </div>
      </section>

      {/* Signature Feature: Investigations */}
      <section className="py-20 px-4 sm:px-8 bg-[#121417]/30 border-t border-[#1A1D24]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <Search className="w-3.5 h-3.5" />
              <span>Signature Feature</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Persistent <span className="text-[#D4AF37]">Analytical Investigations</span>
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              AskMyData doesn't stop at one chart. It constructs multi-step investigative threads that trace root causes across revenue, customers, products, and operational tickets.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Branching investigative step threads</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Auditable evidence & raw data tracing</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Team comments, mentions, and action items</span>
              </li>
            </ul>

            <Link
              href="/demo"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-sm hover:bg-[#E5B800] transition-colors"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <DecisionVectorIllustration className="w-full h-80 rounded-2xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-[#1A1D24] text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="AskMyData Logo" className="w-5 h-5 object-contain" />
            <span className="font-bold text-white text-sm">ASKMYDATA</span>
            <span>© 2026 AskMyData Platform. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/security" className="hover:text-white">Security</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/login" className="hover:text-white">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  Brain,
  Sparkles,
  MessageSquare,
  FileText,
  Layers,
  Code
} from 'lucide-react';
import { HeroWorkflowCard } from '@/components/brand/HeroWorkflowCard';
import { DecisionVectorIllustration } from '@/components/brand/DecisionVectorIllustration';

export default function LandingPage() {
  const dataSources = [
    'PostgreSQL', 'MySQL', 'BigQuery', 'Snowflake', 'CSV Upload', 'Excel XLSX', 'JSON REST APIs'
  ];

  return (
    <div className="selection:bg-[#D4AF37] selection:text-black">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121417] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold shadow-inner">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>V2.0 AI Data Intelligence Platform • Powered by Google Gemini</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          Turn your data into <span className="text-[#D4AF37]">better decisions.</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-[#9CA3AF] max-w-3xl mx-auto font-normal leading-relaxed">
          AskMyData is an AI data intelligence platform that helps business owners, analysts, and teams understand what is happening, why it happened, and what to do next.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app/ask"
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-2xl text-base transition-all shadow-xl gold-glow flex items-center justify-center space-x-2 hover:scale-105"
          >
            <span>Start Analyzing Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white font-bold rounded-2xl text-base transition-all flex items-center justify-center space-x-2"
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Hero Interactive 4-Step Visual Demonstration Card */}
        <div className="pt-6">
          <HeroWorkflowCard />
        </div>
      </section>

      {/* Supported Data Sources Ticker */}
      <section className="py-12 border-y border-[#1A1D24] bg-[#121417]/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-6">Connects Seamlessly to Your Existing Stack</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {dataSources.map((ds, idx) => (
              <div key={idx} className="px-4 py-2 bg-[#0B0C0E] border border-[#1A1D24] hover:border-[#D4AF37]/40 rounded-xl text-xs sm:text-sm font-semibold text-gray-300 flex items-center space-x-2 transition-colors">
                <Database className="w-4 h-4 text-[#D4AF37]" />
                <span>{ds}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works: 4-Step Operational Framework */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">Operational Framework</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Ask. Investigate. Verify. Decide.
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] mt-3">
            Move beyond static spreadsheet charts into a complete analytical decision engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 relative group transition-all">
            <div className="text-2xl font-black text-[#D4AF37]/40 font-mono">01</div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Connect Data</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Connect your SQL databases, data warehouses, spreadsheets, or APIs into one unified intelligence layer.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 relative group transition-all">
            <div className="text-2xl font-black text-[#D4AF37]/40 font-mono">02</div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Ask Naturally</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Ask business questions in plain English without needing to write complex SQL queries.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 relative group transition-all">
            <div className="text-2xl font-black text-[#D4AF37]/40 font-mono">03</div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Investigate Root Causes</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Multi-step investigation engine automatically analyzes trends, anomalies, categories, and drivers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl space-y-3 relative group transition-all">
            <div className="text-2xl font-black text-[#D4AF37]/40 font-mono">04</div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Verified Decisions</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Receive 100% auditable SQL evidence panels and executive decision briefs to act with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Product Audiences Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#1A1D24]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Tailored Experiences for <span className="text-[#D4AF37]">Every Team Member</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] mt-4">
            Giving business owners simplicity, data analysts control, and data scientists speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Owner (Primary) */}
          <div className="p-8 bg-[#121417] border-2 border-[#D4AF37]/60 rounded-2xl transition-all space-y-4 shadow-xl relative">
            <span className="absolute -top-3 right-6 px-3 py-1 bg-[#D4AF37] text-black font-extrabold text-[10px] rounded-full uppercase tracking-wider">
              Primary Audience
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Business Owners & Executives</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Understand your business in plain English. Get Executive Decision Briefs, track revenue movements, identify churn risks, and act on clear recommendations without needing technical skills.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1">
              <span>Understand → Decide → Act</span>
            </div>
          </div>

          {/* Data Analyst */}
          <div className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Data Analysts</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              <strong>AI when you want speed. SQL when you want control.</strong> Inspect raw SQL, validate calculations with evidence panels, build certified metric definitions, and deliver interactive dashboards 10x faster.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Explore → Analyze → Audit
            </div>
          </div>

          {/* Data Scientist & Advanced Analyst */}
          <div className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Data Scientists & Advanced Analysts</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              <strong>Explore faster. Validate everything. Keep control.</strong> Structured notebook workflows, statistical validation, anomaly profiling, and reproducible data modeling abstractions.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Explore → Model → Validate
            </div>
          </div>
        </div>
      </section>

      {/* Signature Feature: Multi-Step Investigations */}
      <section className="py-20 px-4 sm:px-8 bg-[#121417]/30 border-t border-[#1A1D24]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <Search className="w-3.5 h-3.5" />
              <span>Signature Differentiator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Persistent Multi-Step <span className="text-[#D4AF37]">Investigations</span>
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Most AI tools stop at generating one isolated chart. AskMyData constructs branching multi-step investigative threads that trace underlying root causes across revenue, customers, products, and operational tickets.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Automated anomaly detection & trend driver breakdown</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Auditable read-only SQL query evidence tracing</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Exportable Executive Decision Briefs</span>
              </li>
            </ul>

            <Link
              href="/app/ask"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-sm hover:bg-[#E5B800] transition-colors gold-glow"
            >
              <span>Launch an Investigation</span>
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


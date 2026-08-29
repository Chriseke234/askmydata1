'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { DataFlowIllustration } from '@/components/brand/DataFlowIllustration';
import { DecisionVectorIllustration } from '@/components/brand/DecisionVectorIllustration';
import { MagneticButton } from '@/components/brand/MagneticButton';

export default function LandingPage() {
  const phrases = [
    "Building Tomorrow",
    "Understand What Changed",
    "Investigate Root Causes",
    "Predict Future Revenue"
  ];
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const dataSources = [
    'PostgreSQL', 'MySQL', 'BigQuery', 'Snowflake', 'CSV Upload', 'Excel XLSX', 'JSON Feeds', 'Google Sheets', 'AWS Redshift'
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-[#0B0C0E]/80 backdrop-blur-md border-b border-[#1A1D24] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <img src="/logo.png" alt="AskMyData Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-bold text-xl tracking-[0.15em] text-white">ASKMYDATA</span>
            <span className="hidden sm:block text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">AI Data Intelligence</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#9CA3AF]">
          <Link href="/features" className="hover:text-white transition-colors relative group py-1">
            <span>Features</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link href="/for-business" className="hover:text-white transition-colors relative group py-1">
            <span>For Business</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link href="/for-analysts" className="hover:text-white transition-colors relative group py-1">
            <span>For Analysts</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link href="/for-data-scientists" className="hover:text-white transition-colors relative group py-1">
            <span>For Scientists</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors relative group py-1">
            <span>Pricing</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/demo" className="hidden sm:inline-block px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white rounded-xl text-xs font-bold transition-colors">
            Live Demo
          </Link>
          <MagneticButton>
            <Link href="/login" className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider block transition-colors shadow-md gold-glow">
              Start Analyzing
            </Link>
          </MagneticButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-8 max-w-7xl mx-auto text-center min-h-[90vh] flex flex-col justify-between">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#121417] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
            <img src="/logo.png" alt="Icon" className="w-4 h-4 object-contain" />
            <span>V1 Production Release • Powered by Google Gemini</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white max-w-6xl mx-auto leading-[1.05]">
              Turn your data into <br />
              <span className="text-[#D4AF37]">better decisions.</span>
            </h1>

            {/* Phrase Cycling Indicator */}
            <div className="h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPhraseIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-lg sm:text-2xl text-[#C5A059] font-mono font-medium tracking-wide flex items-center"
                >
                  {phrases[currentPhraseIdx]}
                  <span className="inline-block w-2 h-5 bg-[#D4AF37] ml-2 animate-pulse" />
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-base sm:text-xl text-[#9CA3AF] max-w-3xl mx-auto font-normal leading-relaxed">
            Connect your data. Ask questions naturally. Understand what is happening, explain why, investigate root causes, and turn analysis into decisions your team can act on.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-base transition-all shadow-xl gold-glow flex items-center justify-center space-x-2"
              >
                <span>See Live Interactive Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white font-bold rounded-xl text-base transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
            </Link>
          </div>
        </div>

        {/* Bouncing Scroll Down Indicator */}
        <div className="pt-12 flex justify-center">
          <ChevronDown className="w-6 h-6 text-[#D4AF37] animate-bounce opacity-80" />
        </div>
      </section>

      {/* Hero Visual Mockup Card */}
      <section className="px-4 sm:px-8 max-w-6xl mx-auto pb-20">
        <div className="relative rounded-3xl border border-[#D4AF37]/40 bg-[#0B0C0E] p-4 sm:p-8 shadow-2xl gold-border-glow text-left">
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
            <div className="p-5 bg-[#121417] border border-[#1A1D24] rounded-2xl flex items-start space-x-3">
              <img src="/logo.png" alt="AskMyData Bot" className="w-7 h-7 object-contain shrink-0 mt-0.5" />
              <div className="space-y-2">
                <div className="text-sm font-bold text-white">Question: "Why did revenue drop in Europe last month?"</div>
                <div className="text-sm text-gray-200 leading-relaxed">
                  I analyzed the Northstar Commerce dataset. European revenue contracted **-22.4%** ($128,000 vs $165,000 previous period). The primary drivers are:
                  <ul className="list-disc list-inside mt-2 text-xs text-[#9CA3AF] space-y-1 font-mono">
                    <li>Electronics category drop (-22.4% in Smart IoT Hubs)</li>
                    <li>38% increase in European shipping delay support tickets</li>
                    <li>Enterprise accounts *Berlin Tech Solutions* and *London Financial* flagged as At Risk</li>
                  </ul>
                </div>
              </div>
            </div>

            <DataFlowIllustration className="w-full h-48 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Data Sources Marquee */}
      <section className="py-12 border-y border-[#1A1D24] bg-[#121417]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">Connects Seamlessly to Your Stack</p>
        </div>

        <div className="flex space-x-6 animate-marquee whitespace-nowrap group hover:[animation-play-state:paused]">
          {[...dataSources, ...dataSources].map((ds, idx) => (
            <div
              key={idx}
              className="px-6 py-3 bg-[#0B0C0E] border border-[#1A1D24] group-hover:border-[#D4AF37]/50 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all inline-flex items-center space-x-2 shrink-0 shadow-md"
            >
              <Database className="w-4 h-4 text-[#D4AF37]" />
              <span>{ds}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Audience Experience Matrix */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">TAILORED EXPERIENCES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for <span className="text-[#D4AF37]">Every Audience</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF]">
            One underlying platform with dedicated modes for Business Owners, Data Analysts, and Data Scientists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Owner Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/60 rounded-3xl space-y-5 transition-all shadow-xl gold-border-glow"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Business Owners</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Understand your business in plain English. Get Executive Decision Briefs, track revenue movements, identify growth opportunities, and manage risks without needing SQL skills.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
              Understand → Decide → Act
            </div>
          </motion.div>

          {/* Data Analyst Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/60 rounded-3xl space-y-5 transition-all shadow-xl gold-border-glow"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Data Analysts</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Inspect SQL, explore schemas, validate calculations with evidence panels, build certified metric definitions, and deliver interactive dashboards 10x faster.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
              Explore → Analyze → Explain
            </div>
          </motion.div>

          {/* Data Scientist Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 bg-[#121417] border border-[#1A1D24] hover:border-[#D4AF37]/60 rounded-3xl space-y-5 transition-all shadow-xl gold-border-glow"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Data Scientists</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Deep statistical analysis, forecasting model specs, scenario analysis simulations ("What-If" engine), and machine learning experiment tracking abstractions.
            </p>
            <div className="pt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
              Experiment → Model → Predict
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Feature: Investigations */}
      <section className="py-24 px-4 sm:px-8 bg-[#121417]/40 border-t border-[#1A1D24]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0C0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
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

            <MagneticButton>
              <Link
                href="/demo"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-sm hover:bg-[#E5B800] transition-colors shadow-lg gold-glow"
              >
                <span>Explore Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>

          <DecisionVectorIllustration className="w-full h-80 rounded-3xl" />
        </div>
      </section>

      {/* Bottom Magnetic CTA Section */}
      <section className="py-24 px-4 sm:px-8 text-center max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
          Ready to turn data into <span className="text-[#D4AF37]">decisions?</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mx-auto">
          Start exploring your data in plain English or test our live demo powered by Google Gemini AI.
        </p>
        <div className="pt-4 flex justify-center">
          <MagneticButton>
            <Link
              href="/demo"
              className="px-10 py-5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-2xl text-lg transition-all shadow-2xl gold-glow inline-flex items-center space-x-3"
            >
              <span>Launch Live Interactive Demo</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </MagneticButton>
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

          <div className="flex items-center space-x-6 font-medium">
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

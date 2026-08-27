'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Database,
  Building,
  UserCheck,
  Layers,
  Zap,
  Check,
  ShieldCheck
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // User Profile Config State
  const [role, setRole] = useState<'business' | 'analyst' | 'data_scientist'>('business');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('E-commerce & Retail');
  const [dataSource, setDataSource] = useState('Spreadsheets (CSV / Excel)');
  const [primaryGoal, setPrimaryGoal] = useState('Understand Revenue & Growth Drivers');

  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConfig = localStorage.getItem('askmydata_user_config');
      if (storedConfig) {
        try {
          const parsed = JSON.parse(storedConfig);
          if (parsed.company_name) setCompanyName(parsed.company_name);
          if (parsed.is_guest) setIsGuest(true);
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  const handleNextStep = () => {
    if (step === 4) {
      // Configure workspace
      setStep(5);
      setIsConfiguring(true);
      setTimeout(() => {
        setIsConfiguring(false);
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const handleCompleteOnboarding = () => {
    const finalConfig = {
      role,
      company_name: companyName || 'My Business',
      industry,
      data_source: dataSource,
      primary_goal: primaryGoal,
      is_guest: isGuest,
      completed_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('askmydata_user_config', JSON.stringify(finalConfig));
      localStorage.setItem('askmydata_user_role', role);
    }

    if (role === 'business') {
      router.push('/app/business');
    } else if (role === 'analyst') {
      router.push('/app/ask');
    } else {
      router.push('/app/data-science');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center p-4 selection:bg-[#D4AF37] selection:text-black">
      <div className="w-full max-w-xl bg-[#121417] border border-[#1A1D24] rounded-2xl p-6 sm:p-10 shadow-2xl gold-border-glow space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1A1D24] pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#0B0C0E] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-base">ASKMYDATA SETUP</span>
              {isGuest && <span className="block text-[10px] text-amber-400 font-mono font-semibold">Guest Sandbox Mode</span>}
            </div>
          </div>
          <span className="text-xs text-[#D4AF37] font-mono font-bold">
            STEP {step} OF 4
          </span>
        </div>

        {/* Step 1: Role Persona Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">1. Select your workspace role</h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                This tailors your default workspace features and intelligence tools to your expertise.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setRole('business')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  role === 'business'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-lg'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <UserCheck className={`w-5 h-5 shrink-0 mt-0.5 ${role === 'business' ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`} />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>Business Owner / Executive</span>
                    {role === 'business' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div className="text-xs text-[#9CA3AF]">Non-technical workspace: Executive briefs, 1-click messy data cleaner, and spreadsheet grid editor.</div>
                </div>
              </button>

              <button
                onClick={() => setRole('analyst')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  role === 'analyst'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-lg'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <Layers className={`w-5 h-5 shrink-0 mt-0.5 ${role === 'analyst' ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`} />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>Data Analyst</span>
                    {role === 'analyst' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div className="text-xs text-[#9CA3AF]">Speed + Control: Natural language AI inquiry + executable read-only SQL editor, audit evidence, and multi-step investigations.</div>
                </div>
              </button>

              <button
                onClick={() => setRole('data_scientist')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  role === 'data_scientist'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-lg'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${role === 'data_scientist' ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`} />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>Data Scientist & Advanced Analyst</span>
                    {role === 'data_scientist' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div className="text-xs text-[#9CA3AF]">Advanced statistics, hypothesis testing, forecasting simulations, and data distribution profiling.</div>
                </div>
              </button>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
            >
              <span>Next: Company & Industry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Company Profile & Industry */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">2. Your organization & industry</h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">Help us adapt domain vocabulary to your specific sector.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-300">Company / Organization Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Global Logistics"
                    className="w-full bg-[#0B0C0E] border border-[#262B36] focus:border-[#D4AF37] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-[#9CA3AF]">Primary Industry Sector</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'E-commerce & Retail',
                    'SaaS & Software',
                    'Finance & Banking',
                    'Logistics & Supply Chain',
                    'Healthcare & Pharma',
                    'Professional Services'
                  ].map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        industry === ind
                          ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-md'
                          : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-[#0B0C0E] border border-[#262B36] text-[#9CA3AF] hover:text-white font-bold rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
              >
                <span>Next: Data Sources</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Data Infrastructure & Sources */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">3. Primary data sources</h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">What format is your primary business data stored in?</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Spreadsheets (CSV / Excel / TSV)', desc: 'Upload spreadsheet files directly to start analyzing instantly.' },
                { title: 'PostgreSQL / MySQL Databases', desc: 'Connect direct read-only SQL database endpoints.' },
                { title: 'Data Warehouses (Snowflake / BigQuery)', desc: 'Enterprise data warehouse connector layer.' },
                { title: 'REST API & Webhook Feeds', desc: 'JSON API streams and live external webhooks.' }
              ].map((src) => (
                <button
                  key={src.title}
                  type="button"
                  onClick={() => setDataSource(src.title)}
                  className={`w-full p-3.5 rounded-xl border text-left space-y-1 transition-all ${
                    dataSource === src.title
                      ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs text-white flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-[#D4AF37]" />
                      <span>{src.title}</span>
                    </span>
                    {dataSource === src.title && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] pl-6">{src.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 bg-[#0B0C0E] border border-[#262B36] text-[#9CA3AF] hover:text-white font-bold rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
              >
                <span>Next: Primary Goal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Primary Analytical Goal */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">4. What is your primary goal?</h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">We will configure your workspace starter prompts and layout.</p>
            </div>

            <div className="space-y-2.5">
              {[
                'Understand Revenue & Growth Drivers',
                'Identify & Reduce Customer Churn Risks',
                'Clean, Format & Fix Messy Data Files',
                'Build Certified Executive Dashboards',
                'Investigate Operational & Ticket Anomalies'
              ].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setPrimaryGoal(g)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    primaryGoal === g
                      ? 'bg-[#1A1D24] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>{g}</span>
                  </span>
                  {primaryGoal === g && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/3 py-3 bg-[#0B0C0E] border border-[#262B36] text-[#9CA3AF] hover:text-white font-bold rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
              >
                <span>Complete Workspace Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Final Configuration Screen */}
        {step === 5 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300 py-4">
            {isConfiguring ? (
              <div className="space-y-4 py-8">
                <div className="w-16 h-16 rounded-2xl bg-[#0B0C0E] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] animate-pulse shadow-xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold text-white">Initializing Custom Workspace for {companyName || 'Your Business'}...</h2>
                <div className="text-xs text-[#9CA3AF] space-y-1 max-w-sm mx-auto">
                  <p className="flex items-center justify-center space-x-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Configured persona layout: {role.toUpperCase()}</span>
                  </p>
                  <p className="flex items-center justify-center space-x-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Industry context: {industry}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-white">Your Workspace is Ready!</h2>
                  <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
                    Configured for <strong>{companyName || 'Your Business'}</strong> ({industry}). You can upload your real CSV/Excel business data immediately.
                  </p>
                </div>

                <button
                  onClick={handleCompleteOnboarding}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow shadow-xl"
                >
                  Enter {role === 'business' ? 'Business Workspace' : role === 'analyst' ? 'Analyst Workspace' : 'Data Science Lab'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

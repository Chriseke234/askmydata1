'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2, ArrowRight, Database, Upload, Zap, UserCheck, Layers } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'business' | 'analyst' | 'data_scientist'>('business');
  const [selectedGoal, setSelectedGoal] = useState('Understand my business');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step === 3) {
      // Trigger automatic data profiling phase
      setStep(4);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(5); // Ready!
      }, 2500);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#121417] border border-[#1A1D24] rounded-2xl p-6 sm:p-10 shadow-2xl gold-border-glow space-y-6">
        {/* Step Counter */}
        <div className="flex items-center justify-between border-b border-[#1A1D24] pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-white text-base">ASKMYDATA ONBOARDING</span>
          </div>
          <span className="text-xs text-[#C5A059] font-mono font-bold">STEP {step} OF 5</span>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Let's get your data ready</h2>
              <p className="text-sm text-[#9CA3AF]">
                Welcome to AskMyData. We'll set up your personalized workspace based on your role and analytical goals.
              </p>
            </div>

            <div className="p-4 bg-[#0B0C0E] border border-[#1A1D24] rounded-xl flex items-center space-x-3">
              <Zap className="w-6 h-6 text-[#D4AF37]" />
              <div className="text-xs text-gray-300">
                You'll be exploring the <strong>Northstar Commerce</strong> dataset to start immediately without any complex setup.
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all shadow-md gold-glow flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">What is your primary role?</h2>
              <p className="text-xs text-[#9CA3AF]">This sets your default workspace mode (you can switch anytime).</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole('business')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === 'business'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Business Owner / Executive</div>
                  <div className="text-xs text-[#9CA3AF]">Focus on business metrics, risks, opportunities, and decision briefs.</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('analyst')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === 'analyst'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Data Analyst</div>
                  <div className="text-xs text-[#9CA3AF]">Access SQL editor, data quality scores, certified metrics, and dashboards.</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('data_scientist')}
                className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === 'data_scientist'
                    ? 'bg-[#1A1D24] border-[#D4AF37] text-white'
                    : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Data Scientist</div>
                  <div className="text-xs text-[#9CA3AF]">Statistical models, hypothesis testing, forecasting, and ML abstractions.</div>
                </div>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Goal Selection */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">What is your main goal today?</h2>
              <p className="text-xs text-[#9CA3AF]">We will generate tailored starter questions for you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Understand my business',
                'Explore raw dataset',
                'Build executive dashboard',
                'Investigate sales decline',
                'Forecast upcoming revenue',
                'Identify customer churn'
              ].map((goal, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                    selectedGoal === goal
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#0B0C0E] border-[#1A1D24] text-gray-300 hover:text-white'
                  }`}
                >
                  ✓ {goal}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow flex items-center justify-center space-x-2"
            >
              <span>Start Automated Profiling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Automated Profiling Progress */}
        {step === 4 && (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#0B0C0E] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-white">Profiling Northstar Commerce Data...</h2>
            <div className="text-xs text-[#9CA3AF] space-y-1">
              <p>✓ Checking schema integrity...</p>
              <p>✓ Calculating data health score (Score: 98/100)...</p>
              <p>✓ Building semantic metric definitions...</p>
            </div>
          </div>
        )}

        {/* Step 5: Ready! */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your data is ready!</h2>
              <p className="text-xs text-[#9CA3AF]">Here are your personalized starter questions based on your selections:</p>
            </div>

            <div className="space-y-2">
              {[
                'How is the business performing?',
                'Why did revenue fall in Europe last month?',
                'Which products are driving growth?',
                'Find my top revenue opportunities'
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(`/app/ask?q=${encodeURIComponent(q)}`)}
                  className="w-full p-3 bg-[#0B0C0E] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl text-left text-xs font-semibold text-gray-200 transition-colors flex items-center justify-between group"
                >
                  <span>"{q}"</span>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37]" />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('askmydata_user_role', selectedRole);
                }
                if (selectedRole === 'business') {
                  router.push('/app/business');
                } else if (selectedRole === 'analyst') {
                  router.push('/app/ask');
                } else {
                  router.push('/app/data-science');
                }
              }}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-sm transition-all gold-glow"
            >
              Go to {selectedRole === 'business' ? 'Business Workspace' : selectedRole === 'analyst' ? 'Analyst Workspace' : 'Data Science Lab'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

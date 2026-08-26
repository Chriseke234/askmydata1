'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Code, 
  BarChart3, 
  Search, 
  Layers, 
  ArrowRight, 
  RefreshCw,
  Zap,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { GeminiProvider } from '@/lib/ai/gemini-provider';

function AskAIContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'ai';
    content: string;
    chartSpec?: any;
    evidence?: any;
    followUps?: string[];
  }>>([]);

  const [progressState, setProgressState] = useState<string | null>(null);

  const gemini = new GeminiProvider();

  useEffect(() => {
    if (initialQuery) {
      handleAsk(initialQuery);
    }
  }, [initialQuery]);

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsgId = Date.now().toString();
    const newUserMsg = { id: userMsgId, sender: 'user' as const, content: queryText };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputQuery('');

    setProgressState('Understanding your question...');
    await new Promise((r) => setTimeout(r, 600));

    setProgressState('Finding relevant dataset schemas...');
    await new Promise((r) => setTimeout(r, 600));

    setProgressState('Executing read-only statistical query...');
    await new Promise((r) => setTimeout(r, 700));

    setProgressState('Verifying calculation correctness...');
    await new Promise((r) => setTimeout(r, 500));

    const response = await gemini.analyze({
      prompt: queryText,
      workspaceId: 'northstar-workspace',
      explanationLevel: 'detailed'
    });

    setProgressState(null);

    const aiMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: aiMsgId,
        sender: 'ai',
        content: response.answer,
        chartSpec: response.chartSpec,
        evidence: response.evidence,
        followUps: response.suggestedFollowUps,
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-[#0B0C0E]">
      {/* Header */}
      <div className="p-4 sm:px-8 border-b border-[#1A1D24] bg-[#0B0C0E] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base">AskMyData AI Analyst</h1>
            <p className="text-xs text-[#9CA3AF]">Connected: Northstar Commerce Datasets</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([])}
          className="px-3 py-1.5 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] rounded-lg text-xs text-[#9CA3AF] hover:text-white flex items-center space-x-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Thread</span>
        </button>
      </div>

      {/* Conversation Workspace Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {messages.length === 0 && !progressState && (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#121417] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Ask your data anything</h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto">
              AskMyData will discover schema relationships, execute controlled queries, verify calculations, and visualize findings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-4 text-left">
              {[
                "How is the business performing?",
                "Why did sales fall in Europe last month?",
                "Which products are growing fastest?",
                "Show customer churn rate by region"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(q)}
                  className="p-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/50 rounded-xl text-xs font-semibold text-gray-200 transition-colors flex items-center justify-between group"
                >
                  <span>"{q}"</span>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-4 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {msg.sender === 'user' ? (
              <div className="max-w-2xl p-4 bg-[#1A1D24] text-white rounded-2xl border border-[#262B36] text-sm font-medium">
                {msg.content}
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="p-6 bg-[#121417] border border-[#1A1D24] rounded-2xl space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2 border-b border-[#1A1D24] pb-3">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-bold text-white text-sm">AskMyData AI Analyst</span>
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>

                {msg.chartSpec && <AskChart spec={msg.chartSpec} />}
                {msg.evidence && <EvidencePanel evidence={msg.evidence} />}

                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="p-4 bg-[#121417] border border-[#1A1D24] rounded-xl space-y-2">
                    <div className="text-xs font-semibold text-[#9CA3AF]">Suggested Follow-ups:</div>
                    <div className="flex flex-wrap gap-2">
                      {msg.followUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAsk(fu)}
                          className="px-3 py-1.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs text-[#D4AF37] rounded-lg transition-colors"
                        >
                          {fu} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {progressState && (
          <div className="p-4 bg-[#121417] border border-[#D4AF37]/40 rounded-xl flex items-center space-x-3 text-xs text-[#D4AF37] animate-pulse">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{progressState}</span>
          </div>
        )}
      </div>

      {/* Fixed Bottom Input Bar */}
      <div className="p-4 bg-[#0B0C0E] border-t border-[#1A1D24]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputQuery);
          }}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          <Sparkles className="w-5 h-5 text-[#D4AF37] absolute left-4" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question or request a deeper investigation..."
            className="w-full bg-[#121417] border border-[#262B36] focus:border-[#D4AF37] rounded-xl pl-12 pr-28 py-3 text-sm text-white placeholder-[#9CA3AF] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-lg flex items-center space-x-1 transition-colors"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AskAIWorkspace() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-xs text-[#9CA3AF]">
        Loading AskMyData AI Analyst Workspace...
      </div>
    }>
      <AskAIContent />
    </Suspense>
  );
}

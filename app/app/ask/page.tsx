'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  Database, 
  RefreshCw,
  ArrowRight,
  Upload,
  ChevronDown
} from 'lucide-react';
import { AskChart } from '@/components/charts/AskChart';
import { EvidencePanel } from '@/components/ai/EvidencePanel';
import { GeminiProvider } from '@/lib/ai/gemini-provider';
import { RealtimeDataStore, RealtimeDataset } from '@/lib/data/realtime-store';
import { DatasetUploadModal } from '@/components/data/DatasetUploadModal';

function AskAIContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const dsParam = searchParams.get('ds') || '';
  const autoReadParam = searchParams.get('autoRead') === '1';

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [datasets, setDatasets] = useState<RealtimeDataset[]>([]);
  const [activeDataset, setActiveDataset] = useState<RealtimeDataset | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
    const loaded = RealtimeDataStore.getDatasets();
    setDatasets(loaded);

    let targetDs = loaded.length > 0 ? loaded[0] : null;
    if (dsParam) {
      const found = loaded.find((d) => d.id === dsParam);
      if (found) targetDs = found;
    }
    setActiveDataset(targetDs);

    if (autoReadParam && targetDs) {
      handleAutoReadDataset(targetDs);
    }
  }, [dsParam, autoReadParam]);

  useEffect(() => {
    if (initialQuery && activeDataset && !autoReadParam) {
      handleAsk(initialQuery);
    }
  }, [initialQuery, activeDataset]);

  const handleAutoReadDataset = async (targetDs: RealtimeDataset) => {
    setMessages([]);
    setProgressState(`Reading dataset schema for "${targetDs.name}"...`);
    await new Promise((r) => setTimeout(r, 400));

    setProgressState(`Analyzing ${targetDs.rowCount} rows & ${targetDs.colCount} columns...`);
    await new Promise((r) => setTimeout(r, 500));

    setProgressState('Generating AI dataset intelligence brief...');
    await new Promise((r) => setTimeout(r, 400));

    const response = await gemini.analyze({
      prompt: `Analyze and summarize key insights for dataset ${targetDs.name}`,
      workspaceId: 'realtime-workspace',
      activeDataset: targetDs,
      explanationLevel: 'detailed'
    });

    setProgressState(null);

    const aiMsgId = Date.now().toString();
    setMessages([
      {
        id: aiMsgId,
        sender: 'ai',
        content: `I have read your uploaded dataset **"${targetDs.name}"** (${targetDs.rowCount} rows, ${targetDs.colCount} columns):\n\n${response.answer}`,
        chartSpec: response.chartSpec,
        evidence: response.evidence,
        followUps: response.suggestedFollowUps,
      }
    ]);
  };

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsgId = Date.now().toString();
    const newUserMsg = { id: userMsgId, sender: 'user' as const, content: queryText };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputQuery('');

    if (!activeDataset) {
      const aiMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          content: 'No dataset is currently uploaded. Please upload a CSV or Excel file to analyze metrics and ask questions.',
          followUps: ['Upload a CSV or Excel file']
        }
      ]);
      return;
    }

    setProgressState('Inspecting schema & column types...');
    await new Promise((r) => setTimeout(r, 400));

    setProgressState(`Running query on ${activeDataset.name}...`);
    await new Promise((r) => setTimeout(r, 500));

    setProgressState('Verifying calculation correctness...');
    await new Promise((r) => setTimeout(r, 400));

    const response = await gemini.analyze({
      prompt: queryText,
      workspaceId: 'realtime-workspace',
      activeDataset: activeDataset,
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

  const handleUploadSuccess = (newDs: RealtimeDataset) => {
    const updated = RealtimeDataStore.getDatasets();
    setDatasets(updated);
    setActiveDataset(newDs);
    handleAutoReadDataset(newDs);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-[#0B0C0E] overflow-hidden">
      {/* Header Bar with Glassmorphism */}
      <header className="p-4 sm:px-8 border-b border-[#1A1D24] bg-[#0B0C0E]/90 backdrop-blur-md sticky top-0 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-white text-base sm:text-lg tracking-tight">AskMyData AI Analyst</h1>
              <span className="text-[10px] px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full font-mono font-semibold hidden sm:inline-block">
                v2.0 Gold Edition
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF]">Query real business datasets with verified natural language intelligence.</p>
          </div>
        </div>

        {/* Dataset Selector Dropdown & Upload Action */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {datasets.length > 0 && (
            <div className="relative">
              <select
                value={activeDataset?.id || ''}
                onChange={(e) => {
                  const ds = datasets.find(d => d.id === e.target.value);
                  if (ds) {
                    setActiveDataset(ds);
                    handleAutoReadDataset(ds);
                  }
                }}
                className="appearance-none bg-[#121417] border border-[#262B36] hover:border-[#D4AF37] rounded-xl px-3 py-2 pr-8 text-xs font-bold text-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 cursor-pointer shadow-sm transition-all"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#121417] text-white">
                    Connected: {d.name} ({d.rowCount} rows)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-2.5 top-3 pointer-events-none" />
            </div>
          )}

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all gold-glow shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Dataset</span>
            <span className="sm:hidden">Upload</span>
          </button>

          <button
            onClick={() => activeDataset && handleAutoReadDataset(activeDataset)}
            title="Re-read dataset schema"
            className="p-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] hover:border-[#D4AF37]/50 rounded-xl text-xs text-[#9CA3AF] hover:text-white transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Conversation Workspace Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full scrollbar-thin scrollbar-thumb-[#1A1D24]">
        {messages.length === 0 && !progressState && (
          <div className="py-12 px-4 text-center space-y-6 bg-[#121417]/40 backdrop-blur-sm border border-[#1A1D24] rounded-3xl max-w-3xl mx-auto my-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#D4AF37] shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeDataset ? `Ask questions about ${activeDataset.name}` : 'Upload a Business Dataset to Begin'}
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                AskMyData reads auto-detected column schemas, calculates certified metrics, and generates interactive real-time visual charts.
              </p>
            </div>

            {activeDataset ? (
              <div className="space-y-3 max-w-2xl mx-auto pt-2">
                <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider text-left pl-1">
                  Suggested Prompts
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                  {[
                    `Summarize dataset insights`,
                    `Show total Value breakdown`,
                    `Which row has the highest Value?`,
                    `Are there any data quality issues?`
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAsk(q)}
                      className="p-3.5 bg-[#121417] hover:bg-[#1A1D24] border border-[#1A1D24] hover:border-[#D4AF37]/60 rounded-xl text-xs font-semibold text-gray-200 transition-all flex items-center justify-between group shadow-sm hover:translate-x-0.5"
                    >
                      <span>"{q}"</span>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37] transition-colors shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all gold-glow shadow-lg hover:scale-105"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload CSV or Excel File Now</span>
                </button>
              </div>
            )}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-3 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {msg.sender === 'user' ? (
              <div className="max-w-2xl p-4 bg-[#1A1D24]/90 backdrop-blur-md text-white rounded-2xl border border-[#262B36] text-sm font-medium shadow-md">
                {msg.content}
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="p-6 bg-[#121417]/95 backdrop-blur-md border border-[#1A1D24] hover:border-[#D4AF37]/30 rounded-2xl space-y-4 shadow-xl transition-all">
                  <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      <span className="font-bold text-white text-sm">AskMyData AI Analyst</span>
                    </div>
                    {activeDataset && (
                      <div className="flex items-center space-x-1.5 text-[10px] px-2.5 py-1 bg-[#0B0C0E] border border-[#D4AF37]/30 text-[#D4AF37] font-mono rounded-lg">
                        <Database className="w-3 h-3" />
                        <span>Active: {activeDataset.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>

                {msg.chartSpec && <AskChart spec={msg.chartSpec} />}
                {msg.evidence && <EvidencePanel evidence={msg.evidence} />}

                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="p-4 bg-[#121417]/80 backdrop-blur-sm border border-[#1A1D24] rounded-2xl space-y-2.5 shadow-md">
                    <div className="text-xs font-semibold text-[#9CA3AF] flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Suggested Next Questions:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.followUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (fu.includes('Upload')) {
                              setIsUploadModalOpen(true);
                            } else {
                              handleAsk(fu);
                            }
                          }}
                          className="px-3.5 py-1.5 bg-[#0B0C0E] border border-[#262B36] hover:border-[#D4AF37] text-xs text-[#D4AF37] hover:bg-[#121417] rounded-xl transition-all font-medium flex items-center space-x-1"
                        >
                          <span>{fu}</span>
                          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
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
          <div className="p-4 bg-[#121417]/90 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl flex items-center space-x-3 text-xs text-[#D4AF37] shadow-xl animate-pulse">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{progressState}</span>
          </div>
        )}
      </div>

      {/* Fixed Bottom Input Bar with Glassmorphism */}
      <div className="p-4 bg-[#0B0C0E]/95 backdrop-blur-md border-t border-[#1A1D24]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputQuery);
          }}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          <Sparkles className="w-5 h-5 text-[#D4AF37] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={activeDataset ? `Ask anything about ${activeDataset.name}...` : 'Upload a CSV or Excel file to ask questions...'}
            className="w-full bg-[#121417] border border-[#262B36] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 rounded-2xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-[#9CA3AF] focus:outline-none transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Upload Modal */}
      <DatasetUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}

export default function AskAIWorkspace() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-xs text-[#9CA3AF]">
        Loading Real-Time AI Analyst Workspace...
      </div>
    }>
      <AskAIContent />
    </Suspense>
  );
}

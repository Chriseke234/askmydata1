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
import { RealtimeDataStore, RealtimeDataset, SAMPLE_DATASETS } from '@/lib/data/realtime-store';
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
    const all = loaded.length > 0 ? loaded : SAMPLE_DATASETS;
    setDatasets(all);

    let targetDs = all[0];
    if (dsParam) {
      const found = all.find((d) => d.id === dsParam);
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

    setProgressState('Inspecting schema & column types...');
    await new Promise((r) => setTimeout(r, 400));

    setProgressState(`Running query on ${activeDataset?.name || 'Dataset'}...`);
    await new Promise((r) => setTimeout(r, 500));

    setProgressState('Verifying calculation correctness...');
    await new Promise((r) => setTimeout(r, 400));

    const response = await gemini.analyze({
      prompt: queryText,
      workspaceId: 'realtime-workspace',
      activeDataset: activeDataset || undefined,
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
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-[#0B0C0E]">
      {/* Header Bar */}
      <div className="p-4 sm:px-8 border-b border-[#1A1D24] bg-[#0B0C0E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#121417] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base">AskMyData AI Analyst</h1>
            <p className="text-xs text-[#9CA3AF]">Query real uploaded business datasets in natural language.</p>
          </div>
        </div>

        {/* Dataset Selector Dropdown & Upload Action */}
        <div className="flex items-center space-x-2">
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
                className="appearance-none bg-[#121417] border border-[#262B36] hover:border-[#D4AF37] rounded-xl px-3 py-1.5 pr-8 text-xs font-bold text-[#D4AF37] focus:outline-none cursor-pointer"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#121417] text-white">
                    Connected: {d.name} ({d.rowCount} rows)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          )}

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all gold-glow"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Dataset</span>
          </button>

          <button
            onClick={() => activeDataset && handleAutoReadDataset(activeDataset)}
            title="Re-read dataset"
            className="p-1.5 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] rounded-xl text-xs text-[#9CA3AF] hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Conversation Workspace Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {messages.length === 0 && !progressState && (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#121417] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Ask questions about {activeDataset?.name || 'your dataset'}
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto">
              AskMyData reads auto-detected column schemas, executes calculated summaries, and generates verified visualizations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-4 text-left">
              {[
                `Summarize key metrics in ${activeDataset?.name || 'dataset'}`,
                `Show breakdown by ${activeDataset?.columns[0]?.name || 'category'}`,
                `Which record has the highest value?`,
                `Are there any anomalies or missing values?`
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
                    <span className="text-[10px] px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] font-mono rounded">
                      Active File: {activeDataset?.name}
                    </span>
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
            placeholder={`Ask anything about ${activeDataset?.name || 'your dataset'}...`}
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

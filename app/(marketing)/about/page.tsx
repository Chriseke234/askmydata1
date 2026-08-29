'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white pt-24">
      <main className="max-w-3xl mx-auto px-4 py-16 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-white">About AskMyData</h1>
        <p className="text-gray-300 leading-relaxed">
          AskMyData was created to bridge the gap between business executives who need fast answers and data teams who need rigorous analytical tools. By combining AI natural language tool execution, evidence verification, persistent investigations, and interactive dashboards, AskMyData enables teams to turn data into confident decisions.
        </p>
      </main>
    </div>
  );
}

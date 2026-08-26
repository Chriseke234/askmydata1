'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/shell/AppSidebar';
import { MobileNav } from '@/components/shell/MobileNav';
import { UniversalCommandBar } from '@/components/shell/UniversalCommandBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<'decision' | 'analyst' | 'data_science'>('decision');
  const [commandBarOpen, setCommandBarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col lg:flex-row selection:bg-[#D4AF37] selection:text-black">
      {/* Universal Command Palette */}
      <UniversalCommandBar isOpen={commandBarOpen} onClose={() => setCommandBarOpen(false)} />

      {/* Desktop Sidebar */}
      <AppSidebar
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        onOpenCommandBar={() => setCommandBarOpen(true)}
      />

      {/* Mobile Top & Bottom Navigation */}
      <MobileNav onOpenCommandBar={() => setCommandBarOpen(true)} />

      {/* Main Product Canvas */}
      <main className="flex-1 min-w-0 pb-16 lg:pb-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

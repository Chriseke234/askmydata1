'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Database, 
  BarChart3, 
  Search, 
  FileText, 
  Presentation, 
  Users, 
  FlaskConical, 
  Settings, 
  Zap
} from 'lucide-react';

interface AppSidebarProps {
  currentMode: 'decision' | 'analyst' | 'data_science';
  onModeChange: (mode: 'decision' | 'analyst' | 'data_science') => void;
  onOpenCommandBar: () => void;
}

export function AppSidebar({ currentMode, onModeChange, onOpenCommandBar }: AppSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Overview', href: '/app', icon: LayoutDashboard },
    { name: 'Ask AI Analyst', href: '/app/ask', icon: MessageSquareCode, badge: 'AI' },
    { name: 'Data Catalog', href: '/app/data', icon: Database },
    { name: 'Saved Analyses', href: '/app/analyses', icon: BarChart3 },
    { name: 'Investigations', href: '/app/investigations', icon: Search, badge: 'Signature' },
    { name: 'Decision Briefs', href: '/app/decision-briefs', icon: Zap },
    { name: 'Dashboards', href: '/app/dashboards', icon: LayoutDashboard },
    { name: 'Executive Reports', href: '/app/reports', icon: FileText },
    { name: 'Presentations', href: '/app/presentations', icon: Presentation },
    { name: 'Data Science', href: '/app/data-science', icon: FlaskConical },
    { name: 'Team Workspace', href: '/app/team', icon: Users },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0B0C0E] border-r border-[#1A1D24] h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#1A1D24]">
        <Link href="/app" className="flex items-center space-x-3 group">
          <img src="/logo.png" alt="AskMyData Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-bold text-lg text-white tracking-wide">ASKMYDATA</span>
            <span className="block text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">Data Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Mode Selector */}
      <div className="p-3 border-b border-[#1A1D24] bg-[#121417]/50">
        <div className="text-[11px] text-[#9CA3AF] mb-1 px-2 font-medium uppercase tracking-wider">Workspace Mode</div>
        <div className="grid grid-cols-3 gap-1 bg-[#0B0C0E] p-1 rounded-lg border border-[#1A1D24]">
          <button
            onClick={() => onModeChange('decision')}
            className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all ${
              currentMode === 'decision'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
            title="Decision Mode (Business Executive)"
          >
            Decision
          </button>
          <button
            onClick={() => onModeChange('analyst')}
            className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all ${
              currentMode === 'analyst'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
            title="Analyst Mode (SQL & Visuals)"
          >
            Analyst
          </button>
          <button
            onClick={() => onModeChange('data_science')}
            className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all ${
              currentMode === 'data_science'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
            title="Data Science Mode (ML & Stats)"
          >
            Science
          </button>
        </div>
      </div>

      {/* Command Shortcut Trigger */}
      <div className="px-3 py-2">
        <button
          onClick={onOpenCommandBar}
          className="w-full py-2 px-3 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] rounded-lg text-left text-xs text-[#9CA3AF] flex items-center justify-between transition-colors group"
        >
          <span className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Ask anything...</span>
          </span>
          <kbd className="px-1.5 py-0.5 bg-[#0B0C0E] text-[10px] text-[#9CA3AF] rounded border border-[#262B36] group-hover:border-[#D4AF37]/50">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-[#1A1D24] text-white font-semibold border-l-2 border-[#D4AF37]'
                  : 'text-[#9CA3AF] hover:bg-[#121417] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  item.badge === 'AI' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#1A1D24] text-[#9CA3AF]'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile & Settings */}
      <div className="p-3 border-t border-[#1A1D24] space-y-1 bg-[#0B0C0E]">
        <Link
          href="/app/settings/profile"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#9CA3AF] hover:bg-[#121417] hover:text-white"
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-4 h-4 text-[#9CA3AF]" />
            <span>Settings</span>
          </div>
        </Link>

        {/* User Card */}
        <div className="pt-2 mt-2 border-t border-[#1A1D24] flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alex Morgan"
              className="w-8 h-8 rounded-full border border-[#D4AF37]/50 object-cover"
            />
            <div>
              <div className="text-xs font-semibold text-white">Alex Morgan</div>
              <div className="text-[10px] text-[#C5A059] uppercase font-bold">Northstar Commerce</div>
            </div>
          </div>
          <Link href="/login" className="text-[#9CA3AF] hover:text-white text-xs">
            Log out
          </Link>
        </div>
      </div>
    </aside>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Database, 
  Search, 
  User, 
  Menu, 
  X, 
  BarChart3, 
  FileText, 
  Presentation, 
  FlaskConical, 
  Users, 
  Settings,
  Zap
} from 'lucide-react';

interface MobileNavProps {
  onOpenCommandBar: () => void;
}

export function MobileNav({ onOpenCommandBar }: MobileNavProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { name: 'Overview', href: '/app', icon: LayoutDashboard },
    { name: 'Ask AI', href: '/app/ask', icon: MessageSquareCode, isAccent: true },
    { name: 'Data', href: '/app/data', icon: Database },
    { name: 'Investigations', href: '/app/investigations', icon: Search },
    { name: 'Profile', href: '/app/settings/profile', icon: User },
  ];

  const drawerItems = [
    { name: 'Decision Briefs', href: '/app/decision-briefs', icon: Zap },
    { name: 'Saved Analyses', href: '/app/analyses', icon: BarChart3 },
    { name: 'Dashboards', href: '/app/dashboards', icon: LayoutDashboard },
    { name: 'Reports', href: '/app/reports', icon: FileText },
    { name: 'Presentations', href: '/app/presentations', icon: Presentation },
    { name: 'Data Science Workspace', href: '/app/data-science', icon: FlaskConical },
    { name: 'Team Workspace', href: '/app/team', icon: Users },
    { name: 'Settings & Glossary', href: '/app/settings/profile', icon: Settings },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur border-b border-[#1A1D24] px-4 py-3 flex items-center justify-between">
        <Link href="/app" className="flex items-center space-x-2">
          <img src="/logo.png" alt="AskMyData Logo" className="w-7 h-7 object-contain" />
          <span className="font-bold text-white text-base tracking-wide">ASKMYDATA</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenCommandBar}
            className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-[#D4AF37] hover:bg-[#1A1D24]"
            aria-label="Open Command Bar"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 bg-[#121417] border border-[#262B36] rounded-lg text-white hover:bg-[#1A1D24]"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0C0E] border-t border-[#1A1D24] px-2 py-2 flex items-center justify-around">
        {mainTabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== '/app' && pathname.startsWith(tab.href));
          const Icon = tab.icon;

          if (tab.isAccent) {
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="flex flex-col items-center justify-center py-1 px-3 bg-[#D4AF37] text-black rounded-xl font-bold shadow-md gold-glow transform -translate-y-2 transition-transform"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] tracking-tight">{tab.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-xs transition-colors ${
                isActive ? 'text-[#D4AF37] font-bold' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          
          <div className="relative w-4/5 max-w-xs bg-[#0B0C0E] border-r border-[#1A1D24] h-full flex flex-col p-4 shadow-2xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1D24]">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="AskMyData Logo" className="w-6 h-6 object-contain" />
                <span className="font-bold text-white text-base">ASKMYDATA</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              <div className="text-[11px] text-[#9CA3AF] px-2 mb-2 font-semibold uppercase tracking-wider">All Workspace Modules</div>
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-[#1A1D24] text-[#D4AF37] font-semibold' : 'text-[#9CA3AF] hover:bg-[#121417] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-[#1A1D24]">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Alex Morgan"
                  className="w-9 h-9 rounded-full border border-[#D4AF37]"
                />
                <div>
                  <div className="text-sm font-semibold text-white">Alex Morgan</div>
                  <div className="text-xs text-[#C5A059]">Northstar Commerce</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

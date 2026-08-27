'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/for-business', label: 'For Business' },
    { href: '/for-analysts', label: 'For Analysts' },
    { href: '/for-data-scientists', label: 'For Data Scientists' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/security', label: 'Security' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur-md border-b border-[#1A1D24] px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <img src="/logo.png" alt="AskMyData Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-bold text-xl tracking-wide text-white">ASKMYDATA</span>
            <span className="hidden sm:block text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">AI Data Intelligence Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 font-medium transition-colors ${
                  isActive ? 'text-[#D4AF37] font-bold' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] hover:border-[#D4AF37]/50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Sign In
          </Link>
          <Link
            href="/app/ask"
            className="px-4.5 py-2 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-bold rounded-xl text-sm transition-all shadow-md gold-glow hover:scale-[1.02]"
          >
            Start Analyzing
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 bg-[#121417] border border-[#262B36] rounded-xl text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[#1A1D24] space-y-3 pb-2 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#121417] text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#121417]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col space-y-2 sm:hidden">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-[#121417] border border-[#262B36] text-white rounded-xl text-sm font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/app/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-[#D4AF37] text-black font-bold rounded-xl text-sm gold-glow"
            >
              Start Analyzing Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

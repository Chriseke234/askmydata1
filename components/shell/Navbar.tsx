'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/brand/MagneticButton';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0C0E]/85 backdrop-blur-md border-b border-[#1A1D24] shadow-2xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="AskMyData Logo"
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-extrabold text-xl tracking-[0.15em] text-white">ASKMYDATA</span>
              <span className="hidden sm:block text-[9px] text-[#C5A059] uppercase tracking-widest font-semibold">
                AI Data Intelligence
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#9CA3AF]">
            <Link href="/features" className="hover:text-white transition-colors relative group py-1">
              <span>Features</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link href="/for-business" className="hover:text-white transition-colors relative group py-1">
              <span>For Business</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link href="/for-analysts" className="hover:text-white transition-colors relative group py-1">
              <span>For Analysts</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link href="/for-data-scientists" className="hover:text-white transition-colors relative group py-1">
              <span>For Scientists</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors relative group py-1">
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/demo"
              className="hidden sm:inline-block px-4 py-2 bg-[#121417] hover:bg-[#1A1D24] border border-[#262B36] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Live Demo
            </Link>
            <MagneticButton>
              <Link
                href="/login"
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5B800] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider block transition-colors shadow-md gold-glow"
              >
                Start Analyzing
              </Link>
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#9CA3AF] hover:text-white bg-[#121417] border border-[#262B36] rounded-xl"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0C0E]/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#1A1D24] pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
              <img src="/logo.png" alt="AskMyData Logo" className="w-8 h-8 object-contain" />
              <span className="font-extrabold text-white text-lg tracking-widest">ASKMYDATA</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#9CA3AF] hover:text-white bg-[#121417] border border-[#262B36] rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 text-center py-8">
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-extrabold text-white hover:text-[#D4AF37] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/for-business"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-extrabold text-white hover:text-[#D4AF37] transition-colors"
            >
              For Business
            </Link>
            <Link
              href="/for-analysts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-extrabold text-white hover:text-[#D4AF37] transition-colors"
            >
              For Analysts
            </Link>
            <Link
              href="/for-data-scientists"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-extrabold text-white hover:text-[#D4AF37] transition-colors"
            >
              For Data Scientists
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-extrabold text-white hover:text-[#D4AF37] transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#1A1D24]">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#121417] border border-[#262B36] text-white font-bold rounded-xl text-sm block text-center"
            >
              Explore Live Demo
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl text-sm block text-center shadow-lg gold-glow"
            >
              Start Analyzing Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

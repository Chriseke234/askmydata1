import React from 'react';
import { Navbar } from '@/components/shell/Navbar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

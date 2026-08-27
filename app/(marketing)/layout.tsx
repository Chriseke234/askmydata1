import React from 'react';
import { MarketingNavbar } from '@/components/shell/MarketingNavbar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

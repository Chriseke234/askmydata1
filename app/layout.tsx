import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/shell/SmoothScroll';
import { GrainOverlay } from '@/components/brand/GrainOverlay';

export const metadata: Metadata = {
  title: 'AskMyData | AI-Native Data Intelligence & Decision Platform',
  description: 'Turn your data into better decisions. Connect your data, understand what is happening, explain why, and make confident decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0C0E] text-white antialiased selection:bg-[#D4AF37] selection:text-black relative">
        <GrainOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

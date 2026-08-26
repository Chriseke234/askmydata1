import React from 'react';

export function DataFlowIllustration({ className = "w-full h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="300" rx="16" fill="#0B0C0E" stroke="#1A1D24" strokeWidth="2" />
      
      {/* Background Matrix Grid */}
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#121417" strokeWidth="1" />
      </pattern>
      <rect width="600" height="300" fill="url(#grid)" />

      {/* Raw Data Input Nodes */}
      <g transform="translate(60, 80)">
        <rect x="0" y="0" width="80" height="40" rx="6" fill="#121417" stroke="#262B36" strokeWidth="1.5" />
        <text x="40" y="24" fill="#9CA3AF" fontSize="12" textAnchor="middle" fontFamily="sans-serif">RAW DATA</text>
        <circle cx="40" cy="40" r="3" fill="#D4AF37" />
      </g>
      
      <g transform="translate(60, 180)">
        <rect x="0" y="0" width="80" height="40" rx="6" fill="#121417" stroke="#262B36" strokeWidth="1.5" />
        <text x="40" y="24" fill="#9CA3AF" fontSize="12" textAnchor="middle" fontFamily="sans-serif">METRICS</text>
        <circle cx="40" cy="40" r="3" fill="#D4AF37" />
      </g>

      {/* Flow Paths to Central Intelligence Hub */}
      <path d="M 140 100 C 220 100, 220 150, 280 150" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 140 200 C 220 200, 220 150, 280 150" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="6 6" />

      {/* Central AI Intelligence Core */}
      <g transform="translate(280, 110)">
        <rect x="0" y="0" width="100" height="80" rx="12" fill="#1A1D24" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="30" r="14" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="2" />
        <path d="M 50 20 L 50 40 M 40 30 L 60 30" stroke="#D4AF37" strokeWidth="2" />
        <text x="50" y="62" fill="#FFFFFF" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">ASKMYDATA AI</text>
      </g>

      {/* Verified Insight Output */}
      <path d="M 380 150 C 440 150, 440 150, 480 150" stroke="#D4AF37" strokeWidth="3" />

      <g transform="translate(480, 110)">
        <rect x="0" y="0" width="90" height="80" rx="12" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="2" />
        <polyline points="20,55 35,40 50,45 70,25" fill="none" stroke="#D4AF37" strokeWidth="3" />
        <text x="45" y="70" fill="#D4AF37" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">DECISION</text>
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#262B36" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

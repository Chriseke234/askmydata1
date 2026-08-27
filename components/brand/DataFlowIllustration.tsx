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

      {/* Raw Data Input Nodes (Databases, Warehouses, Files) */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="100" height="42" rx="8" fill="#121417" stroke="#262B36" strokeWidth="1.5" />
        <text x="50" y="25" fill="#9CA3AF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">POSTGRES / MYSQL</text>
        <circle cx="50" cy="42" r="3" fill="#D4AF37" />
      </g>

      <g transform="translate(40, 130)">
        <rect x="0" y="0" width="100" height="42" rx="8" fill="#121417" stroke="#262B36" strokeWidth="1.5" />
        <text x="50" y="25" fill="#9CA3AF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BIGQUERY / FLAKE</text>
        <circle cx="50" cy="42" r="3" fill="#D4AF37" />
      </g>
      
      <g transform="translate(40, 210)">
        <rect x="0" y="0" width="100" height="42" rx="8" fill="#121417" stroke="#262B36" strokeWidth="1.5" />
        <text x="50" y="25" fill="#9CA3AF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CSV / EXCEL / API</text>
        <circle cx="50" cy="42" r="3" fill="#D4AF37" />
      </g>

      {/* Animated Pipeline Paths to Intelligence Hub */}
      <path d="M 140 71 C 220 71, 220 150, 260 150" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
      <path d="M 140 151 C 220 151, 220 150, 260 150" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 140 231 C 220 231, 220 150, 260 150" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />

      {/* Central AI Intelligence Core */}
      <g transform="translate(260, 105)">
        <rect x="0" y="0" width="120" height="90" rx="16" fill="#1A1D24" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="60" cy="35" r="16" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="2" />
        <path d="M 60 23 L 60 47 M 48 35 L 72 35" stroke="#D4AF37" strokeWidth="2.5" />
        <text x="60" y="70" fill="#FFFFFF" fontSize="11" textAnchor="middle" fontWeight="extrabold" fontFamily="sans-serif">ASKMYDATA ENGINE</text>
      </g>

      {/* Output Pipeline to Decision Brief */}
      <path d="M 380 150 L 460 150" stroke="#D4AF37" strokeWidth="3.5" strokeDasharray="4 4" className="animate-pulse" />

      <g transform="translate(460, 105)">
        <rect x="0" y="0" width="105" height="90" rx="16" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="2" />
        <polyline points="25,50 45,30 65,38 85,20" fill="none" stroke="#D4AF37" strokeWidth="3.5" />
        <text x="52" y="72" fill="#D4AF37" fontSize="11" textAnchor="middle" fontWeight="extrabold" fontFamily="sans-serif">DECISION BRIEF</text>
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


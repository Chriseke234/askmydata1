import React from 'react';

export function DecisionVectorIllustration({ className = "w-full h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="260" rx="12" fill="#121417" stroke="#1A1D24" strokeWidth="2" />
      
      {/* Target Radar Grid */}
      <circle cx="250" cy="130" r="90" stroke="#1A1D24" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="250" cy="130" r="50" stroke="#262B36" strokeWidth="1.5" />
      <circle cx="250" cy="130" r="10" fill="#D4AF37" />

      {/* Axis Vectors */}
      <line x1="120" y1="130" x2="380" y2="130" stroke="#262B36" strokeWidth="1.5" />
      <line x1="250" y1="30" x2="250" y2="230" stroke="#262B36" strokeWidth="1.5" />

      {/* Decision Rays */}
      <path d="M 250 130 L 370 60" stroke="#D4AF37" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <circle cx="370" cy="60" r="6" fill="#D4AF37" />
      
      <path d="M 250 130 L 150 70" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 250 130 L 330 200" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Action Vector Badges */}
      <g transform="translate(320, 30)">
        <rect width="120" height="28" rx="6" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="1" />
        <text x="60" y="18" fill="#D4AF37" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">OPTIMAL ACTION</text>
      </g>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
        </marker>
      </defs>
    </svg>
  );
}

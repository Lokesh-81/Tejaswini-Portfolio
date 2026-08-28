import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base Linen Warm Canvas */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* Atmospheric Soft Light Radiance */}
      <div 
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] rounded-full blur-[160px] opacity-40 animate-warm-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(238, 220, 200, 0.6) 0%, rgba(220, 196, 172, 0.2) 45%, transparent 75%)' 
        }}
      />
      <div 
        className="absolute top-[35%] -left-[10%] w-[850px] h-[850px] rounded-full blur-[170px] opacity-30 animate-warm-float"
        style={{ 
          background: 'radial-gradient(circle, rgba(244, 230, 214, 0.65) 0%, rgba(204, 176, 150, 0.18) 50%, transparent 75%)' 
        }}
      />
      <div 
        className="absolute top-[65%] -right-[10%] w-[900px] h-[900px] rounded-full blur-[180px] opacity-25 animate-warm-float"
        style={{ 
          animationDelay: '-9s',
          background: 'radial-gradient(circle, rgba(232, 208, 184, 0.55) 0%, rgba(180, 150, 122, 0.15) 50%, transparent 75%)' 
        }}
      />

      {/* Tactile Paper Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 30) + 15;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F4EE] transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 max-w-sm px-6 text-center">
        {/* Animated Brand Core */}
        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61] shadow-[0_4px_20px_rgba(154,123,97,0.12)]">
          <div className="w-4 h-4 rounded-full bg-[#9A7B61] animate-pulse" />
        </div>

        <div>
          <div className="text-2xl font-serif text-[#201D1A] tracking-tight font-medium">
            TEJASWINI PAMULA
          </div>
          <div className="text-[11px] font-mono-code text-[#7A7268] mt-1.5 uppercase tracking-widest">
            DATA & AI ENGINEERING STUDIO
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-[#E7E0D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9A7B61] to-[#C4A482] transition-all duration-150"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="text-[11px] font-mono-code text-[#9C948A]">
          INITIALIZING... {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
};


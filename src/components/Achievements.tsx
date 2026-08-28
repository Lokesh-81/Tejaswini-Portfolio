import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, Award, Star, Medal } from 'lucide-react';

export const Achievements: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-[#E7E0D5]">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>ACCOLADES & HONORS</span>
          </div>
          <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
            Recognitions & Leadership Milestones
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.achievements.map((item, index) => (
            <div
              key={item.id || index}
              className="p-8 rounded-3xl bg-white/85 border border-[#E7E0D5] hover:border-[#C4A482] shadow-[0_4px_20px_rgba(36,33,30,0.03)] hover:shadow-[0_15px_35px_rgba(36,33,30,0.06)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono-code text-[#9C948A]">{item.year}</span>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-[#201D1A] font-medium">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono-code text-[#7C5E47] mt-1 font-medium">
                    {item.organization}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE9DF] flex items-center gap-2 text-[11px] font-mono-code text-[#9C948A]">
                <Star className="w-3.5 h-3.5 text-[#9A7B61]" />
                <span>Verified Academic & Co-Curricular Recognition</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};



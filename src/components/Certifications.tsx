import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, CheckCircle, FolderArchive, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="certifications" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-[#E7E0D5]">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
            <FolderArchive className="w-3.5 h-3.5" />
            <span>THE ARCHIVE // VERIFIED ACCREDITATIONS</span>
          </div>
          <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
            Credentials & Specializations
          </h2>
        </div>

        {/* Visual Archive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.certifications.map((cert, index) => {
            const accents = [
              { bg: 'from-amber-950/20 to-amber-900/5', border: 'border-amber-700/30', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-800' },
              { bg: 'from-blue-950/20 to-indigo-900/5', border: 'border-blue-700/30', text: 'text-blue-700', badge: 'bg-blue-50 text-blue-800' },
              { bg: 'from-emerald-950/20 to-teal-900/5', border: 'border-emerald-700/30', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-800' }
            ];
            const theme = accents[index % accents.length];

            return (
              <div
                key={cert.id}
                className="group rounded-3xl bg-white/90 border border-[#E7E0D5] hover:border-[#C4A482] shadow-[0_4px_20px_rgba(36,33,30,0.03)] hover:shadow-[0_18px_40px_rgba(36,33,30,0.06)] overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* CSS/SVG Architectural Header Badge */}
                <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${theme.bg} border-b border-[#EAE4DB] p-6 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/90 border border-[#E2D9CC] flex items-center justify-center shadow-2xs">
                      <Award className={`w-5 h-5 ${theme.text}`} />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E2D9CC] text-[10px] font-mono-code text-[#201D1A] shadow-2xs">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified Credential</span>
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono-code text-[#7A7268] uppercase tracking-wider">
                      {cert.issuer}
                    </div>
                    <div className="text-sm font-serif text-[#201D1A] font-medium truncate mt-0.5">
                      {cert.title}
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-7 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code text-[#9C948A] mb-1.5">
                      <span className="text-[#9A7B61] font-medium">{cert.issuer}</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#201D1A] font-medium group-hover:text-[#9A7B61] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    {cert.credentialId && (
                      <div className="text-xs font-mono-code text-[#7C5E47] mt-1.5">
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>

                  {cert.verificationLink && (
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B645C] hover:text-[#201D1A] pt-4 border-t border-[#EFE9DF] transition-colors"
                    >
                      <span>Verify Official Credential</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9A7B61]" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

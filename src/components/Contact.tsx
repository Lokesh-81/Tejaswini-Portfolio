import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Github, Instagram, Radio, Sparkles, Clock, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const { data, submitMessage } = usePortfolio();
  const { personalInfo } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    try {
      await submitMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#9A7B61', '#C4A482', '#201D1A', '#E2D9CC']
        });
      } catch {
        // ignore
      }
      setTimeout(() => setSubmitted(false), 7000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-[#E7E0D5]">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#9A7B61] uppercase tracking-widest mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>THE TRANSMISSION // OPEN CORRESPONDENCE</span>
          </div>
          <h2 className="display-section text-[#201D1A] font-serif font-normal tracking-tight">
            You’ve Traced the Signal to Its Source.
          </h2>
          <p className="text-xl sm:text-2xl font-serif italic text-[#7C5E47] mt-2">
            Now, let’s exchange a letter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Channels & Live Status */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base text-[#6B645C] leading-relaxed">
              I am actively seeking strategic full-time roles and exploratory projects in <strong className="text-[#201D1A] font-medium">Data Analytics</strong>, <strong className="text-[#201D1A] font-medium">Data Science</strong>, and <strong className="text-[#201D1A] font-medium">Machine Learning / AI Engineering</strong>.
            </p>

            {/* Live Signal Status & Clock */}
            <div className="p-6 rounded-3xl bg-white/90 border border-[#E7E0D5] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE4DB]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9A7B61] animate-pulse" />
                  <span className="text-[11px] font-mono-code text-[#4A443D] uppercase font-semibold">
                    RECEIVING INCOMING SIGNALS
                  </span>
                </div>
                <span className="text-[10.5px] font-mono-code text-[#9C948A]">
                  STATUS: ONLINE
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code text-[#7A7268]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9A7B61]" />
                  <span>Rajahmundry Time (IST):</span>
                </div>
                <span className="font-semibold text-[#201D1A]">{currentTime || '12:00:00 PM'}</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 border border-[#E7E0D5] hover:border-[#C4A482] hover:bg-white shadow-2xs transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10.5px] font-mono-code text-[#9C948A] uppercase font-medium">ELECTRONIC MAIL</div>
                  <div className="text-sm font-medium text-[#201D1A] group-hover:text-[#9A7B61] transition-colors">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 border border-[#E7E0D5] hover:border-[#C4A482] hover:bg-white shadow-2xs transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-mono-code text-[#9C948A] uppercase font-medium">DIRECT TELEPHONE</div>
                    <div className="text-sm font-medium text-[#201D1A] group-hover:text-[#9A7B61] transition-colors">
                      {personalInfo.phone}
                    </div>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 border border-[#E7E0D5] shadow-2xs">
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10.5px] font-mono-code text-[#9C948A] uppercase font-medium">LOCATION & COORDINATES</div>
                  <div className="text-sm font-medium text-[#201D1A]">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Signals */}
            <div className="pt-2 flex items-center gap-3">
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] text-[#6B645C] hover:text-[#201D1A] shadow-2xs transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] text-[#6B645C] hover:text-[#201D1A] shadow-2xs transition-all"
                  title="GitHub Code Archive"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {personalInfo.instagram && (
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] text-[#6B645C] hover:text-[#201D1A] shadow-2xs transition-all"
                  title="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Dispatch Transmission Terminal */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/95 border border-[#E7E0D5] shadow-[0_15px_45px_rgba(36,33,30,0.04)] relative">
            <h3 className="text-2xl font-serif text-[#201D1A] font-medium mb-1">
              Dispatch a Direct Transmission
            </h3>
            <p className="text-xs text-[#7A7268] mb-8 font-mono-code">
              Transmissions are recorded securely in Firestore and answered promptly.
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C4A482] flex items-center justify-center text-[#9A7B61]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-[#201D1A] font-medium">Transmission Delivered</h4>
                <p className="text-xs text-[#6B645C] max-w-sm">
                  Thank you for reaching out. Tejaswini will review your message and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-[#7A7268]">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] focus:border-[#201D1A] focus:outline-none text-sm text-[#201D1A] placeholder-[#9C948A] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-[#7A7268]">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@company.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] focus:border-[#201D1A] focus:outline-none text-sm text-[#201D1A] placeholder-[#9C948A] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-[#7A7268]">INQUIRY PURPOSE / CONTEXT</label>
                  <input
                    type="text"
                    placeholder="e.g. Data Analyst Role / Machine Learning Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] focus:border-[#201D1A] focus:outline-none text-sm text-[#201D1A] placeholder-[#9C948A] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-[#7A7268]">YOUR MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share the project, opportunity, or hypothesis you’d like to explore..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] focus:border-[#201D1A] focus:outline-none text-sm text-[#201D1A] placeholder-[#9C948A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-medium text-sm text-white bg-[#201D1A] hover:bg-[#34302C] disabled:opacity-50 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting...' : 'Dispatch Transmission'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

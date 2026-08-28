import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CertificationItem } from '../../types';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { UniversalImageUploader } from './UniversalImageUploader';

export const CertificationsStudio: React.FC = () => {
  const { data, addCertification, updateCertification, deleteCertification } = usePortfolio();

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const defaultNew: Omit<CertificationItem, 'id'> = {
    title: '',
    issuer: '',
    issueDate: '2025',
    credentialId: '',
    verificationLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  };

  const [formData, setFormData] = useState<Omit<CertificationItem, 'id'>>(defaultNew);

  const handleStartCreate = () => {
    setFormData(defaultNew);
    setEditingCert(null);
    setIsCreatingNew(true);
  };

  const handleStartEdit = (cert: CertificationItem) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || '',
      verificationLink: cert.verificationLink || '',
      imageUrl: cert.imageUrl || ''
    });
    setIsCreatingNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCert) {
      await updateCertification(editingCert.id, formData);
    } else {
      await addCertification(formData);
    }
    setEditingCert(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            07 / CERTIFICATIONS ARCHIVE STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Accreditations & Certificates
          </h2>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C4A482]" />
          <span>New Certification</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreatingNew || editingCert) && (
        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
            <h3 className="text-lg font-serif text-[#201D1A] font-medium">
              {editingCert ? `Edit: ${editingCert.title}` : 'Add Certification'}
            </h3>
            <button
              type="button"
              onClick={() => { setEditingCert(null); setIsCreatingNew(false); }}
              className="text-xs font-mono-code text-[#9C948A] hover:text-[#201D1A] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">CERTIFICATE TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Google Data Analytics Professional"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">ISSUING ORGANIZATION *</label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g. Coursera / Google"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">ISSUE DATE</label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="e.g. 2025"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[#6B645C]">CREDENTIAL ID</label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="e.g. COURSERA-GDA-987"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-[#6B645C]">VERIFICATION URL</label>
            <input
              type="url"
              value={formData.verificationLink}
              onChange={(e) => setFormData({ ...formData, verificationLink: e.target.value })}
              placeholder="https://coursera.org/verify/..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
          </div>

          <UniversalImageUploader
            label="Certificate Badge / Document Preview Image"
            value={formData.imageUrl || ''}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            sectionName="Certifications Archive"
            helperText="Drag & drop certificate badge, paste Google Drive file, or select from media library."
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E7E0D5]">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs cursor-pointer"
            >
              Save Certificate
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-white border border-[#E7E0D5] flex items-center justify-between gap-4 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              {cert.imageUrl && (
                <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E2D9CC] flex-shrink-0">
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h4 className="text-sm font-serif text-[#201D1A] font-medium">{cert.title}</h4>
                <div className="text-xs text-[#6B645C]">{cert.issuer} • {cert.issueDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStartEdit(cert)}
                className="p-1.5 rounded-lg text-[#7C5E47] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCertification(cert.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};


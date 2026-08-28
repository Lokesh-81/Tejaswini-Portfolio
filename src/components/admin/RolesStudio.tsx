import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Key, Plus, Trash2, Database, Lock, User, UserCheck, HardDrive, Check } from 'lucide-react';

export const RolesStudio: React.FC = () => {
  const { data, currentUser, currentUserRole, updateAdminPassword, addUserRole, removeUserRole } = usePortfolio();

  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Editor' | 'Viewer'>('Editor');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    await addUserRole(newEmail.trim(), newRole);
    setNewEmail('');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      setPassMsg({ text: 'New password must be at least 6 characters long.', error: true });
      return;
    }
    setIsUpdatingPass(true);
    const success = await updateAdminPassword(newPass);
    setIsUpdatingPass(false);
    if (success) {
      setPassMsg({ text: 'Firebase Auth administrator password successfully updated!' });
      setNewPass('');
    } else {
      setPassMsg({ text: 'Unable to update password. You may need to sign out and log in again for recent authentication security verification.', error: true });
    }
    setTimeout(() => setPassMsg(null), 6000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="pb-6 border-b border-[#E7E0D5]">
        <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
          13 / ACCESS CONTROL & CLOUD ARCHITECTURE
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
          Team Permissions & Security
        </h2>
      </div>

      {/* Active Session & Auth Status */}
      <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#9A7B61]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif text-[#201D1A] font-medium">
                Active Authenticated Session
              </div>
              <div className="text-xs font-mono-code text-[#7A7268]">
                {currentUser?.email || 'Authenticated Administrator'}
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code bg-amber-50 text-amber-800 border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Role: {currentUserRole || 'Admin'}</span>
          </span>
        </div>
      </div>

      {/* Cloud & Database Health Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] flex items-center gap-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#7C5E47] shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-serif text-[#201D1A] font-medium">Firestore Database</h4>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected
              </span>
            </div>
            <p className="text-[11px] text-[#6B645C] mt-0.5 leading-relaxed">
              Real-time snapshot listener active with long-polling resilience.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E7E0D5] flex items-center gap-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#7C5E47] shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-serif text-[#201D1A] font-medium">Firebase Cloud Storage</h4>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>
            <p className="text-[11px] text-[#6B645C] mt-0.5 leading-relaxed">
              Document & image asset bucket configured for portfolio media.
            </p>
          </div>
        </div>
      </div>

      {/* Password Reset Section */}
      <form onSubmit={handlePasswordChange} className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E7E0D5]">
          <Key className="w-4 h-4 text-[#9A7B61]" />
          <h3 className="text-base font-serif text-[#201D1A] font-medium">
            Update Firebase Auth Password
          </h3>
        </div>

        {passMsg && (
          <div className={`p-3.5 rounded-xl text-xs font-mono-code ${passMsg.error ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            {passMsg.text}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-mono-code text-[#6B645C]">NEW SECURE PASSWORD (MIN 6 CHARS) *</label>
          <div className="flex gap-2">
            <input
              type="password"
              required
              minLength={6}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isUpdatingPass}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              {isUpdatingPass ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>
      </form>

      {/* Team Permissions Section */}
      <div className="p-8 rounded-3xl bg-white border border-[#E7E0D5] space-y-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9A7B61]" />
            <h3 className="text-base font-serif text-[#201D1A] font-medium">
              Authorized Collaborators & Access Roles
            </h3>
          </div>
          <span className="text-xs font-mono-code text-[#9C948A]">
            {data.userRoles.length} Members
          </span>
        </div>

        {/* Add User Role Form */}
        <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="collaborator@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as any)}
            className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] focus:border-[#201D1A] focus:outline-none cursor-pointer"
          >
            <option value="Admin">Admin (Full Access)</option>
            <option value="Editor">Editor (Content Edit)</option>
            <option value="Viewer">Viewer (Read Only)</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
          >
            <Plus className="w-4 h-4 text-[#C4A482]" />
            <span>Add Member</span>
          </button>
        </form>

        {/* Collaborators List */}
        <div className="divide-y divide-[#E7E0D5] border-t border-[#E7E0D5]">
          {data.userRoles.map((user) => (
            <div key={user.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#7C5E47] text-xs font-mono-code font-semibold">
                  {user.email.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-serif text-[#201D1A] font-medium">{user.name || user.email}</div>
                  <div className="text-[11px] font-mono-code text-[#7A7268]">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10.5px] font-mono-code px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#7C5E47] border border-[#E2D9CC]">
                  {user.role}
                </span>
                <button
                  onClick={() => removeUserRole(user.id)}
                  className="p-1.5 rounded-lg text-[#9C948A] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Revoke Role"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

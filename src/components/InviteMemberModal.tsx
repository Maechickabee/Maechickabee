import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Users,
  Briefcase,
  Home,
  Sparkles,
  Copy,
  Check,
  Send,
  Mail,
  Zap,
  Shield,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { Member, MemberType, ZodiacSign, AstroElement, Chronotype, UserProfile } from '../types';
import { ZODIAC_REGISTRY, ELEMENT_MAP, calculateSynastryScore, getMemberColor, MEMBER_COLORS } from '../utils/astroEngine';
import confetti from 'canvas-confetti';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMember: (member: Member) => void;
  userProfile: UserProfile;
  existingMembers: Member[];
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  onSaveMember,
  userProfile,
  existingMembers,
}) => {
  const [memberType, setMemberType] = useState<MemberType>('team');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign>('Aries');
  const [chronotype, setChronotype] = useState<Chronotype>('Bear');
  const [communicationStyle, setCommunicationStyle] = useState<Member['communicationStyle']>('Diplomatic & Collaborative');
  const [conflictSensitivity, setConflictSensitivity] = useState<Member['conflictSensitivity']>('Moderate');
  const [relationshipNotes, setRelationshipNotes] = useState('');
  const [inviteMessage, setInviteMessage] = useState(
    "Join my AstroFlow circle so we can synchronize our peak energy hours and collaborate with astrological harmony!"
  );

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}?invite=${encodeURIComponent(name || 'circle')}&type=${memberType}&from=${encodeURIComponent(userProfile.name)}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const element: AstroElement = ELEMENT_MAP[zodiacSign] || 'Fire';
    const synastryScore = calculateSynastryScore(userProfile.sunSign, zodiacSign);
    const assignedColor = MEMBER_COLORS[existingMembers.length % MEMBER_COLORS.length];

    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      type: memberType,
      role: role.trim() || (memberType === 'team' ? 'Team Collaborator' : 'Family Member'),
      zodiacSign,
      element,
      email: email.trim() || undefined,
      color: assignedColor,
      status: 'invited',
      chronotype,
      communicationStyle,
      conflictSensitivity,
      relationshipNotes: relationshipNotes.trim() || `Invited to compare hourly energy levels and optimize daily synergy.`,
      synastryHarmonicScore: synastryScore,
      bestCollaborationHours: ['10:00 - 11:30', '14:30 - 16:00'],
      bestConfrontationHours: ['11:00 - 12:00'],
      challengingHoursToAvoid: ['13:00 - 14:00', '17:00 - 18:00'],
      strengths: ['Energy synchronization', 'Empathetic presence', 'Shared cadence'],
      frictionTriggers: ['Misaligned low-energy meetings', 'Unexpected interruptions'],
      deescalationKey: 'Respect energy curve boundaries and connect during mutual harmonic hours.',
    };

    onSaveMember(newMember);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: [assignedColor, '#B97A57', '#7C9082'],
      });
    } catch (err) {}

    setIsSubmitting(false);
    onClose();

    // Reset fields
    setName('');
    setEmail('');
    setRole('');
  };

  const zodiacOptions: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A26]/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        id="modal-invite-members"
        className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden my-6 text-[#3D3A35]"
      >
        {/* Header */}
        <div className="bg-[#F2EDE4] px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#B97A57] text-white flex items-center justify-center shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#2D2A26] flex items-center gap-2">
                Invite Circle Members
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#B97A57]/15 text-[#8F4E2C] border border-[#B97A57]/25">
                  Energy & Astro Sync
                </span>
              </h2>
              <p className="text-xs text-[#8A817C]">
                Invite colleagues or family to compare hourly energy curves and optimize communication timing.
              </p>
            </div>
          </div>

          <button
            id="btn-close-invite-modal"
            onClick={onClose}
            className="p-1.5 text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#E8E2D9] rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* Quick Share Link Box */}
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D9] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2D2A26] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B97A57]" />
                Instant Circle Invite Link
              </span>
              <span className="text-[10px] text-[#7C9082] font-semibold bg-[#7C9082]/15 px-2 py-0.5 rounded-full border border-[#7C9082]/25">
                Auto-sync Enabled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#F9F7F2] border border-[#E8E2D9] px-3 py-1.5 rounded-lg text-xs font-mono text-[#635E59] truncate select-all">
                {window.location.origin}/invite?ref={encodeURIComponent(userProfile.name)}&sync=energy-curve
              </div>
              <button
                id="btn-copy-invite-link"
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 bg-[#F2EDE4] hover:bg-[#E8E2D9] text-[#2D2A26] border border-[#E8E2D9] text-xs font-semibold px-3 py-1.5 rounded-lg transition shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#7C9082]" />
                    <span className="text-[#4D6354]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8A817C]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Member Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-[#635E59] mb-1.5">
              Select Circle Relationship
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-select-team-invite"
                onClick={() => setMemberType('team')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
                  memberType === 'team'
                    ? 'bg-[#4A6B82] text-white border-[#4A6B82] shadow-xs'
                    : 'bg-white text-[#635E59] border-[#E8E2D9] hover:bg-[#F2EDE4]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Team Member (Colleague / Report)</span>
              </button>

              <button
                type="button"
                id="btn-select-family-invite"
                onClick={() => setMemberType('family')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
                  memberType === 'family'
                    ? 'bg-[#7C9082] text-white border-[#7C9082] shadow-xs'
                    : 'bg-white text-[#635E59] border-[#E8E2D9] hover:bg-[#F2EDE4]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Family Member (Partner / Child)</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#635E59] mb-1">
                  Full Name <span className="text-[#A36B73]">*</span>
                </label>
                <input
                  id="input-invite-name"
                  type="text"
                  required
                  placeholder={memberType === 'team' ? 'e.g. Jason Thorne' : 'e.g. Maya Morgan'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] placeholder-[#A8A096] focus:outline-hidden focus:border-[#B97A57] transition"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#635E59] mb-1">
                  Email Address (for direct invite)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8A817C] absolute left-3 top-2.5" />
                  <input
                    id="input-invite-email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-lg pl-8 pr-3 py-2 text-xs text-[#2D2A26] placeholder-[#A8A096] focus:outline-hidden focus:border-[#B97A57] transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Role / Relationship */}
              <div>
                <label className="block text-xs font-semibold text-[#635E59] mb-1">
                  Role / Relationship Title
                </label>
                <input
                  id="input-invite-role"
                  type="text"
                  placeholder={memberType === 'team' ? 'e.g. Senior QA Engineer' : 'e.g. Eldest Daughter (16)'}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] placeholder-[#A8A096] focus:outline-hidden focus:border-[#B97A57] transition"
                />
              </div>

              {/* Zodiac Sun Sign */}
              <div>
                <label className="block text-xs font-semibold text-[#635E59] mb-1">
                  Zodiac Sign (for energy curve)
                </label>
                <select
                  id="select-invite-zodiac"
                  value={zodiacSign}
                  onChange={(e) => setZodiacSign(e.target.value as ZodiacSign)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:outline-hidden focus:border-[#B97A57] transition cursor-pointer"
                >
                  {zodiacOptions.map((sign) => {
                    const data = ZODIAC_REGISTRY[sign];
                    return (
                      <option key={sign} value={sign}>
                        {data.symbol} {sign} ({data.element})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Chronotype */}
              <div>
                <label className="block text-xs font-semibold text-[#635E59] mb-1">
                  Chronotype Peak
                </label>
                <select
                  id="select-invite-chronotype"
                  value={chronotype}
                  onChange={(e) => setChronotype(e.target.value as Chronotype)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:outline-hidden focus:border-[#B97A57] transition cursor-pointer"
                >
                  <option value="Lion">Lion (Early Riser 6 AM - 12 PM)</option>
                  <option value="Bear">Bear (Middle Day 9 AM - 4 PM)</option>
                  <option value="Wolf">Wolf (Night Owl 2 PM - 9 PM)</option>
                  <option value="Dolphin">Dolphin (Light Sleeper / Strategic)</option>
                </select>
              </div>
            </div>

            {/* Custom Invitation Note */}
            <div>
              <label className="block text-xs font-semibold text-[#635E59] mb-1">
                Custom Invitation Intention / Note
              </label>
              <textarea
                id="textarea-invite-note"
                rows={2}
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] placeholder-[#A8A096] focus:outline-hidden focus:border-[#B97A57] transition resize-none"
              />
            </div>

            {/* Preview of Assigned Comparison Color & Synastry */}
            <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#E8E2D9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs"
                  style={{
                    backgroundColor: MEMBER_COLORS[existingMembers.length % MEMBER_COLORS.length],
                  }}
                />
                <span className="font-semibold text-[#2D2A26]">
                  Assigned Energy Line Color:
                </span>
                <span className="font-mono text-[#635E59] text-[11px]">
                  {MEMBER_COLORS[existingMembers.length % MEMBER_COLORS.length]}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#4D6354] font-semibold bg-[#7C9082]/15 px-2 py-0.5 rounded border border-[#7C9082]/25">
                <Sparkles className="w-3 h-3 text-[#7C9082]" />
                <span>
                  {calculateSynastryScore(userProfile.sunSign, zodiacSign)}% Astro Synastry
                </span>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="btn-cancel-invite"
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#635E59] hover:bg-[#F2EDE4] transition"
              >
                Cancel
              </button>

              <button
                id="btn-submit-invite-member"
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="flex items-center gap-2 bg-[#B97A57] hover:bg-[#A66947] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Invite & Add to Curve</span>
              </button>
            </div>
          </form>

          {/* Currently Connected Circle Members */}
          {existingMembers.length > 0 && (
            <div className="pt-3 border-t border-[#E8E2D9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A817C] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B97A57]" />
                  Active Circle Members ({existingMembers.length})
                </span>
                <span className="text-[10px] text-[#8A817C]">
                  Selectable in Hourly Energy Curve
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {existingMembers.map((m, idx) => {
                  const mColor = getMemberColor(m, idx);
                  return (
                    <div
                      key={m.id}
                      className="bg-white p-2.5 rounded-lg border border-[#E8E2D9] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white"
                          style={{ backgroundColor: mColor }}
                        />
                        <div className="truncate">
                          <span className="font-semibold text-[#2D2A26] block truncate">
                            {m.name}
                          </span>
                          <span className="text-[10px] text-[#8A817C] block truncate">
                            {m.role} • {m.zodiacSign}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded capitalize shrink-0 ${
                          m.type === 'team'
                            ? 'bg-[#4A6B82]/10 text-[#2C4E66]'
                            : 'bg-[#7C9082]/10 text-[#4D6354]'
                        }`}
                      >
                        {m.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

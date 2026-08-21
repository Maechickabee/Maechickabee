import React, { useState } from 'react';
import { X, Sparkles, User, Briefcase, Heart, ShieldAlert } from 'lucide-react';
import { Member, MemberType, ZodiacSign, UserProfile } from '../types';
import { ZODIAC_REGISTRY, ELEMENT_MAP, calculateSynastryScore } from '../utils/astroEngine';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  initialMember?: Member | null;
  userProfile: UserProfile;
}

const ALL_ZODIACS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMember,
  userProfile,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialMember?.name || '');
  const [type, setType] = useState<MemberType>(initialMember?.type || 'team');
  const [role, setRole] = useState(initialMember?.role || '');
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign>(initialMember?.zodiacSign || 'Aries');
  const [communicationStyle, setCommunicationStyle] = useState<Member['communicationStyle']>(
    initialMember?.communicationStyle || 'Direct & Action-driven'
  );
  const [conflictSensitivity, setConflictSensitivity] = useState<Member['conflictSensitivity']>(
    initialMember?.conflictSensitivity || 'Moderate'
  );
  const [relationshipNotes, setRelationshipNotes] = useState(initialMember?.relationshipNotes || '');
  const [bestCollabTime, setBestCollabTime] = useState(initialMember?.bestCollaborationHours?.[0] || '10:00 - 11:30');
  const [bestConfrontTime, setBestConfrontTime] = useState(initialMember?.bestConfrontationHours?.[0] || '14:00 - 15:15');
  const [deescalationKey, setDeescalationKey] = useState(
    initialMember?.deescalationKey || ZODIAC_REGISTRY[initialMember?.zodiacSign || 'Aries']?.deescalationKey || ''
  );

  const handleZodiacChange = (sign: ZodiacSign) => {
    setZodiacSign(sign);
    const zData = ZODIAC_REGISTRY[sign];
    if (zData) {
      setCommunicationStyle(zData.communicationStyle);
      setDeescalationKey(zData.deescalationKey);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const element = ELEMENT_MAP[zodiacSign];
    const synastryScore = calculateSynastryScore(userProfile.sunSign, zodiacSign);
    const zData = ZODIAC_REGISTRY[zodiacSign];

    const newMember: Member = {
      id: initialMember?.id || `mem-${Date.now()}`,
      name: name || 'Team Member',
      type,
      role: role || (type === 'team' ? 'Colleague' : 'Family Member'),
      zodiacSign,
      element,
      communicationStyle,
      conflictSensitivity,
      relationshipNotes,
      synastryHarmonicScore: synastryScore,
      bestCollaborationHours: [bestCollabTime],
      bestConfrontationHours: [bestConfrontTime],
      challengingHoursToAvoid: initialMember?.challengingHoursToAvoid || ['09:00 - 10:00'],
      strengths: initialMember?.strengths || zData?.traits || ['Dedicated', 'Clear'],
      frictionTriggers: initialMember?.frictionTriggers || zData?.conflictTriggers || ['Rushing'],
      deescalationKey: deescalationKey || zData?.deescalationKey || 'Listen with open empathy.',
    };

    onSave(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8E2D9] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D9] bg-[#FAF8F5]">
          <h3 className="font-bold text-[#2D2A26] text-base">
            {initialMember ? `Edit ${initialMember.name}` : 'Add Member to Astro Sync Directory'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Circle Type</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setType('team')}
                  className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition ${
                    type === 'team'
                      ? 'bg-[#4A6B82]/15 text-[#4A6B82] border border-[#4A6B82]/30 font-semibold'
                      : 'bg-[#FAF8F5] text-[#8A817C] border border-[#E8E2D9]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Work Team</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('family')}
                  className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition ${
                    type === 'family'
                      ? 'bg-[#7C9082]/15 text-[#4D6354] border border-[#7C9082]/30 font-semibold'
                      : 'bg-[#FAF8F5] text-[#8A817C] border border-[#E8E2D9]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Family</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Full Name</label>
              <input
                id="member-modal-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Chen, Jordan, Leo..."
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Role / Relationship Title</label>
              <input
                id="member-modal-role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Tech Lead, Partner, Son..."
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Zodiac Sun Sign</label>
              <select
                id="member-modal-zodiac"
                value={zodiacSign}
                onChange={(e) => handleZodiacChange(e.target.value as ZodiacSign)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                {ALL_ZODIACS.map((s) => (
                  <option key={s} value={s}>
                    {s} ({ELEMENT_MAP[s]} Element)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Communication Style</label>
              <select
                id="member-modal-comm-style"
                value={communicationStyle}
                onChange={(e) => setCommunicationStyle(e.target.value as any)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="Direct & Action-driven">Direct & Action-driven</option>
                <option value="Analytical & Precise">Analytical & Precise</option>
                <option value="Diplomatic & Collaborative">Diplomatic & Collaborative</option>
                <option value="Empathetic & Intuitive">Empathetic & Intuitive</option>
                <option value="Enthusiastic & Visionary">Enthusiastic & Visionary</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Conflict Sensitivity</label>
              <select
                id="member-modal-conflict-sensitivity"
                value={conflictSensitivity}
                onChange={(e) => setConflictSensitivity(e.target.value as any)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="Low">Low (Direct Debater)</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High (Needs Psychological Safety)</option>
                <option value="Very Sensitive">Very Sensitive (Gentle Approach Only)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Optimal Collab Window</label>
              <input
                id="member-modal-collab-time"
                type="text"
                value={bestCollabTime}
                onChange={(e) => setBestCollabTime(e.target.value)}
                placeholder="10:00 - 11:30"
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Safe Convo Window</label>
              <input
                id="member-modal-confront-time"
                type="text"
                value={bestConfrontTime}
                onChange={(e) => setBestConfrontTime(e.target.value)}
                placeholder="14:00 - 15:15"
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#3D3A35] mb-1">De-escalation Resolution Key</label>
            <textarea
              id="member-modal-deescalation-key"
              rows={2}
              value={deescalationKey}
              onChange={(e) => setDeescalationKey(e.target.value)}
              placeholder="What specifically helps diffuse tension with this person?"
              className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg p-2.5 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D9]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] transition"
            >
              Cancel
            </button>
            <button
              id="btn-save-member"
              type="submit"
              className="bg-[#7C9082] hover:bg-[#6A7E70] text-white font-bold px-5 py-2 rounded-lg shadow-xs transition"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

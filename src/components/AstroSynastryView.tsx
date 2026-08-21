import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  Clock,
  User,
  Plus,
  ArrowRight,
  Briefcase,
  Heart,
  MessageSquare,
  AlertTriangle,
  Zap,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { Member, UserProfile, AstrologicalTransit, SynastryAdvice } from '../types';
import { ZODIAC_REGISTRY, getLocalSynastryAdvice } from '../utils/astroEngine';

interface AstroSynastryViewProps {
  userProfile: UserProfile;
  transit: AstrologicalTransit;
  members: Member[];
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (memberId: string) => void;
  selectedMemberId?: string | null;
}

export const AstroSynastryView: React.FC<AstroSynastryViewProps> = ({
  userProfile,
  transit,
  members,
  onAddMember,
  onEditMember,
  onDeleteMember,
  selectedMemberId,
}) => {
  const [activeTab, setActiveTab] = useState<'team' | 'family'>('team');
  const [activeCounterpartId, setActiveCounterpartId] = useState<string>(
    selectedMemberId || members[0]?.id || ''
  );
  const [prepTopic, setPrepTopic] = useState<string>('Scope alignment and priority trade-offs');
  const [prepType, setPrepType] = useState<'confrontation' | 'collaboration' | 'feedback' | 'parenting_sync'>('confrontation');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState<boolean>(false);
  const [adviceResult, setAdviceResult] = useState<SynastryAdvice | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const teamMembers = members.filter((m) => m.type === 'team');
  const familyMembers = members.filter((m) => m.type === 'family');
  const activeMembersList = activeTab === 'team' ? teamMembers : familyMembers;

  const currentCounterpart = members.find((m) => m.id === activeCounterpartId) || members[0];

  const handleGenerateTacticalAdvice = async () => {
    if (!currentCounterpart) return;
    setIsLoadingAdvice(true);

    try {
      const response = await fetch('/api/gemini/synastry-timing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          counterpart: currentCounterpart,
          topic: prepTopic,
          conversationType: prepType,
          urgency: 'Normal',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.data) {
          setAdviceResult(json.data);
          setIsLoadingAdvice(false);
          return;
        }
      }
    } catch (e) {
      console.warn('AI synastry call failed, using local engine:', e);
    }

    // Fallback to local heuristic engine
    const localAdvice = getLocalSynastryAdvice(userProfile, currentCounterpart, prepTopic, prepType);
    setAdviceResult(localAdvice);
    setIsLoadingAdvice(false);
  };

  const handleCopyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Astrological Synastry Header */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs relative overflow-hidden text-[#3D3A35]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97A57] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B97A57]" />
                Interpersonal Astrological Timing Engine
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight mt-1">
              Harmonic Collaboration & De-escalation Windows
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] max-w-3xl mt-1 leading-relaxed">
              Compare your astrological energetic archetype ({userProfile.sunSign} Sun, {userProfile.element} Element) against team and family members to schedule high-leverage brainstorming or navigate sensitive conversations when planetary friction is lowest.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-add-member"
              onClick={onAddMember}
              className="flex items-center gap-1.5 bg-[#B97A57] hover:bg-[#A66947] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Directory Section: Team vs Family */}
      <div className="space-y-4">
        {/* Toggle Tabs */}
        <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
          <div className="flex items-center gap-2">
            <button
              id="tab-synastry-team"
              onClick={() => {
                setActiveTab('team');
                if (teamMembers.length > 0) setActiveCounterpartId(teamMembers[0].id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'team'
                  ? 'bg-[#4A6B82] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Team Members ({teamMembers.length})</span>
            </button>

            <button
              id="tab-synastry-family"
              onClick={() => {
                setActiveTab('family');
                if (familyMembers.length > 0) setActiveCounterpartId(familyMembers[0].id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'family'
                  ? 'bg-[#7C9082] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Family Circle ({familyMembers.length})</span>
            </button>
          </div>

          <span className="text-xs text-[#8A817C] hidden sm:inline">
            Click any member to prep a conversation
          </span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMembersList.map((member) => {
            const isSelected = member.id === activeCounterpartId;
            const zodiacInfo = ZODIAC_REGISTRY[member.zodiacSign];

            return (
              <div
                key={member.id}
                onClick={() => setActiveCounterpartId(member.id)}
                className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-[#B97A57] shadow-sm ring-1 ring-[#B97A57]/30'
                    : 'bg-white border-[#E8E2D9] hover:border-[#D4CBBF] shadow-xs'
                }`}
              >
                {/* Header: Name, Zodiac, Element, Synastry Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-[#F2EDE4] border border-[#E8E2D9] flex flex-col items-center justify-center text-[#B97A57] font-bold text-sm shadow-xs shrink-0">
                      <span>{zodiacInfo?.symbol || '♈'}</span>
                      <span className="text-[9px] text-[#8A817C] font-normal">{member.zodiacSign.slice(0, 3)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#2D2A26] text-sm">{member.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2EDE4] text-[#635E59] border border-[#E8E2D9]">
                          {member.element} Element
                        </span>
                      </div>
                      <p className="text-xs text-[#8A817C]">{member.role}</p>
                    </div>
                  </div>

                  {/* Synastry Harmonic Badge */}
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#8F4E2C] bg-[#B97A57]/15 px-2 py-0.5 rounded-md border border-[#B97A57]/25">
                      {member.synastryHarmonicScore}% Synastry
                    </span>
                    <span className="text-[10px] text-[#8A817C] mt-0.5">
                      {userProfile.element} ↔ {member.element}
                    </span>
                  </div>
                </div>

                {/* Timing Matrix Windows */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Collab Window */}
                  <div className="bg-[#F4EFEA] p-2.5 rounded-lg border border-[#E8E2D9] flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#7C9082] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#4D6354]">Optimal Collaboration:</span>
                      <p className="text-[#3D3A35] font-mono mt-0.5">
                        {member.bestCollaborationHours?.join(', ') || '10:30 AM - 11:45 AM'}
                      </p>
                    </div>
                  </div>

                  {/* Safe Confrontation Window */}
                  <div className="bg-[#F4EFEA] p-2.5 rounded-lg border border-[#E8E2D9] flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#B97A57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#8F4E2C]">Safe Tough Convos:</span>
                      <p className="text-[#3D3A35] font-mono mt-0.5">
                        {member.bestConfrontationHours?.join(', ') || '02:15 PM - 03:30 PM'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* De-escalation & Sensitivity */}
                <div className="mt-3 bg-[#F9F7F2] p-2.5 rounded-lg border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A817C]">Communication Style:</span>
                    <span className="font-medium text-[#2D2A26]">{member.communicationStyle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A817C]">Conflict Sensitivity:</span>
                    <span
                      className={`font-semibold ${
                        member.conflictSensitivity === 'High' || member.conflictSensitivity === 'Very Sensitive'
                          ? 'text-[#A36B73]'
                          : member.conflictSensitivity === 'Moderate'
                          ? 'text-[#B97A57]'
                          : 'text-[#7C9082]'
                      }`}
                    >
                      {member.conflictSensitivity}
                    </span>
                  </div>
                  <div className="pt-1 text-[#3D3A35]">
                    <span className="font-semibold text-[#8F4E2C]">De-escalation Key: </span>
                    <span className="text-[#635E59] italic">{member.deescalationKey}</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8E2D9] text-xs">
                  <span className="text-[#B97A57] text-[11px] font-medium flex items-center gap-1">
                    {isSelected ? '✓ Selected for Tactical Prep' : 'Click to select'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-edit-member-${member.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditMember(member);
                      }}
                      className="text-[#8A817C] hover:text-[#2D2A26] transition text-[11px]"
                    >
                      Edit
                    </button>
                    <button
                      id={`btn-delete-member-${member.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteMember(member.id);
                      }}
                      className="text-[#8A817C] hover:text-[#A36B73] transition text-[11px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Astrological Dialogue & Conflict Prep Tool */}
      {currentCounterpart && (
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs relative text-[#3D3A35]">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-[#B97A57]/15 border border-[#B97A57]/25 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#B97A57]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D2A26]">
                Astrological Conversation Advisor & Scripting Lab
              </h3>
              <p className="text-xs text-[#8A817C]">
                Tailored for {currentCounterpart.name} ({currentCounterpart.zodiacSign} • {currentCounterpart.element} Element)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                  Conversation Category
                </label>
                <select
                  id="select-prep-type"
                  value={prepType}
                  onChange={(e) => setPrepType(e.target.value as any)}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:outline-none focus:border-[#B97A57]"
                >
                  <option value="confrontation">Challenging Convo / Friction Resolution</option>
                  <option value="collaboration">High-Stakes Brainstorm / Co-Design</option>
                  <option value="feedback">Critical Constructive Feedback</option>
                  <option value="parenting_sync">Family Workload / Parenting Alignment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                  Specific Topic / Objective
                </label>
                <textarea
                  id="input-prep-topic"
                  rows={3}
                  value={prepTopic}
                  onChange={(e) => setPrepTopic(e.target.value)}
                  placeholder="e.g. Scope pushback, missing deadline, screen time boundaries..."
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg p-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#B97A57]"
                />
              </div>

              <button
                id="btn-generate-tactical-advice"
                onClick={handleGenerateTacticalAdvice}
                disabled={isLoadingAdvice}
                className="w-full flex items-center justify-center gap-2 bg-[#B97A57] hover:bg-[#A66947] text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAdvice ? 'animate-spin' : ''}`} />
                <span>{isLoadingAdvice ? 'Analyzing Astro Synastry...' : 'Generate Planetary Strategy'}</span>
              </button>
            </div>

            {/* Generated Tactical Brief */}
            <div className="lg:col-span-2 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] p-4 sm:p-5 space-y-4">
              {adviceResult ? (
                <div className="space-y-4 text-xs">
                  {/* Top Stats Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8E2D9]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#B97A57]" />
                      <span className="font-semibold text-[#3D3A35]">Recommended Time Window:</span>
                      <span className="font-mono font-bold text-[#8F4E2C] bg-[#B97A57]/15 px-2 py-0.5 rounded border border-[#B97A57]/25">
                        {adviceResult.bestTimeWindow}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#8A817C]">Friction Risk:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          adviceResult.confrontationRiskLevel === 'High'
                            ? 'bg-[#A36B73]/15 text-[#7D464E] border border-[#A36B73]/25'
                            : adviceResult.confrontationRiskLevel === 'Moderate'
                            ? 'bg-[#B97A57]/15 text-[#8F4E2C] border border-[#B97A57]/25'
                            : 'bg-[#7C9082]/15 text-[#4D6354] border-[#7C9082]/25'
                        }`}
                      >
                        {adviceResult.confrontationRiskLevel} Risk
                      </span>
                    </div>
                  </div>

                  {/* Astro Reasoning */}
                  <div>
                    <span className="font-bold text-[#4A6B82] uppercase tracking-wider text-[10px]">
                      Planetary Synastry Dynamic
                    </span>
                    <p className="text-[#3D3A35] mt-1 leading-relaxed">
                      {adviceResult.astrologicalReasoning}
                    </p>
                  </div>

                  {/* Opening Script */}
                  <div className="bg-white p-3 rounded-lg border border-[#E8E2D9] shadow-xs relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[#B97A57] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        De-escalation Opening Script
                      </span>
                      <button
                        id="btn-copy-script"
                        onClick={() => handleCopyScript(adviceResult.openingScript)}
                        className="flex items-center gap-1 text-[11px] text-[#8A817C] hover:text-[#2D2A26] transition"
                      >
                        {copiedScript ? <Check className="w-3 h-3 text-[#7C9082]" /> : <Copy className="w-3 h-3 text-[#8A817C]" />}
                        <span>{copiedScript ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[#2D2A26] italic leading-relaxed">
                      "{adviceResult.openingScript.replace(/^"|"$/g, '')}"
                    </p>
                  </div>

                  {/* Empathy Key & Red Flags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-3 rounded-lg border border-[#E8E2D9] shadow-xs">
                      <span className="font-bold text-[#4D6354] text-[11px] block mb-1">
                        Core Empathy Anchor
                      </span>
                      <p className="text-[#635E59]">{adviceResult.empathyKey}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-[#E8E2D9] shadow-xs">
                      <span className="font-bold text-[#A36B73] text-[11px] block mb-1">
                        Friction Triggers to Avoid
                      </span>
                      <ul className="list-disc list-inside text-[#635E59] space-y-0.5">
                        {adviceResult.tacticsToAvoid.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Self-Preservation & Leadership Anchor */}
                  <div className="bg-[#F4EFEA] p-3 rounded-lg border border-[#E8E2D9] text-[#3D3A35]">
                    <span className="font-bold text-[#4A6B82]">Inner Energy Protection: </span>
                    <span className="text-[#635E59]">{adviceResult.energyPreservationTip}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-[#8A817C]">
                  <Sparkles className="w-8 h-8 text-[#D8D0C5] mx-auto mb-2" />
                  <p className="font-semibold text-[#3D3A35]">Ready to prepare your dialogue</p>
                  <p className="text-xs text-[#8A817C] mt-1">
                    Select a topic and click "Generate Planetary Strategy" to receive a tailored opening script and timing window.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

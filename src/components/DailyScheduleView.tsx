import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
  Circle,
  Clock,
  User,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldAlert,
  Edit2,
  Trash2,
  RefreshCw,
  Heart,
  Briefcase,
  Flame,
  Feather,
  Smile,
  Coffee,
  Check,
} from 'lucide-react';
import {
  ScheduleBlock,
  AstrologicalTransit,
  UserProfile,
  Member,
  BlockCategory,
} from '../types';
import { HourlyEnergyCurve } from './HourlyEnergyCurve';

interface DailyScheduleViewProps {
  schedule: ScheduleBlock[];
  transit: AstrologicalTransit;
  userProfile: UserProfile;
  members: Member[];
  onToggleComplete: (blockId: string) => void;
  onAddBlock: () => void;
  onEditBlock: (block: ScheduleBlock) => void;
  onDeleteBlock: (blockId: string) => void;
  onAIOptimizeSchedule: () => void;
  isOptimizing: boolean;
  activeRoleFilter: 'all' | 'work_leader' | 'home_parent';
  onLaunchSwitchoverRitual: () => void;
  onOpenSynastryForMember: (memberId: string) => void;
  onOpenInviteModal?: () => void;
}

export const DailyScheduleView: React.FC<DailyScheduleViewProps> = ({
  schedule,
  transit,
  userProfile,
  members,
  onToggleComplete,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
  onAIOptimizeSchedule,
  isOptimizing,
  activeRoleFilter,
  onLaunchSwitchoverRitual,
  onOpenSynastryForMember,
  onOpenInviteModal,
}) => {
  const [expandedAstroNote, setExpandedAstroNote] = useState<string | null>(null);

  // Filter blocks according to active role filter
  const filteredBlocks = schedule.filter((b) => {
    if (activeRoleFilter === 'work_leader') {
      return b.roleContext === 'work_leader' || b.roleContext === 'transition';
    }
    if (activeRoleFilter === 'home_parent') {
      return b.roleContext === 'home_parent' || b.roleContext === 'transition';
    }
    return true;
  });

  const completedCount = schedule.filter((b) => b.completed).length;
  const totalCount = schedule.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getCategoryBadge = (category: BlockCategory) => {
    switch (category) {
      case 'focus':
        return {
          label: 'Deep Focus',
          bg: 'bg-[#5C6B73]/15 text-[#3D4D54] border-[#5C6B73]/25',
          icon: <Brain className="w-3 h-3 text-[#5C6B73]" />,
        };
      case 'leadership':
        return {
          label: 'Leadership Presence',
          bg: 'bg-[#4A6B82]/15 text-[#2C4E66] border-[#4A6B82]/25',
          icon: <Briefcase className="w-3 h-3 text-[#4A6B82]" />,
        };
      case 'parenting':
        return {
          label: 'Parent Attunement',
          bg: 'bg-[#7C9082]/15 text-[#4D6354] border-[#7C9082]/25',
          icon: <Heart className="w-3 h-3 text-[#7C9082]" />,
        };
      case 'collaboration':
        return {
          label: 'Team Synergy',
          bg: 'bg-[#B97A57]/15 text-[#8F4E2C] border-[#B97A57]/25',
          icon: <Sparkles className="w-3 h-3 text-[#B97A57]" />,
        };
      case 'challenging_convo':
        return {
          label: 'Tactical Dialogue',
          bg: 'bg-[#C99757]/15 text-[#855B26] border-[#C99757]/25',
          icon: <ShieldAlert className="w-3 h-3 text-[#C99757]" />,
        };
      case 'switchover':
        return {
          label: 'Role Switchover Bridge',
          bg: 'bg-[#A36B73]/15 text-[#7D464E] border-[#A36B73]/25',
          icon: <Feather className="w-3 h-3 text-[#A36B73]" />,
        };
      case 'wellness':
        return {
          label: 'Recharge & Solar Reset',
          bg: 'bg-[#7C9082]/15 text-[#4D6354] border-[#7C9082]/25',
          icon: <Coffee className="w-3 h-3 text-[#7C9082]" />,
        };
      case 'mindfulness':
        return {
          label: 'Mindful Centering',
          bg: 'bg-[#8E7C90]/15 text-[#5C485E] border-[#8E7C90]/25',
          icon: <Smile className="w-3 h-3 text-[#8E7C90]" />,
        };
    }
  };

  const getMemberById = (id?: string) => {
    if (!id) return null;
    return members.find((m) => m.id === id) || null;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Astrological Transits & AI Optimize Controls */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs relative overflow-hidden text-[#3D3A35]">
        {/* Ambient Glow in earthy tones */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B97A57]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7C9082]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97A57] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Planetary Transit & Chrono-Alignment
              </span>
              <span className="text-[#D8D0C5]">•</span>
              <span className="text-xs text-[#5C6B73] font-semibold">{userProfile.chronotype} Peak Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight">
              Optimize Daily Flow & Interpersonal Harmonics
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] leading-relaxed">
              {transit.transitSummary}
            </p>

            {/* Strategic Transit Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-[#E8E2D9]">
                <Briefcase className="w-4 h-4 text-[#4A6B82] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#2D2A26]">Work Leadership Pulse: </span>
                  <span className="text-[#635E59]">{transit.leadershipVibe}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-[#E8E2D9]">
                <Heart className="w-4 h-4 text-[#A36B73] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#2D2A26]">Home Parenting Attunement: </span>
                  <span className="text-[#635E59]">{transit.parentingVibe}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Hub: Golden Hours & AI Optimizer Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* Timing Badges */}
            <div className="flex flex-col gap-2 bg-white/90 p-3 rounded-xl border border-[#E8E2D9] text-xs shadow-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#8A817C] flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C9082]" />
                  Peak Collaboration:
                </span>
                <span className="font-bold text-[#4D6354] bg-[#7C9082]/15 px-2 py-0.5 rounded border border-[#7C9082]/25">
                  {transit.collaborationGoldenHour}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#8A817C] flex items-center gap-1 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#B97A57]" />
                  Safe Confrontation:
                </span>
                <span className="font-bold text-[#8F4E2C] bg-[#B97A57]/15 px-2 py-0.5 rounded border border-[#B97A57]/25">
                  {transit.tacticalConfrontationHour}
                </span>
              </div>
            </div>

            {/* AI Optimize Button */}
            <button
              id="btn-ai-optimize-schedule"
              onClick={onAIOptimizeSchedule}
              disabled={isOptimizing}
              className="flex items-center justify-center gap-2 bg-[#B97A57] hover:bg-[#A66947] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition transform active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'Aligning Astro & Chrono Flow...' : 'AI Re-Optimize Schedule'}</span>
            </button>
          </div>
        </div>

        {/* Hourly Vibe Rhythm Curve with Member Multi-Select Comparison */}
        <HourlyEnergyCurve
          transit={transit}
          userProfile={userProfile}
          members={members}
          onOpenInviteModal={onOpenInviteModal}
        />
      </div>

      {/* Daily Progress & Role Switchover Banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-[#E8E2D9] rounded-xl p-4 shadow-xs">
        {/* Progress Info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#F2EDE4] border border-[#E8E2D9] flex items-center justify-center font-bold text-[#B97A57] text-xs shrink-0">
            {progressPercent}%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#2D2A26]">
                {completedCount} of {totalCount} Rituals & Blocks Completed
              </span>
            </div>
            <p className="text-xs text-[#8A817C]">
              Showing {filteredBlocks.length} blocks for{' '}
              {activeRoleFilter === 'all' ? 'Unified Day' : activeRoleFilter === 'work_leader' ? 'Work Leadership Mode' : 'Home Parenting Mode'}
            </p>
          </div>
        </div>

        {/* Quick Add & 5:30 PM Switchover trigger */}
        <div className="flex items-center gap-2">
          <button
            id="btn-launch-switchover"
            onClick={onLaunchSwitchoverRitual}
            className="flex items-center gap-1.5 bg-[#A36B73]/15 hover:bg-[#A36B73]/25 text-[#7D464E] border border-[#A36B73]/30 text-xs font-semibold px-3 py-2 rounded-lg transition shadow-xs"
          >
            <Feather className="w-3.5 h-3.5 text-[#A36B73]" />
            <span>5:30 PM Role Switchover Bridge</span>
          </button>

          <button
            id="btn-add-schedule-block"
            onClick={onAddBlock}
            className="flex items-center gap-1 bg-white hover:bg-[#F2EDE4] text-[#3D3A35] border border-[#E8E2D9] text-xs font-medium px-3 py-2 rounded-lg transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Block</span>
          </button>
        </div>
      </div>

      {/* Schedule Timeline Blocks */}
      <div className="space-y-3">
        {filteredBlocks.map((block) => {
          const badge = getCategoryBadge(block.category);
          const counterpart = getMemberById(block.counterpartId);
          const isSwitchover = block.category === 'switchover';
          const isConfrontation = block.category === 'challenging_convo';

          return (
            <div
              key={block.id}
              className={`group relative rounded-xl border p-4 sm:p-5 transition-all ${
                block.completed
                  ? 'bg-[#FAF8F5]/60 border-[#E8E2D9]/70 opacity-70'
                  : isSwitchover
                  ? 'bg-gradient-to-r from-[#F7EFEF] to-white border-[#E5CDD1] shadow-xs'
                  : isConfrontation
                  ? 'bg-gradient-to-r from-[#FAF4EE] to-white border-[#EDDACB] shadow-xs'
                  : 'bg-white border-[#E8E2D9] hover:border-[#D4CBBF] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Left: Checkbox + Time + Content */}
                <div className="flex items-start gap-3.5">
                  {/* Completion Toggle */}
                  <button
                    id={`btn-toggle-complete-${block.id}`}
                    onClick={() => onToggleComplete(block.id)}
                    className="mt-0.5 text-[#8A817C] hover:text-[#B97A57] transition shrink-0"
                    title={block.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {block.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#7C9082] fill-[#EAF2ED]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#D8D0C5] group-hover:text-[#B97A57]" />
                    )}
                  </button>

                  {/* Body */}
                  <div className="space-y-1.5">
                    {/* Time & Badges */}
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className="font-mono font-semibold text-[#8F4E2C] bg-[#F2EDE4] px-2 py-0.5 rounded border border-[#E8E2D9] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B97A57]" />
                        {block.startTime} - {block.endTime}
                      </span>

                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${badge.bg}`}>
                        {badge.icon}
                        {badge.label}
                      </span>

                      {/* Energy Demand Pill */}
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          block.energyDemand === 'high'
                            ? 'bg-[#B97A57]/15 text-[#8F4E2C] border border-[#B97A57]/25'
                            : block.energyDemand === 'medium'
                            ? 'bg-[#C99757]/15 text-[#855B26] border border-[#C99757]/25'
                            : 'bg-[#7C9082]/15 text-[#4D6354] border-[#7C9082]/25'
                        }`}
                      >
                        {block.energyDemand === 'recharging' ? '⚡ Restorative' : `${block.energyDemand} Energy`}
                      </span>

                      {/* Astro Alignment Score */}
                      <span className="text-[11px] font-medium text-[#4A6B82] bg-[#4A6B82]/10 px-2 py-0.5 rounded border border-[#4A6B82]/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B97A57]" />
                        {block.astroAlignmentScore}% Astro Harmony
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-base font-bold text-[#2D2A26] ${
                        block.completed ? 'line-through text-[#8A817C]' : ''
                      }`}
                    >
                      {block.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#635E59] leading-relaxed max-w-3xl">
                      {block.description}
                    </p>

                    {/* Counterpart Synastry Pill if assigned */}
                    {counterpart && (
                      <div className="pt-1 flex items-center gap-2">
                        <button
                          id={`btn-synastry-view-${counterpart.id}`}
                          onClick={() => onOpenSynastryForMember(counterpart.id)}
                          className="inline-flex items-center gap-1.5 text-xs bg-[#F4EFEA] hover:bg-[#E8E2D9] text-[#3D3A35] px-2.5 py-1 rounded-lg border border-[#E8E2D9] transition"
                        >
                          <User className="w-3.5 h-3.5 text-[#B97A57]" />
                          <span className="font-semibold">{counterpart.name}</span>
                          <span className="text-[10px] text-[#8A817C]">
                            ({counterpart.zodiacSign} • {counterpart.element})
                          </span>
                          <span className="text-[10px] text-[#4D6354] font-bold bg-[#7C9082]/15 px-1.5 py-0.2 rounded border border-[#7C9082]/30 ml-1">
                            {counterpart.synastryHarmonicScore}% Synastry
                          </span>
                          <ArrowRight className="w-3 h-3 text-[#8A817C] ml-0.5" />
                        </button>
                      </div>
                    )}

                    {/* Mindfulness Prompt Anchor */}
                    {block.mindfulnessPrompt && (
                      <div className="mt-2 p-2.5 rounded-lg bg-[#F5F2EC] border border-[#E2DDD4] flex items-start gap-2 text-xs text-[#4A453E]">
                        <Feather className="w-3.5 h-3.5 text-[#B97A57] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#8F4E2C]">Mindful Anchor: </span>
                          <span className="italic text-[#5C554E]">{block.mindfulnessPrompt}</span>
                        </div>
                      </div>
                    )}

                    {/* Astro Alignment Note */}
                    {block.astroNote && (
                      <div className="pt-1 text-[11px] text-[#8A817C] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B97A57] shrink-0" />
                        <span>{block.astroNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D9]">
                  {isSwitchover && (
                    <button
                      id="btn-do-switchover-ritual"
                      onClick={onLaunchSwitchoverRitual}
                      className="bg-[#A36B73] hover:bg-[#8F5A62] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition"
                    >
                      Start 5-Min Transition
                    </button>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      id={`btn-edit-block-${block.id}`}
                      onClick={() => onEditBlock(block)}
                      className="p-1.5 text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] rounded-md transition"
                      title="Edit Block"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`btn-delete-block-${block.id}`}
                      onClick={() => onDeleteBlock(block.id)}
                      className="p-1.5 text-[#8A817C] hover:text-[#A36B73] hover:bg-[#F2EDE4] rounded-md transition"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E8E2D9] p-6">
            <Calendar className="w-8 h-8 text-[#D8D0C5] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#3D3A35]">No scheduled blocks found for this filter</p>
            <p className="text-xs text-[#8A817C] mt-1">Add a new block or switch the role filter to view all events.</p>
            <button
              id="btn-add-block-empty"
              onClick={onAddBlock}
              className="mt-4 bg-[#B97A57] hover:bg-[#A66947] text-white font-semibold text-xs px-4 py-2 rounded-lg transition shadow-xs"
            >
              Add First Block
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

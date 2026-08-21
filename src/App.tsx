import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Member,
  ScheduleBlock,
  DailyMetric,
  AstrologicalTransit,
  EnergyRitual,
} from './types';
import {
  loadUserProfile,
  saveUserProfile,
  loadMembers,
  saveMembers,
  loadScheduleBlocks,
  saveScheduleBlocks,
  loadMetricsHistory,
  saveMetricsHistory,
  loadEnergyRituals,
} from './utils/storage';
import { getDailyTransit } from './utils/astroEngine';
import { Navbar } from './components/Navbar';
import { DailyScheduleView } from './components/DailyScheduleView';
import { AstroSynastryView } from './components/AstroSynastryView';
import { RolePresenceView } from './components/RolePresenceView';
import { MindfulnessEnergyHub } from './components/MindfulnessEnergyHub';
import { DashboardAnalyticsView } from './components/DashboardAnalyticsView';
import { ProfileView } from './components/ProfileView';
import { ScheduleBlockModal } from './components/ScheduleBlockModal';
import { MemberModal } from './components/MemberModal';
import { EnergyRebootModal } from './components/EnergyRebootModal';
import { InviteMemberModal } from './components/InviteMemberModal';
import confetti from 'canvas-confetti';

export default function App() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState<string>(todayStr);
  const [activeTab, setActiveTab] = useState<
    'schedule' | 'synastry' | 'roles' | 'mindfulness' | 'analytics' | 'profile'
  >('schedule');
  const [activeRoleFilter, setActiveRoleFilter] = useState<'all' | 'work_leader' | 'home_parent'>('all');

  // Core Data States
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile());
  const [members, setMembers] = useState<Member[]>(() => loadMembers());
  const [schedule, setSchedule] = useState<ScheduleBlock[]>(() => loadScheduleBlocks(todayStr));
  const [metricsHistory, setMetricsHistory] = useState<DailyMetric[]>(() => loadMetricsHistory(todayStr));
  const [rituals] = useState<EnergyRitual[]>(() => loadEnergyRituals());

  // Transit state calculated dynamically from current date and profile
  const [transit, setTransit] = useState<AstrologicalTransit>(() =>
    getDailyTransit(todayStr, userProfile)
  );

  // Modals & Active Selections
  const [isBlockModalOpen, setIsBlockModalOpen] = useState<boolean>(false);
  const [editingBlock, setEditingBlock] = useState<ScheduleBlock | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isEnergyRebootOpen, setIsEnergyRebootOpen] = useState<boolean>(false);
  const [synastrySelectedMemberId, setSynastrySelectedMemberId] = useState<string | null>(null);
  const [isOptimizingSchedule, setIsOptimizingSchedule] = useState<boolean>(false);

  // On Date Change: reload schedule for that date and compute transit
  useEffect(() => {
    const loaded = loadScheduleBlocks(currentDate);
    setSchedule(loaded);
    const newTransit = getDailyTransit(currentDate, userProfile);
    setTransit(newTransit);
  }, [currentDate, userProfile]);

  // Sync profile changes
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveUserProfile(newProfile);
  };

  // Sync members
  const handleSaveMember = (member: Member) => {
    const exists = members.some((m) => m.id === member.id);
    const updated = exists ? members.map((m) => (m.id === member.id ? member : m)) : [...members, member];
    setMembers(updated);
    saveMembers(updated);
  };

  const handleDeleteMember = (memberId: string) => {
    const updated = members.filter((m) => m.id !== memberId);
    setMembers(updated);
    saveMembers(updated);
  };

  // Sync Schedule Blocks
  const handleSaveBlock = (block: ScheduleBlock) => {
    const exists = schedule.some((b) => b.id === block.id);
    const updated = exists ? schedule.map((b) => (b.id === block.id ? block : b)) : [...schedule, block];
    setSchedule(updated);
    saveScheduleBlocks(currentDate, updated);
  };

  const handleDeleteBlock = (blockId: string) => {
    const updated = schedule.filter((b) => b.id !== blockId);
    setSchedule(updated);
    saveScheduleBlocks(currentDate, updated);
  };

  const handleToggleBlockComplete = (blockId: string) => {
    const updated = schedule.map((b) => {
      if (b.id === blockId) {
        const nextState = !b.completed;
        if (nextState) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#f59e0b', '#3b82f6', '#10b981'],
            });
          } catch (e) {}
        }
        return { ...b, completed: nextState };
      }
      return b;
    });
    setSchedule(updated);
    saveScheduleBlocks(currentDate, updated);

    // Update today's metric completed count
    const completedCount = updated.filter((b) => b.completed).length;
    handleUpdateTodayMetric({
      completedBlocksCount: completedCount,
      totalBlocksCount: updated.length,
      productivityScore: Math.min(100, Math.round((completedCount / (updated.length || 1)) * 100)),
    });
  };

  // Metric Helpers for the current date
  const getTodayMetric = (): DailyMetric => {
    const existing = metricsHistory.find((m) => m.date === currentDate);
    if (existing) return existing;

    const newMetric: DailyMetric = {
      date: currentDate,
      productivityScore: 82,
      focusHoursCompleted: 4.2,
      leadershipPresence: 8,
      parentAttunement: 8,
      energyPositivity: 8,
      completedBlocksCount: schedule.filter((b) => b.completed).length,
      totalBlocksCount: schedule.length,
      roleSwitchoverCompleted: false,
      mindfulMinutes: 20,
      astroAlignmentAvg: 91,
      dailyNotes: 'Aligned with daily planetary rhythm.',
      dominantEmotion: 'Focused & Grounded',
    };
    return newMetric;
  };

  const handleUpdateTodayMetric = (partial: Partial<DailyMetric>) => {
    const current = getTodayMetric();
    const updatedItem: DailyMetric = { ...current, ...partial };
    const exists = metricsHistory.some((m) => m.date === currentDate);
    const updatedHistory = exists
      ? metricsHistory.map((m) => (m.date === currentDate ? updatedItem : m))
      : [...metricsHistory, updatedItem];

    setMetricsHistory(updatedHistory);
    saveMetricsHistory(updatedHistory);
  };

  // AI Schedule Optimization Trigger
  const handleAIOptimizeSchedule = async () => {
    setIsOptimizingSchedule(true);
    try {
      const response = await fetch('/api/gemini/optimize-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          schedule,
          currentTransit: transit,
          goals: 'Maximize deep morning focus, align high-stakes collaboration during harmonic planetary hours, ensure clear 5:30 PM role switchover, and foster warm family attunement in the evening.',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.optimized && Array.isArray(json.optimizedBlocks) && json.optimizedBlocks.length > 0) {
          const formattedBlocks: ScheduleBlock[] = json.optimizedBlocks.map((b: any, idx: number) => ({
            id: b.id || `opt-block-${idx}`,
            date: currentDate,
            startTime: b.startTime || '09:00',
            endTime: b.endTime || '10:00',
            title: b.title || 'Focus Sprint',
            category: b.category || 'focus',
            description: b.description || 'Optimized timeblock.',
            energyDemand: b.energyDemand || 'medium',
            roleContext: b.category === 'parenting' ? 'home_parent' : b.category === 'switchover' ? 'transition' : 'work_leader',
            astroAlignmentScore: b.astroAlignmentScore || 95,
            astroNote: b.astroNote || 'Aligned with planetary hours.',
            mindfulnessPrompt: b.mindfulnessPrompt,
            completed: false,
          }));

          setSchedule(formattedBlocks);
          saveScheduleBlocks(currentDate, formattedBlocks);

          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#6366f1', '#f59e0b', '#ec4899', '#10b981'],
            });
          } catch (e) {}

          setIsOptimizingSchedule(false);
          return;
        }
      }
    } catch (e) {
      console.warn('AI optimization call failed, using heuristic flow:', e);
    }

    // Heuristic schedule rearrangement fallback
    const heuristicBlocks: ScheduleBlock[] = [
      {
        id: `block-${currentDate}-1`,
        date: currentDate,
        startTime: '06:45',
        endTime: '07:30',
        title: 'Morning Sun & Mindful Centering',
        category: 'wellness',
        description: 'Hydration, light stretching, 10 min solar plexus breathing, and setting daily intention.',
        energyDemand: 'recharging',
        roleContext: 'self_care',
        astroAlignmentScore: 96,
        astroNote: 'Optimized for Sun vitality window; establishes neuro-hormonal calm baseline.',
        mindfulnessPrompt: 'Inhale clarity, exhale mental clutter. Today I lead with purpose and love.',
        completed: false,
      },
      {
        id: `block-${currentDate}-2`,
        date: currentDate,
        startTime: '07:30',
        endTime: '08:30',
        title: 'Family Breakfast & School Launch',
        category: 'parenting',
        description: 'Warm morning connection with kids, packing lunches, and setting a calm family tone.',
        counterpartId: 'fam-1',
        energyDemand: 'medium',
        roleContext: 'home_parent',
        astroAlignmentScore: 92,
        astroNote: 'Harmonic morning hours support gentle family bonding without rush.',
        mindfulnessPrompt: 'Be 100% present in the kitchen. Make eye contact before they leave.',
        completed: false,
      },
      {
        id: `block-${currentDate}-3`,
        date: currentDate,
        startTime: '09:00',
        endTime: '10:30',
        title: 'Peak Cognitive Architecture & Deep Work',
        category: 'focus',
        description: 'Zero-distraction high-leverage block: Strategic roadmaps, architecture decoupling.',
        energyDemand: 'high',
        roleContext: 'work_leader',
        astroAlignmentScore: 98,
        astroNote: 'Peak cognitive window (Bear chronotype) + Mercury analytical flow.',
        mindfulnessPrompt: 'Close all communication apps. Dive into the flow state with effortless ease.',
        completed: false,
      },
      {
        id: `block-${currentDate}-4`,
        date: currentDate,
        startTime: '10:30',
        endTime: '11:45',
        title: 'High-Impact Collaboration Golden Hour',
        category: 'collaboration',
        description: 'Cross-functional co-design and architectural alignment with tech leads.',
        counterpartId: 'team-1',
        energyDemand: 'high',
        roleContext: 'work_leader',
        astroAlignmentScore: 97,
        astroNote: 'Optimal Golden Collaboration Window: Fire-Water harmonic synthesis during 10:30 AM peak.',
        mindfulnessPrompt: 'Listen with 60% listening ratio. Validate counterpart perspectives.',
        completed: false,
      },
      {
        id: `block-${currentDate}-5`,
        date: currentDate,
        startTime: '12:00',
        endTime: '13:00',
        title: 'Nourishing Lunch & Circadian Solar Walk',
        category: 'wellness',
        description: 'Screen-free healthy lunch and a 15-minute outdoor walk in sunlight to reset energy.',
        energyDemand: 'recharging',
        roleContext: 'self_care',
        astroAlignmentScore: 94,
        astroNote: 'Sun peak recharge; essential to prevent the afternoon slump.',
        mindfulnessPrompt: 'Taste every bite mindfully. Feel the ground supporting you.',
        completed: false,
      },
      {
        id: `block-${currentDate}-6`,
        date: currentDate,
        startTime: '14:00',
        endTime: '15:15',
        title: 'Tactical Dialogue & Priority Trade-offs',
        category: 'challenging_convo',
        description: 'Safe window for addressing friction, scoping adjustments, or constructive feedback.',
        counterpartId: 'team-2',
        energyDemand: 'high',
        roleContext: 'work_leader',
        astroAlignmentScore: 93,
        astroNote: 'Astrological Safe Window: Mars-Mercury trine softens confrontation risks.',
        mindfulnessPrompt: 'Ground your feet. Speak with clarity, respect, and emotional composure.',
        completed: false,
      },
      {
        id: `block-${currentDate}-7`,
        date: currentDate,
        startTime: '15:30',
        endTime: '16:45',
        title: 'Team Unblocker & Design Review',
        category: 'leadership',
        description: 'Reviewing UI micro-interactions, clearing blockers, and acknowledging team wins.',
        counterpartId: 'team-3',
        energyDemand: 'medium',
        roleContext: 'work_leader',
        astroAlignmentScore: 91,
        astroNote: 'Air-Earth balance window: High diplomacy and clear financial signoffs.',
        mindfulnessPrompt: 'Praise creative craft openly and confirm operational timeline feasibility.',
        completed: false,
      },
      {
        id: `block-${currentDate}-8`,
        date: currentDate,
        startTime: '17:15',
        endTime: '17:30',
        title: 'Daily Shutdown & Executive Wrap',
        category: 'focus',
        description: 'Clear inbox, document tomorrow\'s top 3 outcomes, and log leadership presence.',
        energyDemand: 'medium',
        roleContext: 'work_leader',
        astroAlignmentScore: 89,
        astroNote: 'Saturnian closure ritual; releases cognitive loops before switching roles.',
        mindfulnessPrompt: 'Acknowledge today\'s progress. Work is safely completed.',
        completed: false,
      },
      {
        id: `block-${currentDate}-9`,
        date: currentDate,
        startTime: '17:30',
        endTime: '17:45',
        title: 'The Role Switchover Ritual (Work to Home)',
        category: 'switchover',
        description: 'Shed corporate armor, 3 double-inhale sighs, wash hands/face, set intention for warm parenting.',
        energyDemand: 'recharging',
        roleContext: 'transition',
        astroAlignmentScore: 99,
        astroNote: 'Essential boundary ritual: Prevents stress spillover into evening home sanctuary.',
        mindfulnessPrompt: 'I leave the leader behind. I step forward as a loving, attentive parent.',
        completed: false,
      },
      {
        id: `block-${currentDate}-10`,
        date: currentDate,
        startTime: '18:00',
        endTime: '19:30',
        title: 'Dinner & Family Play / Storytelling',
        category: 'parenting',
        description: 'Cook dinner together, laugh over school stories, help with homework, and share presence.',
        counterpartId: 'fam-3',
        energyDemand: 'medium',
        roleContext: 'home_parent',
        astroAlignmentScore: 95,
        astroNote: 'Moon in Water activates deep empathic connection and joyful family storytelling.',
        mindfulnessPrompt: 'No phones at the table. Fully listen with soft eyes and an open heart.',
        completed: false,
      },
      {
        id: `block-${currentDate}-11`,
        date: currentDate,
        startTime: '20:00',
        endTime: '21:00',
        title: 'Bedtime Reading & Partner Reconnection',
        category: 'parenting',
        description: 'Tuck-in stories with children and a warm cup of herbal tea with partner.',
        counterpartId: 'fam-1',
        energyDemand: 'recharging',
        roleContext: 'home_parent',
        astroAlignmentScore: 96,
        astroNote: 'Evening Venusian wind-down; emotional safety and restorative intimacy.',
        mindfulnessPrompt: 'Surround your loved ones with quiet peace. Gratitude for another full day.',
        completed: false,
      },
    ];

    setSchedule(heuristicBlocks);
    saveScheduleBlocks(currentDate, heuristicBlocks);
    setIsOptimizingSchedule(false);
  };

  const todayMetric = getTodayMetric();

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#3D3A35] flex flex-col font-sans selection:bg-[#B97A57]/20 selection:text-[#2D2A26]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        transit={transit}
        userProfile={userProfile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeRoleFilter={activeRoleFilter}
        onRoleFilterChange={setActiveRoleFilter}
        todayPositivityScore={todayMetric.energyPositivity}
        onOpenEnergyReboot={() => setIsEnergyRebootOpen(true)}
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'schedule' && (
          <DailyScheduleView
            schedule={schedule}
            transit={transit}
            userProfile={userProfile}
            members={members}
            onToggleComplete={handleToggleBlockComplete}
            onAddBlock={() => {
              setEditingBlock(null);
              setIsBlockModalOpen(true);
            }}
            onEditBlock={(block) => {
              setEditingBlock(block);
              setIsBlockModalOpen(true);
            }}
            onDeleteBlock={handleDeleteBlock}
            onAIOptimizeSchedule={handleAIOptimizeSchedule}
            isOptimizing={isOptimizingSchedule}
            activeRoleFilter={activeRoleFilter}
            onLaunchSwitchoverRitual={() => setActiveTab('roles')}
            onOpenSynastryForMember={(memberId) => {
              setSynastrySelectedMemberId(memberId);
              setActiveTab('synastry');
            }}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
          />
        )}

        {activeTab === 'synastry' && (
          <AstroSynastryView
            userProfile={userProfile}
            transit={transit}
            members={members}
            onAddMember={() => {
              setEditingMember(null);
              setIsMemberModalOpen(true);
            }}
            onEditMember={(member) => {
              setEditingMember(member);
              setIsMemberModalOpen(true);
            }}
            onDeleteMember={handleDeleteMember}
            selectedMemberId={synastrySelectedMemberId}
          />
        )}

        {activeTab === 'roles' && (
          <RolePresenceView
            userProfile={userProfile}
            todayMetric={todayMetric}
            onUpdateMetric={handleUpdateTodayMetric}
            onSwitchoverDone={() => {
              // Mark switchover block completed in schedule
              const updated = schedule.map((b) =>
                b.category === 'switchover' ? { ...b, completed: true } : b
              );
              setSchedule(updated);
              saveScheduleBlocks(currentDate, updated);
            }}
          />
        )}

        {activeTab === 'mindfulness' && (
          <MindfulnessEnergyHub
            userProfile={userProfile}
            rituals={rituals}
            onOpenEnergyReboot={() => setIsEnergyRebootOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <DashboardAnalyticsView
            metricsHistory={metricsHistory}
            userProfile={userProfile}
            members={members}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onSaveProfile={handleSaveProfile}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E2D9] bg-[#F2EDE4]/80 py-4 text-center text-xs text-[#8A817C]">
        <p>
          AstroFlow • Leadership & Parenting Energy Synchronizer • Powered by Gemini 3.7 & Astrological Chrono-Harmonics
        </p>
      </footer>

      {/* Modals */}
      <ScheduleBlockModal
        isOpen={isBlockModalOpen}
        onClose={() => {
          setIsBlockModalOpen(false);
          setEditingBlock(null);
        }}
        onSave={handleSaveBlock}
        initialBlock={editingBlock}
        dateStr={currentDate}
        members={members}
      />

      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => {
          setIsMemberModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        initialMember={editingMember}
        userProfile={userProfile}
      />

      <EnergyRebootModal
        isOpen={isEnergyRebootOpen}
        onClose={() => setIsEnergyRebootOpen(false)}
        userProfile={userProfile}
      />

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSaveMember={handleSaveMember}
        userProfile={userProfile}
        existingMembers={members}
      />
    </div>
  );
}

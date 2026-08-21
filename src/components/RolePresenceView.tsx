import React, { useState } from 'react';
import {
  Briefcase,
  Heart,
  Feather,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Smile,
  Zap,
  Clock,
  RotateCcw,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, DailyMetric } from '../types';

interface RolePresenceViewProps {
  userProfile: UserProfile;
  todayMetric: DailyMetric;
  onUpdateMetric: (updated: Partial<DailyMetric>) => void;
  onSwitchoverDone: () => void;
}

export const RolePresenceView: React.FC<RolePresenceViewProps> = ({
  userProfile,
  todayMetric,
  onUpdateMetric,
  onSwitchoverDone,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSwitchoverRunning, setIsSwitchoverRunning] = useState<boolean>(false);
  const [leadershipScore, setLeadershipScore] = useState<number>(todayMetric.leadershipPresence || 8);
  const [parentingScore, setParentingScore] = useState<number>(todayMetric.parentAttunement || 8);
  const [switchoverNotes, setSwitchoverNotes] = useState<string>('');

  const switchoverSteps = [
    {
      title: '1. Executive Shutdown & Tab Closure',
      instruction: 'Physically close all communication channels (Slack, Email, Jira). Close your laptop or step away from your workstation.',
      mantra: 'My team is capable, my tasks are captured for tomorrow, and my workday is now complete.',
      actionLabel: 'Tasks Closed & Workday Paused',
    },
    {
      title: '2. Somatic Reset & Physiological Sighs',
      instruction: 'Place a hand on your heart and one on your belly. Take two sharp inhales through your nose, followed by a long, audible sigh through your mouth. Repeat 3 times.',
      mantra: 'I release all organizational urgency, cognitive adrenaline, and problem-solving pressure.',
      actionLabel: 'Sighs Completed, Nervous System Calmed',
    },
    {
      title: '3. Shedding the Executive Armor',
      instruction: 'Mentally picture removing the armor of corporate defense, metrics, and authority. Visualize stepping into the warm light of your family circle.',
      mantra: 'I do not need to manage my family. I am here to love, witness, play, and connect.',
      actionLabel: 'Armor Shed, Heart Center Open',
    },
    {
      title: '4. The Sensory Water Cleansing',
      instruction: 'Wash your hands or splash cool water on your face. Feel the temperature shift, grounding your physical presence in the present moment.',
      mantra: 'I arrive in my home as an anchor of safety, joy, and unconditional presence.',
      actionLabel: 'Complete Switchover Ritual',
    },
  ];

  const handleNextStep = () => {
    if (activeStep < switchoverSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Completed switchover!
      setIsSwitchoverRunning(false);
      onSwitchoverDone();
      onUpdateMetric({
        roleSwitchoverCompleted: true,
        mindfulMinutes: (todayMetric.mindfulMinutes || 15) + 5,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
        });
      } catch (e) {
        // Safe if confetti fails
      }
    }
  };

  const handleSaveScores = () => {
    onUpdateMetric({
      leadershipPresence: leadershipScore,
      parentAttunement: parentingScore,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs text-[#3D3A35]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A36B73] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#A36B73]" />
                Dual Role Mastery & Presence
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight mt-1">
              Showing Up as Leader at Work & Parent at Home
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] max-w-3xl mt-1 leading-relaxed">
              True leadership excellence during the workday should enrich—not deplete—your emotional capacity for warm, attentive parenting in the evening.
            </p>
          </div>
        </div>
      </div>

      {/* The 5:30 PM Switchover Bridge Interactive Feature */}
      <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden text-[#3D3A35]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#A36B73]/15 border border-[#A36B73]/30 flex items-center justify-center text-[#A36B73]">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#2D2A26] text-base">
                  The 5:30 PM Role Switchover Bridge
                </h3>
                {todayMetric.roleSwitchoverCompleted && (
                  <span className="bg-[#7C9082]/15 text-[#4D6354] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#7C9082]/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed Today
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8A817C]">
                5-Minute guided psychological transition between executive mode and family connection.
              </p>
            </div>
          </div>

          {!isSwitchoverRunning && (
            <button
              id="btn-start-switchover-flow"
              onClick={() => {
                setActiveStep(0);
                setIsSwitchoverRunning(true);
              }}
              className="bg-[#A36B73] hover:bg-[#8F5A62] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              {todayMetric.roleSwitchoverCompleted ? 'Re-run Switchover' : 'Launch 5-Min Transition'}
            </button>
          )}
        </div>

        {/* Active Switchover Interactive Flow */}
        {isSwitchoverRunning ? (
          <div className="mt-5 bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D9] space-y-4">
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs text-[#8A817C]">
              <span>Step {activeStep + 1} of {switchoverSteps.length}</span>
              <span className="font-semibold text-[#A36B73]">{switchoverSteps[activeStep].title}</span>
            </div>

            <div className="w-full bg-[#E8E2D9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#A36B73] to-[#B97A57] h-full rounded-full transition-all duration-300"
                style={{ width: `${((activeStep + 1) / switchoverSteps.length) * 100}%` }}
              />
            </div>

            {/* Step details */}
            <div className="py-2 space-y-3">
              <p className="text-sm text-[#2D2A26] leading-relaxed font-medium">
                {switchoverSteps[activeStep].instruction}
              </p>

              <div className="bg-[#F7EFEF] p-3.5 rounded-lg border border-[#E5CDD1] text-xs">
                <span className="font-bold text-[#A36B73] uppercase tracking-wider text-[10px] block mb-1">
                  Inner Affirmation
                </span>
                <p className="text-[#3D3A35] italic text-sm">
                  "{switchoverSteps[activeStep].mantra}"
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D9]">
              <button
                id="btn-cancel-switchover"
                onClick={() => setIsSwitchoverRunning(false)}
                className="text-xs text-[#8A817C] hover:text-[#2D2A26]"
              >
                Cancel
              </button>

              <button
                id="btn-next-switchover-step"
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-[#A36B73] hover:bg-[#8F5A62] text-white font-semibold text-xs px-5 py-2 rounded-lg shadow-xs transition"
              >
                <span>{switchoverSteps[activeStep].actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <div className="font-bold text-[#2D2A26] mb-1 flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#A36B73]/20 text-[#7D464E] text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Work Closure</span>
              </div>
              <p className="text-[#635E59] text-[11px]">Close all tabs, silence notifications, park open questions.</p>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <div className="font-bold text-[#2D2A26] mb-1 flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#A36B73]/20 text-[#7D464E] text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Somatic Sighs</span>
              </div>
              <p className="text-[#635E59] text-[11px]">3 double-inhale sighs to dump adrenaline and cortisol.</p>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <div className="font-bold text-[#2D2A26] mb-1 flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#A36B73]/20 text-[#7D464E] text-[10px] flex items-center justify-center font-bold">3</span>
                <span>De-armor</span>
              </div>
              <p className="text-[#635E59] text-[11px]">Shed executive authority; awaken compassionate warmth.</p>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <div className="font-bold text-[#2D2A26] mb-1 flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#A36B73]/20 text-[#7D464E] text-[10px] flex items-center justify-center font-bold">4</span>
                <span>Water Anchor</span>
              </div>
              <p className="text-[#635E59] text-[11px]">Splash cold water on face/hands to mark home arrival.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dual Role Pillars Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leader at Work Pillar */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#4A6B82]/15 border border-[#4A6B82]/30 flex items-center justify-center text-[#4A6B82]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2D2A26] text-sm">Leader at Work Archetype</h3>
              <p className="text-xs text-[#4A6B82] font-semibold">{userProfile.workRole}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-1">⚡ Core Leadership Pillars:</span>
              <ul className="text-[#635E59] space-y-1">
                <li>• Strategic Vision without micromanagement</li>
                <li>• Shielding team psychological safety from executive panic</li>
                <li>• Decisive delegation grounded in clear ownership</li>
              </ul>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-1">🧘 Pre-Meeting Leadership Anchor:</span>
              <p className="text-[#5C554E] italic">
                "I do not need to have every answer. My greatest contribution is asking the grounding question and listening without rushing."
              </p>
            </div>
          </div>

          {/* Today's Leadership Presence Logger */}
          <div className="pt-2 border-t border-[#E8E2D9]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#3D3A35]">Today's Leadership Presence:</span>
              <span className="font-bold text-[#4A6B82]">{leadershipScore} / 10</span>
            </div>
            <input
              id="slider-leadership-presence"
              type="range"
              min="1"
              max="10"
              value={leadershipScore}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLeadershipScore(val);
                onUpdateMetric({ leadershipPresence: val });
              }}
              className="w-full accent-[#4A6B82] cursor-pointer"
            />
          </div>
        </div>

        {/* Parent at Home Pillar */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#7C9082]/15 border border-[#7C9082]/30 flex items-center justify-center text-[#4D6354]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2D2A26] text-sm">Parent at Home Archetype</h3>
              <p className="text-xs text-[#4D6354] font-semibold">{userProfile.familyRole}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-1">🏡 Core Parenting Pillars:</span>
              <ul className="text-[#635E59] space-y-1">
                <li>• Deep eye contact & uninterrupted listening</li>
                <li>• Regulated emotional weather when kids are dysregulated</li>
                <li>• Playfulness, evening warmth, and affectionate connection</li>
              </ul>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-1">🧘 Pre-Dinner Parenting Anchor:</span>
              <p className="text-[#5C554E] italic">
                "My family does not want an executive optimizer; they want a present, warm heart. I meet my children exactly where they are."
              </p>
            </div>
          </div>

          {/* Today's Parenting Attunement Logger */}
          <div className="pt-2 border-t border-[#E8E2D9]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#3D3A35]">Today's Parenting Attunement:</span>
              <span className="font-bold text-[#4D6354]">{parentingScore} / 10</span>
            </div>
            <input
              id="slider-parent-attunement"
              type="range"
              min="1"
              max="10"
              value={parentingScore}
              onChange={(e) => {
                const val = Number(e.target.value);
                setParentingScore(val);
                onUpdateMetric({ parentAttunement: val });
              }}
              className="w-full accent-[#7C9082] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

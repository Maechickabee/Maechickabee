import React, { useState, useEffect } from 'react';
import {
  Zap,
  Smile,
  Heart,
  Feather,
  Flame,
  Activity,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Sun,
  Shield,
  CheckCircle2,
  Coffee,
} from 'lucide-react';
import { EnergyRitual, UserProfile } from '../types';

interface MindfulnessEnergyHubProps {
  userProfile: UserProfile;
  rituals: EnergyRitual[];
  onOpenEnergyReboot: () => void;
}

export const MindfulnessEnergyHub: React.FC<MindfulnessEnergyHubProps> = ({
  userProfile,
  rituals,
  onOpenEnergyReboot,
}) => {
  const [breathingPattern, setBreathingPattern] = useState<'box' | 'calm' | 'heart' | 'energize'>('box');
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [selectedRitual, setSelectedRitual] = useState<EnergyRitual | null>(rituals[0] || null);

  // Breathing Pacer Logic
  useEffect(() => {
    if (!isBreathingActive) return;

    const getPatternConfig = () => {
      switch (breathingPattern) {
        case 'box':
          return [
            { phase: 'Inhale' as const, duration: 4 },
            { phase: 'Hold' as const, duration: 4 },
            { phase: 'Exhale' as const, duration: 4 },
            { phase: 'Pause' as const, duration: 4 },
          ];
        case 'calm': // 4-7-8
          return [
            { phase: 'Inhale' as const, duration: 4 },
            { phase: 'Hold' as const, duration: 7 },
            { phase: 'Exhale' as const, duration: 8 },
            { phase: 'Pause' as const, duration: 0 },
          ];
        case 'heart': // 5-5
          return [
            { phase: 'Inhale' as const, duration: 5 },
            { phase: 'Hold' as const, duration: 0 },
            { phase: 'Exhale' as const, duration: 5 },
            { phase: 'Pause' as const, duration: 0 },
          ];
        case 'energize': // 2-1-2
          return [
            { phase: 'Inhale' as const, duration: 2 },
            { phase: 'Hold' as const, duration: 1 },
            { phase: 'Exhale' as const, duration: 2 },
            { phase: 'Pause' as const, duration: 0 },
          ];
      }
    };

    const pattern = getPatternConfig().filter((p) => p.duration > 0);
    let currentStepIndex = 0;
    let secondsLeft = pattern[0].duration;
    setBreathPhase(pattern[0].phase);
    setPhaseSecondsLeft(secondsLeft);

    const interval = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        currentStepIndex = (currentStepIndex + 1) % pattern.length;
        if (currentStepIndex === 0) {
          setCyclesCompleted((c) => c + 1);
        }
        secondsLeft = pattern[currentStepIndex].duration;
        setBreathPhase(pattern[currentStepIndex].phase);
      }
      setPhaseSecondsLeft(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPattern]);

  const getPhaseScale = () => {
    if (!isBreathingActive) return 'scale-100';
    if (breathPhase === 'Inhale') return 'scale-125';
    if (breathPhase === 'Hold') return 'scale-125';
    if (breathPhase === 'Exhale') return 'scale-90';
    return 'scale-90';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs text-[#3D3A35]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C9082] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#7C9082]" />
                Energy Management & Positive State Mastery
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight mt-1">
              Somatic, Astrological & Mindful Energy Anchors
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] max-w-3xl mt-1 leading-relaxed">
              Maintain mostly positive energy across work and home with targeted breathwork, circadian resets, and astrological element harmonization.
            </p>
          </div>

          <button
            id="btn-trigger-reboot-modal"
            onClick={onOpenEnergyReboot}
            className="flex items-center gap-2 bg-[#B97A57] hover:bg-[#A66947] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Instant 2-Min Energy Reboot</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Breathwork Pacer + Energy Protocol Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive Breathwork Studio */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between text-[#3D3A35]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#2D2A26] text-base">Guided Breathing Pacer</h3>
                <p className="text-xs text-[#8A817C]">Shift autonomic nervous system state on demand</p>
              </div>
              <span className="text-xs text-[#4D6354] font-mono bg-[#7C9082]/15 px-2 py-0.5 rounded border border-[#7C9082]/30 font-semibold">
                {cyclesCompleted} Cycles Done
              </span>
            </div>

            {/* Pattern Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs mb-6">
              <button
                id="breath-pattern-box"
                onClick={() => {
                  setBreathingPattern('box');
                  setIsBreathingActive(false);
                }}
                className={`py-1.5 rounded-lg font-medium transition ${
                  breathingPattern === 'box' ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
                }`}
              >
                Box 4-4-4-4
              </button>
              <button
                id="breath-pattern-calm"
                onClick={() => {
                  setBreathingPattern('calm');
                  setIsBreathingActive(false);
                }}
                className={`py-1.5 rounded-lg font-medium transition ${
                  breathingPattern === 'calm' ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
                }`}
              >
                Calm 4-7-8
              </button>
              <button
                id="breath-pattern-heart"
                onClick={() => {
                  setBreathingPattern('heart');
                  setIsBreathingActive(false);
                }}
                className={`py-1.5 rounded-lg font-medium transition ${
                  breathingPattern === 'heart' ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
                }`}
              >
                Heart 5-5
              </button>
              <button
                id="breath-pattern-energize"
                onClick={() => {
                  setBreathingPattern('energize');
                  setIsBreathingActive(false);
                }}
                className={`py-1.5 rounded-lg font-medium transition ${
                  breathingPattern === 'energize' ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
                }`}
              >
                Energize
              </button>
            </div>

            {/* Visual Pacer Sphere */}
            <div className="py-6 flex flex-col items-center justify-center relative min-h-[220px]">
              <div
                className={`h-40 w-40 rounded-full bg-gradient-to-tr from-[#7C9082]/20 via-[#F2EDE4] to-[#B97A57]/20 border-2 border-[#7C9082]/40 shadow-sm flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out ${getPhaseScale()}`}
              >
                <span className="text-sm font-bold tracking-wider uppercase text-[#4D6354]">
                  {isBreathingActive ? breathPhase : 'Ready'}
                </span>
                {isBreathingActive && (
                  <span className="text-3xl font-black text-[#2D2A26] mt-1 font-mono">
                    {phaseSecondsLeft}s
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#E8E2D9]">
            <button
              id="btn-toggle-breathing"
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs transition ${
                isBreathingActive
                  ? 'bg-[#A36B73] hover:bg-[#8F5A62] text-white'
                  : 'bg-[#7C9082] hover:bg-[#6A7E70] text-white'
              }`}
            >
              {isBreathingActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isBreathingActive ? 'Pause Exercise' : 'Start Breathwork'}</span>
            </button>

            <button
              id="btn-reset-breathing"
              onClick={() => {
                setIsBreathingActive(false);
                setCyclesCompleted(0);
              }}
              className="p-2.5 rounded-xl bg-[#F2EDE4] text-[#8A817C] hover:text-[#2D2A26] border border-[#E8E2D9] transition"
              title="Reset Cycles"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Energy Management Protocol Library */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between text-[#3D3A35]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-[#2D2A26] text-base">Energy Management Protocols</h3>
                <p className="text-xs text-[#8A817C]">Scientifically proven rituals to stay in the positive upper quadrant</p>
              </div>
            </div>

            {/* Ritual Cards */}
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {rituals.map((r) => {
                const isSelected = selectedRitual?.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRitual(r)}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#B97A57] shadow-xs ring-1 ring-[#B97A57]/30'
                        : 'bg-[#FAF8F5]/60 border-[#E8E2D9] hover:border-[#D4CBBF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#2D2A26]">{r.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2EDE4] text-[#635E59] border border-[#E8E2D9]">
                          {r.durationMinutes} min • {r.elementalAffinity} Element
                        </span>
                      </div>
                      <span className="text-[10px] text-[#8F4E2C] font-semibold">{r.targetNeed}</span>
                    </div>
                    <p className="text-xs text-[#635E59] mt-1">{r.tagline}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Ritual Expanded Steps */}
          {selectedRitual && (
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] bg-[#FAF8F5] p-3.5 rounded-xl border text-xs">
              <span className="font-bold text-[#8F4E2C] uppercase tracking-wider text-[10px] block mb-1.5">
                Action Steps: {selectedRitual.title}
              </span>
              <ol className="list-decimal list-inside space-y-1 text-[#635E59]">
                {selectedRitual.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

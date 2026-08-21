import React, { useState } from 'react';
import { X, Zap, Sparkles, RefreshCw, Smile, Heart, Shield, Check, Flame } from 'lucide-react';
import { UserProfile } from '../types';

interface EnergyRebootModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

interface RebootResult {
  title: string;
  immediateStep: string;
  mindsetReframe: string;
  affirmation: string;
  microAction: string;
  roleAdvice: string;
}

export const EnergyRebootModal: React.FC<EnergyRebootModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  if (!isOpen) return null;

  const [currentMood, setCurrentMood] = useState<string>('Drained & Rushed');
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [trigger, setTrigger] = useState<string>('Midday context-switching and urgent meeting demands');
  const [context, setContext] = useState<'work' | 'transition' | 'home'>('work');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<RebootResult | null>(null);

  const handleRunReboot = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/energy-reboot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          currentMood,
          energyLevel,
          trigger,
          context: context === 'work' ? 'In middle of workday as Leader' : context === 'transition' ? 'About to transition home to Kids' : 'At home with family',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.data) {
          setResult(json.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('AI Reboot failed, using local reset:', e);
    }

    // Heuristic elemental fallback
    const isFire = userProfile.element === 'Fire';
    const isWater = userProfile.element === 'Water';
    const isEarth = userProfile.element === 'Earth';

    setResult({
      title: isFire ? 'Solar Center Grounding & Venting' : isWater ? 'Emotional Boundary Container' : isEarth ? 'Root Pacing & Somatic Shake' : 'Air Clarification Breath',
      immediateStep: 'Drop your shoulders, unclamp your jaw, and take 2 rapid inhales through your nose followed by a 6-second slow mouth exhale.',
      mindsetReframe: `As a ${userProfile.sunSign} (${userProfile.element} element), your nervous system is simply requesting a pause to digest cognitive input. This is not weakness; it is intelligent recalibration.`,
      affirmation: '"I am the unshakeable center of my day. Urgency is just external weather."',
      microAction: 'Drink a full glass of cold water and step outside for 60 seconds to look at the distant horizon.',
      roleAdvice: context === 'work'
        ? 'Lead with quiet conviction. Slow your speaking pace by 20% in your next interaction.'
        : 'Leave the problem-solving mindset at the doorway. Your presence is the present for your family.',
    });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8E2D9] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D9] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#7C9082]/15 border border-[#7C9082]/30 flex items-center justify-center text-[#4D6354]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#2D2A26] text-sm">Instant 2-Minute Energy Reboot</h3>
              <p className="text-[10px] text-[#8F4E2C]">Somatic & Astrological Positive State Reset</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {!result ? (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-[#3D3A35] mb-1">Current Context</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setContext('work')}
                    className={`py-2 rounded-lg font-medium text-center transition ${
                      context === 'work' ? 'bg-[#4A6B82]/15 text-[#4A6B82] border border-[#4A6B82]/30 font-semibold' : 'bg-[#FAF8F5] text-[#8A817C] border border-[#E8E2D9]'
                    }`}
                  >
                    At Work (Leader)
                  </button>
                  <button
                    type="button"
                    onClick={() => setContext('transition')}
                    className={`py-2 rounded-lg font-medium text-center transition ${
                      context === 'transition' ? 'bg-[#B97A57]/15 text-[#8F4E2C] border border-[#B97A57]/30 font-semibold' : 'bg-[#FAF8F5] text-[#8A817C] border border-[#E8E2D9]'
                    }`}
                  >
                    Switching Roles
                  </button>
                  <button
                    type="button"
                    onClick={() => setContext('home')}
                    className={`py-2 rounded-lg font-medium text-center transition ${
                      context === 'home' ? 'bg-[#7C9082]/15 text-[#4D6354] border border-[#7C9082]/30 font-semibold' : 'bg-[#FAF8F5] text-[#8A817C] border border-[#E8E2D9]'
                    }`}
                  >
                    At Home (Parent)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-[#3D3A35]">Current Energy Level</label>
                  <span className="font-bold text-[#8F4E2C]">{energyLevel} / 10</span>
                </div>
                <input
                  id="reboot-energy-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full accent-[#7C9082] cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3D3A35] mb-1">Current Mood / Feeling</label>
                <input
                  id="reboot-input-mood"
                  type="text"
                  value={currentMood}
                  onChange={(e) => setCurrentMood(e.target.value)}
                  placeholder="e.g. Irritable, foggy, overwhelmed, scattered..."
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3D3A35] mb-1">What triggered this?</label>
                <input
                  id="reboot-input-trigger"
                  type="text"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  placeholder="e.g. Demanding Slack ping, child tantrum, back-to-back zoom calls..."
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
                />
              </div>

              <button
                id="btn-run-energy-reboot"
                onClick={handleRunReboot}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#7C9082] hover:bg-[#6A7E70] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Synthesizing Elemental Reboot...' : 'Generate 2-Min Reset Protocol'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#B97A57]/40">
                <span className="text-[10px] uppercase font-bold text-[#8F4E2C] tracking-wider">
                  Protocol: {result.title}
                </span>
                <p className="text-sm font-bold text-[#2D2A26] mt-1">
                  1. Immediate Action (Do This Now):
                </p>
                <p className="text-[#3D3A35] mt-0.5 leading-relaxed">{result.immediateStep}</p>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9] space-y-2">
                <div>
                  <span className="font-bold text-[#4A6B82]">2. Cognitive Reframe:</span>
                  <p className="text-[#635E59] mt-0.5">{result.mindsetReframe}</p>
                </div>

                <div className="pt-2 border-t border-[#E8E2D9]">
                  <span className="font-bold text-[#4D6354]">3. Affirmative Anchor:</span>
                  <p className="text-[#2D2A26] italic mt-0.5">"{result.affirmation}"</p>
                </div>

                <div className="pt-2 border-t border-[#E8E2D9]">
                  <span className="font-bold text-[#8F4E2C]">4. Showing Up with Presence:</span>
                  <p className="text-[#635E59] mt-0.5">{result.roleAdvice}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D9]">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="text-[#8A817C] hover:text-[#2D2A26] text-xs transition"
                >
                  Start Over
                </button>
                <button
                  id="btn-reboot-done"
                  onClick={onClose}
                  className="bg-[#7C9082] hover:bg-[#6A7E70] text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition"
                >
                  I Feel Realigned & Ready
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

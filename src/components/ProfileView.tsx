import React, { useState } from 'react';
import {
  User,
  Sparkles,
  Save,
  Check,
  Briefcase,
  Heart,
  Clock,
  Flame,
  Globe,
} from 'lucide-react';
import { UserProfile, ZodiacSign, AstroElement, Chronotype } from '../types';
import { ZODIAC_REGISTRY, ELEMENT_MAP } from '../utils/astroEngine';

interface ProfileViewProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

const ALL_ZODIACS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSunSignChange = (sign: ZodiacSign) => {
    const element = ELEMENT_MAP[sign];
    setFormData((prev) => ({
      ...prev,
      sunSign: sign,
      element,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const sunData = ZODIAC_REGISTRY[formData.sunSign];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs text-[#3D3A35]">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-[#7C9082] flex items-center justify-center text-white font-bold text-xl shadow-xs">
            {sunData?.symbol || '♌'}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight">
              Astro-Leadership & Energy Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] mt-0.5">
              Customize your natal placements, chronotype energy curve, and dual-role intentions.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Astrological Chart Placements */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 text-[#3D3A35]">
          <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3">
            <Sparkles className="w-4 h-4 text-[#B97A57]" />
            <h3 className="font-bold text-[#2D2A26] text-sm">Astrological Natal Architecture</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Sun Sign */}
            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Sun Sign (Core Identity & Vitality)
              </label>
              <select
                id="profile-sun-sign"
                value={formData.sunSign}
                onChange={(e) => handleSunSignChange(e.target.value as ZodiacSign)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                {ALL_ZODIACS.map((s) => (
                  <option key={s} value={s}>
                    {s} ({ELEMENT_MAP[s]} Element)
                  </option>
                ))}
              </select>
            </div>

            {/* Moon Sign */}
            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Moon Sign (Emotional Resilience & Parenting)
              </label>
              <select
                id="profile-moon-sign"
                value={formData.moonSign}
                onChange={(e) => setFormData({ ...formData, moonSign: e.target.value as ZodiacSign })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                {ALL_ZODIACS.map((s) => (
                  <option key={s} value={s}>
                    {s} ({ELEMENT_MAP[s]})
                  </option>
                ))}
              </select>
            </div>

            {/* Rising Sign */}
            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Rising / Ascendant (Executive Persona)
              </label>
              <select
                id="profile-rising-sign"
                value={formData.risingSign}
                onChange={(e) => setFormData({ ...formData, risingSign: e.target.value as ZodiacSign })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                {ALL_ZODIACS.map((s) => (
                  <option key={s} value={s}>
                    {s} ({ELEMENT_MAP[s]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chronotype selection */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#3D3A35] mb-2">
              Biological Chronotype Peak
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Lion', 'Bear', 'Wolf', 'Dolphin'] as Chronotype[]).map((chrono) => {
                const isSelected = formData.chronotype === chrono;
                return (
                  <button
                    type="button"
                    key={chrono}
                    onClick={() => setFormData({ ...formData, chronotype: chrono })}
                    className={`p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#B97A57] shadow-xs ring-1 ring-[#B97A57]/30'
                        : 'bg-[#FAF8F5]/60 border-[#E8E2D9] hover:border-[#D4CBBF]'
                    }`}
                  >
                    <span className="font-bold text-xs text-[#8F4E2C] block">{chrono}</span>
                    <span className="text-[10px] text-[#635E59] mt-0.5 block">
                      {chrono === 'Lion' ? 'Early riser peak (6am-11am)' : chrono === 'Bear' ? 'Solar peak (9am-2pm)' : chrono === 'Wolf' ? 'Evening peak (3pm-9pm)' : 'Variable burst peak'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dual Roles & Schedule Boundaries */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 text-[#3D3A35]">
          <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3">
            <Briefcase className="w-4 h-4 text-[#4A6B82]" />
            <h3 className="font-bold text-[#2D2A26] text-sm">Dual Roles & Transition Boundaries</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Full Name
              </label>
              <input
                id="profile-input-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Work Leadership Role Title
              </label>
              <input
                id="profile-input-work-role"
                type="text"
                value={formData.workRole}
                onChange={(e) => setFormData({ ...formData, workRole: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                Family & Home Role Description
              </label>
              <input
                id="profile-input-family-role"
                type="text"
                value={formData.familyRole}
                onChange={(e) => setFormData({ ...formData, familyRole: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D3A35] mb-1">
                5:30 PM Switchover Target Time
              </label>
              <input
                id="profile-input-work-end-time"
                type="time"
                value={formData.workEndTime}
                onChange={(e) => setFormData({ ...formData, workEndTime: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs text-[#4D6354] font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" />
              Profile changes saved successfully!
            </span>
          )}

          <button
            id="btn-save-profile"
            type="submit"
            className="flex items-center gap-2 bg-[#7C9082] hover:bg-[#6A7E70] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Astro Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

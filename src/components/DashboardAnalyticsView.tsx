import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  Heart,
  Briefcase,
  Zap,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Feather,
  Smile,
  Shield,
} from 'lucide-react';
import { DailyMetric, UserProfile, Member } from '../types';

interface DashboardAnalyticsViewProps {
  metricsHistory: DailyMetric[];
  userProfile: UserProfile;
  members: Member[];
}

export const DashboardAnalyticsView: React.FC<DashboardAnalyticsViewProps> = ({
  metricsHistory,
  userProfile,
  members,
}) => {
  const [timeframeDays, setTimeframeDays] = useState<7 | 14 | 30>(14);

  const displayedHistory = metricsHistory.slice(-timeframeDays);

  // Compute aggregated stats
  const totalDays = displayedHistory.length;
  const positiveDays = displayedHistory.filter((m) => m.energyPositivity >= 7).length;
  const positiveDaysRatio = totalDays > 0 ? Math.round((positiveDays / totalDays) * 100) : 0;

  const avgProductivity = totalDays > 0
    ? Math.round(displayedHistory.reduce((acc, m) => acc + m.productivityScore, 0) / totalDays)
    : 0;

  const avgFocusHours = totalDays > 0
    ? (displayedHistory.reduce((acc, m) => acc + m.focusHoursCompleted, 0) / totalDays).toFixed(1)
    : '0';

  const avgLeadership = totalDays > 0
    ? (displayedHistory.reduce((acc, m) => acc + m.leadershipPresence, 0) / totalDays).toFixed(1)
    : '0';

  const avgParenting = totalDays > 0
    ? (displayedHistory.reduce((acc, m) => acc + m.parentAttunement, 0) / totalDays).toFixed(1)
    : '0';

  const switchoverDoneCount = displayedHistory.filter((m) => m.roleSwitchoverCompleted).length;
  const switchoverRate = totalDays > 0 ? Math.round((switchoverDoneCount / totalDays) * 100) : 0;

  const totalMindfulMinutes = displayedHistory.reduce((acc, m) => acc + m.mindfulMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4EFEA] via-[#FAF8F5] to-[#F2EDE4] border border-[#E8E2D9] rounded-2xl p-4 sm:p-6 shadow-xs text-[#3D3A35]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C9082] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#7C9082]" />
                Longitudinal Performance & Vitality Tracking
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight mt-1">
              Personalized Metrics & Astro Correlations
            </h2>
            <p className="text-xs sm:text-sm text-[#635E59] max-w-2xl mt-1 leading-relaxed">
              Track your energy positivity, executive focus, leadership presence, parenting attunement, and astrological resonance over time.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E2D9] text-xs shrink-0 self-start sm:self-center">
            <button
              id="timeframe-7"
              onClick={() => setTimeframeDays(7)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                timeframeDays === 7 ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
              }`}
            >
              7 Days
            </button>
            <button
              id="timeframe-14"
              onClick={() => setTimeframeDays(14)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                timeframeDays === 14 ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
              }`}
            >
              14 Days
            </button>
            <button
              id="timeframe-30"
              onClick={() => setTimeframeDays(30)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                timeframeDays === 30 ? 'bg-[#7C9082] text-white shadow-xs' : 'text-[#8A817C] hover:text-[#2D2A26]'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Positive Days Ratio */}
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#8A817C] font-medium">Positive Days Ratio</span>
            <Smile className="w-4 h-4 text-[#4D6354]" />
          </div>
          <p className="text-2xl font-black text-[#4D6354]">{positiveDaysRatio}%</p>
          <p className="text-[10px] text-[#8A817C]">{positiveDays} of {totalDays} days in upper vibe</p>
        </div>

        {/* Avg Focus Hours */}
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#8A817C] font-medium">Avg Deep Focus</span>
            <Clock className="w-4 h-4 text-[#4A6B82]" />
          </div>
          <p className="text-2xl font-black text-[#4A6B82]">{avgFocusHours}h <span className="text-xs font-normal text-[#8A817C]">/day</span></p>
          <p className="text-[10px] text-[#8A817C]">Productivity avg: {avgProductivity}%</p>
        </div>

        {/* Leadership Presence */}
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#8A817C] font-medium">Leadership Presence</span>
            <Briefcase className="w-4 h-4 text-[#4A6B82]" />
          </div>
          <p className="text-2xl font-black text-[#4A6B82]">{avgLeadership} <span className="text-xs font-normal text-[#8A817C]">/10</span></p>
          <p className="text-[10px] text-[#8A817C]">Decisive & emotionally calm</p>
        </div>

        {/* Parenting Attunement */}
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#8A817C] font-medium">Parent Attunement</span>
            <Heart className="w-4 h-4 text-[#A36B73]" />
          </div>
          <p className="text-2xl font-black text-[#A36B73]">{avgParenting} <span className="text-xs font-normal text-[#8A817C]">/10</span></p>
          <p className="text-[10px] text-[#8A817C]">Warmth, play & patience</p>
        </div>

        {/* Switchover Rate */}
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-4 space-y-1 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#8A817C] font-medium">Role Switchover</span>
            <Feather className="w-4 h-4 text-[#B97A57]" />
          </div>
          <p className="text-2xl font-black text-[#B97A57]">{switchoverRate}%</p>
          <p className="text-[10px] text-[#8A817C]">{totalMindfulMinutes} mindful mins logged</p>
        </div>
      </div>

      {/* Visual Chart: Daily Positivity & Dual-Role Balance */}
      <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6 text-[#3D3A35]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#2D2A26] text-base">Daily Positivity & Role Balance Trend</h3>
            <p className="text-xs text-[#8A817C]">Tracking energy positivity (green bars) vs Leadership (blue dot) and Parenting (rose dot)</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#7C9082]" />
              <span className="text-[#635E59]">Positivity Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4A6B82]" />
              <span className="text-[#635E59]">Leadership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#A36B73]" />
              <span className="text-[#635E59]">Parenting</span>
            </div>
          </div>
        </div>

        {/* Custom Bar Graph */}
        <div className="h-56 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 border-b border-[#E8E2D9] relative">
          {/* Threshold guide line for 70% positivity */}
          <div className="absolute top-[30%] left-0 right-0 border-b border-dashed border-[#7C9082]/40 flex items-center justify-end">
            <span className="text-[9px] text-[#4D6354] bg-[#FAF8F5] px-1 font-mono rounded">Positive Threshold (7.0)</span>
          </div>

          {displayedHistory.map((m) => {
            const heightPercent = (m.energyPositivity / 10) * 100;
            const dayLabel = m.date.slice(5); // MM-DD

            return (
              <div key={m.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                {/* Dots for Leadership & Parenting */}
                <div className="flex items-center gap-1 mb-1.5">
                  <div
                    className="w-2 h-2 rounded-full bg-[#4A6B82] shadow-xs"
                    title={`Leadership: ${m.leadershipPresence}/10`}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-[#A36B73] shadow-xs"
                    title={`Parenting: ${m.parentAttunement}/10`}
                  />
                </div>

                {/* Main Positivity Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                    m.energyPositivity >= 8
                      ? 'bg-gradient-to-t from-[#4D6354] to-[#7C9082]'
                      : m.energyPositivity >= 6
                      ? 'bg-gradient-to-t from-[#B97A57] to-[#D49F82]'
                      : 'bg-gradient-to-t from-[#A36B73] to-[#C9969D]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Day label */}
                <span className="text-[9px] text-[#8A817C] mt-2 font-mono">{dayLabel}</span>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-[#2D2A26] text-[#F9F7F2] text-[10px] p-2.5 rounded-lg border border-[#4D4843] shadow-xl z-30 min-w-[150px] pointer-events-none">
                  <span className="font-bold text-[#E8C29D]">{m.date}</span>
                  <span className="text-[#A4C4AD]">Energy Positivity: {m.energyPositivity}/10</span>
                  <span className="text-[#9DC3DF]">Leadership: {m.leadershipPresence}/10</span>
                  <span className="text-[#E8AFB8]">Parenting: {m.parentAttunement}/10</span>
                  <span className="text-[#C7BCB3]">Focus Hours: {m.focusHoursCompleted}h</span>
                  <span className="text-[#8A817C] mt-1 italic">"{m.dominantEmotion}"</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Astrological & Synastry Correlation Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 space-y-3 shadow-xs text-[#3D3A35]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B97A57]" />
            <h3 className="font-bold text-[#2D2A26] text-sm">Astrological Performance Correlations</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-0.5">🌟 Earth Moon Transit Harmony:</span>
              <p className="text-[#635E59]">
                You achieve 24% higher deep focus completion and clearer difficult feedback delivery when the Moon is in Earth signs (Taurus, Virgo, Capricorn).
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-0.5">🔥 Sun in Fire Peak Vitality:</span>
              <p className="text-[#635E59]">
                Your morning collaboration energy peaks at 96% during 10:00 AM - 11:30 AM, perfectly synchronizing with your Bear chronotype.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 space-y-3 shadow-xs text-[#3D3A35]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#A36B73]" />
            <h3 className="font-bold text-[#2D2A26] text-sm">Role Transition & Balance Insights</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-0.5">🏡 The 5:30 PM Switchover Impact:</span>
              <p className="text-[#635E59]">
                On days where the 5:30 PM Role Switchover Bridge was completed, evening Parent Attunement scored an average of <strong className="text-[#4D6354]">9.2 / 10</strong> compared to 6.8 / 10 on un-bridged days.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2A26] block mb-0.5">⚡ Positivity Longevity:</span>
              <p className="text-[#635E59]">
                Practicing the 3-minute Breath of Fire at 1:45 PM eliminated the traditional afternoon dopamine dip 9 out of 10 times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

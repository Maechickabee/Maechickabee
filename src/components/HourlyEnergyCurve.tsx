import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  ChevronDown,
  Check,
  Users,
  Briefcase,
  Home,
  Sparkles,
  X,
  UserPlus,
  Info,
  Filter,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AstrologicalTransit, Member, UserProfile } from '../types';
import { getMemberColor, getMemberHourlyEnergy, ELEMENT_MAP } from '../utils/astroEngine';

interface HourlyEnergyCurveProps {
  transit: AstrologicalTransit;
  userProfile: UserProfile;
  members: Member[];
  onOpenInviteModal?: () => void;
}

export const HourlyEnergyCurve: React.FC<HourlyEnergyCurveProps> = ({
  transit,
  userProfile,
  members,
  onOpenInviteModal,
}) => {
  // Pre-select first 2 members by default (e.g. 1 team, 1 family) so user immediately sees comparison lines!
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(() => {
    const defaultIds: string[] = [];
    const firstTeam = members.find((m) => m.type === 'team');
    const firstFam = members.find((m) => m.type === 'family');
    if (firstTeam) defaultIds.push(firstTeam.id);
    if (firstFam) defaultIds.push(firstFam.id);
    return defaultIds;
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(800);

  // Measure chart container width on resize for exact SVG coordinate alignment
  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (type?: 'team' | 'family') => {
    if (!type) {
      setSelectedMemberIds(members.map((m) => m.id));
    } else {
      const typeIds = members.filter((m) => m.type === type).map((m) => m.id);
      setSelectedMemberIds((prev) => Array.from(new Set([...prev, ...typeIds])));
    }
  };

  const handleClearAll = (type?: 'team' | 'family') => {
    if (!type) {
      setSelectedMemberIds([]);
    } else {
      const typeIds = new Set(members.filter((m) => m.type === type).map((m) => m.id));
      setSelectedMemberIds((prev) => prev.filter((id) => !typeIds.has(id)));
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.zodiacSign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teamMembers = filteredMembers.filter((m) => m.type === 'team');
  const familyMembers = filteredMembers.filter((m) => m.type === 'family');

  const selectedMembers = members.filter((m) => selectedMemberIds.includes(m.id));

  // Chart dimensions & calculations
  const hours = transit.hourlyVibeCurve;
  const numSlots = hours.length; // 17 slots (6 AM to 10 PM)
  const chartHeight = 100; // SVG viewBox height in % or px

  // Calculate coordinates for line charts
  const getXCoordinate = (index: number) => {
    // Center of each slot column in SVG percentage (0 to 100)
    const slotWidth = 100 / numSlots;
    return slotWidth * index + slotWidth / 2;
  };

  const getYCoordinate = (energyScore: number) => {
    // 0 to 100 energy score maps to chart height (100% at bottom, 0% at top with padding)
    const padding = 12; // top/bottom buffer
    const usableHeight = chartHeight - padding * 2;
    return chartHeight - padding - (energyScore / 100) * usableHeight;
  };

  // Generate SVG path for a member
  const generateLinePath = (member: Member) => {
    const points = hours.map((slot, idx) => {
      const energy = getMemberHourlyEnergy(member, slot.hour, transit);
      return {
        x: getXCoordinate(idx),
        y: getYCoordinate(energy),
      };
    });

    if (points.length === 0) return '';

    // Smooth Bezier path curve
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX},${p0.y} ${cpX},${p1.y} ${p1.x},${p1.y}`;
    }
    return path;
  };

  // Calculate highest harmonic sync slot with selected members
  const bestHarmonicSlot = React.useMemo(() => {
    if (selectedMembers.length === 0) return null;

    let bestScore = -1;
    let bestSlot = hours[0];

    hours.forEach((slot) => {
      const userVal = slot.energyPotential;
      const memberVals = selectedMembers.map((m) =>
        getMemberHourlyEnergy(m, slot.hour, transit)
      );
      const avgMember = memberVals.reduce((a, b) => a + b, 0) / memberVals.length;
      const combinedHarmony = (userVal + avgMember) / 2 - Math.abs(userVal - avgMember) * 0.3;
      if (combinedHarmony > bestScore) {
        bestScore = combinedHarmony;
        bestSlot = slot;
      }
    });

    return {
      slot: bestSlot,
      score: Math.round(bestScore),
    };
  }, [hours, selectedMembers, transit]);

  return (
    <div className="mt-5 pt-4 border-t border-[#E8E2D9] space-y-3">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A817C] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#B97A57]" />
            Hourly Astrological Energy & Focus Curve
          </span>
          <span className="text-[10px] text-[#5C6B73] font-semibold bg-[#5C6B73]/10 px-2 py-0.5 rounded-full border border-[#5C6B73]/20">
            Bars: You • Lines: Circle
          </span>
        </div>

        {/* Member Multi-Select Dropdown & Invite Button */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Multi-Select Dropdown Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="btn-toggle-member-compare-dropdown"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white hover:bg-[#F2EDE4] text-[#2D2A26] border border-[#E8E2D9] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Users className="w-3.5 h-3.5 text-[#B97A57]" />
              <span>
                Compare Energy ({selectedMemberIds.length} Selected)
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8A817C] transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Popover */}
            {isDropdownOpen && (
              <div
                id="dropdown-compare-members-menu"
                className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl shadow-xl z-50 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150 text-[#3D3A35]"
              >
                {/* Dropdown Header */}
                <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#2D2A26]">
                      Select Circle Members
                    </h4>
                    <p className="text-[10px] text-[#8A817C]">
                      Multi-select people to overlay comparison lines
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleSelectAll()}
                      className="text-[#B97A57] font-semibold hover:underline px-1 py-0.5"
                    >
                      Select All
                    </button>
                    <span className="text-[#D8D0C5]">•</span>
                    <button
                      type="button"
                      onClick={() => handleClearAll()}
                      className="text-[#8A817C] hover:text-[#2D2A26] hover:underline px-1 py-0.5"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, role, or zodiac sign..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2A26] placeholder-[#A8A096] focus:outline-hidden focus:border-[#B97A57]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-[#8A817C] hover:text-[#2D2A26]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Member Group Lists */}
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                  {/* Team Members Section */}
                  {teamMembers.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#4A6B82] mb-1.5 px-1">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          Team Members ({teamMembers.length})
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-normal normal-case">
                          <button
                            type="button"
                            onClick={() => handleSelectAll('team')}
                            className="hover:underline text-[#4A6B82] font-semibold"
                          >
                            All Team
                          </button>
                          <span>/</span>
                          <button
                            type="button"
                            onClick={() => handleClearAll('team')}
                            className="hover:underline text-[#8A817C]"
                          >
                            None
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {teamMembers.map((member, idx) => {
                          const isSelected = selectedMemberIds.includes(member.id);
                          const memberColor = getMemberColor(member, members.indexOf(member));
                          return (
                            <div
                              key={member.id}
                              onClick={() => toggleMemberSelection(member.id)}
                              className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition ${
                                isSelected
                                  ? 'bg-white border-[#B97A57]/40 shadow-xs'
                                  : 'bg-white/60 border-transparent hover:bg-white hover:border-[#E8E2D9]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {/* Color Swatch Dot */}
                                <span
                                  className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white shadow-2xs"
                                  style={{ backgroundColor: memberColor }}
                                />
                                <div className="truncate">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-[#2D2A26] truncate">
                                      {member.name}
                                    </span>
                                    <span className="text-[10px] text-[#635E59] font-medium">
                                      ({member.zodiacSign})
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#8A817C] block truncate">
                                    {member.role}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                <span
                                  className="w-3.5 h-0.5 rounded-full"
                                  style={{ backgroundColor: memberColor }}
                                />
                                <div
                                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                                    isSelected
                                      ? 'bg-[#B97A57] border-[#B97A57] text-white'
                                      : 'border-[#D8D0C5] bg-white'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Family Members Section */}
                  {familyMembers.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#7C9082] mb-1.5 px-1 pt-1">
                        <span className="flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          Family Members ({familyMembers.length})
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-normal normal-case">
                          <button
                            type="button"
                            onClick={() => handleSelectAll('family')}
                            className="hover:underline text-[#7C9082] font-semibold"
                          >
                            All Family
                          </button>
                          <span>/</span>
                          <button
                            type="button"
                            onClick={() => handleClearAll('family')}
                            className="hover:underline text-[#8A817C]"
                          >
                            None
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {familyMembers.map((member, idx) => {
                          const isSelected = selectedMemberIds.includes(member.id);
                          const memberColor = getMemberColor(member, members.indexOf(member));
                          return (
                            <div
                              key={member.id}
                              onClick={() => toggleMemberSelection(member.id)}
                              className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition ${
                                isSelected
                                  ? 'bg-white border-[#B97A57]/40 shadow-xs'
                                  : 'bg-white/60 border-transparent hover:bg-white hover:border-[#E8E2D9]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white shadow-2xs"
                                  style={{ backgroundColor: memberColor }}
                                />
                                <div className="truncate">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-[#2D2A26] truncate">
                                      {member.name}
                                    </span>
                                    <span className="text-[10px] text-[#635E59] font-medium">
                                      ({member.zodiacSign})
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#8A817C] block truncate">
                                    {member.role}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                <span
                                  className="w-3.5 h-0.5 rounded-full"
                                  style={{ backgroundColor: memberColor }}
                                />
                                <div
                                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                                    isSelected
                                      ? 'bg-[#B97A57] border-[#B97A57] text-white'
                                      : 'border-[#D8D0C5] bg-white'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {filteredMembers.length === 0 && (
                    <div className="text-center py-6 text-xs text-[#8A817C]">
                      No members match "{searchQuery}"
                    </div>
                  )}
                </div>

                {/* Footer Invite Trigger in Dropdown */}
                {onOpenInviteModal && (
                  <div className="pt-2 border-t border-[#E8E2D9]">
                    <button
                      id="btn-dropdown-invite-circle"
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenInviteModal();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#F2EDE4] hover:bg-[#E8E2D9] text-[#2D2A26] text-xs font-semibold py-1.5 rounded-lg transition"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-[#B97A57]" />
                      <span>Invite New Team / Family Member</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Invite Button */}
          {onOpenInviteModal && (
            <button
              id="btn-curve-invite-member"
              type="button"
              onClick={onOpenInviteModal}
              className="flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#8F4E2C] border border-[#B97A57]/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#B97A57]" />
              <span>+ Invite</span>
            </button>
          )}
        </div>
      </div>

      {/* Selected Members Legend & Toggle Chips */}
      {selectedMembers.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 bg-white/80 p-2 rounded-xl border border-[#E8E2D9]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A817C] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#B97A57]" />
            Comparing with:
          </span>

          {/* User badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F2EDE4] border border-[#E8E2D9] text-xs font-semibold text-[#2D2A26]">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#7C9082] shadow-2xs" />
            <span>You ({userProfile.name.split(' ')[0]})</span>
            <span className="text-[10px] text-[#8A817C] font-mono">[BARS]</span>
          </div>

          {/* Member chips */}
          {selectedMembers.map((member) => {
            const memberColor = getMemberColor(member, members.indexOf(member));
            const isHovered = hoveredMemberId === member.id;
            return (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                className={`inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg text-xs font-medium border transition ${
                  isHovered
                    ? 'bg-[#FAF8F5] border-[#B97A57] shadow-xs'
                    : 'bg-white border-[#E8E2D9] hover:bg-[#F9F7F2]'
                }`}
              >
                {/* Line swatch indicator */}
                <span
                  className="w-3.5 h-1 rounded-full shadow-2xs"
                  style={{ backgroundColor: memberColor }}
                />
                <span className="font-semibold text-[#2D2A26]">
                  {member.name}
                </span>
                <span className="text-[10px] text-[#8A817C]">
                  ({member.zodiacSign})
                </span>
                <button
                  type="button"
                  onClick={() => toggleMemberSelection(member.id)}
                  className="p-0.5 text-[#8A817C] hover:text-[#A36B73] rounded-md transition ml-0.5"
                  title={`Remove ${member.name} from comparison`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Chart Container: User Bars + Member SVG Line Overlay */}
      <div
        ref={chartContainerRef}
        className="relative bg-[#F2EDE4]/70 p-2 sm:p-3 rounded-2xl border border-[#E8E2D9] overflow-hidden"
      >
        {/* SVG Overlay Layer for Member Lines */}
        <div className="absolute inset-x-2 sm:inset-x-3 top-2 sm:top-3 bottom-8 pointer-events-none z-20">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Subtle line drop shadows */}
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Render each selected member's comparison line */}
            {selectedMembers.map((member) => {
              const memberColor = getMemberColor(member, members.indexOf(member));
              const linePath = generateLinePath(member);
              const isHovered = hoveredMemberId === member.id;

              return (
                <g key={member.id} className="transition-opacity duration-200">
                  {/* Outer glow stroke */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={memberColor}
                    strokeWidth={isHovered ? 4.5 : 2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={hoveredMemberId && !isHovered ? 0.35 : 0.95}
                    filter="url(#line-glow)"
                    className="transition-all duration-200"
                  />

                  {/* Marker Circles on each hour node */}
                  {hours.map((slot, idx) => {
                    const energy = getMemberHourlyEnergy(member, slot.hour, transit);
                    const cx = getXCoordinate(idx);
                    const cy = getYCoordinate(energy);
                    const isHourHovered = hoveredHour === slot.hour;

                    return (
                      <circle
                        key={slot.hour}
                        cx={`${cx}%`}
                        cy={`${cy}%`}
                        r={isHourHovered || isHovered ? 4.5 : 2.5}
                        fill={memberColor}
                        stroke="#FFFFFF"
                        strokeWidth={1.5}
                        opacity={hoveredMemberId && !isHovered ? 0.35 : 1}
                        className="transition-all duration-150"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* User Bars Grid (17 Hourly Slots) */}
        <div className="grid grid-cols-8 sm:grid-cols-17 gap-1 sm:gap-1.5 relative z-10">
          {hours.map((slot, idx) => {
            const heightPct = slot.energyPotential;
            const isCollabPeak = slot.collaborationHarmony >= 90;
            const isConfrontationSafe = slot.confrontationSafety >= 85;
            const isHovered = hoveredHour === slot.hour;

            return (
              <div
                key={slot.hour}
                onMouseEnter={() => setHoveredHour(slot.hour)}
                onMouseLeave={() => setHoveredHour(null)}
                className={`group relative flex flex-col items-center justify-end h-28 sm:h-32 min-w-[32px] p-1 rounded-xl transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-[#E8E2D9]/90 shadow-xs ring-1 ring-[#B97A57]'
                    : 'hover:bg-[#E8E2D9]/60'
                }`}
              >
                {/* Hourly Bar Height */}
                <div className="w-full flex items-end justify-center h-20 sm:h-22 relative">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isCollabPeak
                        ? 'bg-[#7C9082]'
                        : isConfrontationSafe
                        ? 'bg-[#B97A57]'
                        : 'bg-[#C5BCB0]'
                    } ${isHovered ? 'brightness-105' : 'opacity-85'}`}
                    style={{ height: `${heightPct}%` }}
                  />

                  {/* Top Bar Value Marker on hover */}
                  {isHovered && (
                    <div className="absolute -top-5 text-[10px] font-bold text-[#2D2A26] bg-white px-1 rounded shadow-2xs">
                      {heightPct}%
                    </div>
                  )}
                </div>

                {/* Hour Label */}
                <div className="text-center mt-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#3D3A35] block leading-none">
                    {slot.label.split(' ')[0]}
                  </span>
                  <span className="text-[8px] text-[#8A817C] block uppercase font-medium">
                    {slot.label.split(' ')[1]}
                  </span>
                </div>

                {/* Hover Comparison Tooltip (Showing Bars for You, Lines for Members) */}
                {isHovered && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col bg-[#2D2A26] text-[#F9F7F2] text-xs p-3 rounded-xl border border-[#4D4740] shadow-xl z-50 min-w-[210px] max-w-xs pointer-events-none animate-in fade-in zoom-in-95 duration-100">
                    {/* Tooltip Header */}
                    <div className="border-b border-[#4D4740] pb-1.5 mb-2 flex items-center justify-between">
                      <span className="font-bold text-[#E8C4A2]">
                        {slot.label} • {slot.idealFocus}
                      </span>
                      <span className="text-[10px] text-[#A8A096]">
                        Transit Peak
                      </span>
                    </div>

                    {/* User's Energy Level (Bar) */}
                    <div className="flex items-center justify-between gap-3 text-[11px] py-1 border-b border-[#3D3730]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#7C9082]" />
                        <span className="font-semibold text-white">
                          You (Alex Morgan):
                        </span>
                      </div>
                      <span className="font-bold text-[#A3D1BE] font-mono">
                        {slot.energyPotential}% [Bar]
                      </span>
                    </div>

                    {/* Selected Members' Energy Levels (Lines) */}
                    {selectedMembers.length > 0 && (
                      <div className="space-y-1 pt-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#A8A096] block">
                          Circle Comparison [Lines]:
                        </span>
                        {selectedMembers.map((member) => {
                          const mEnergy = getMemberHourlyEnergy(member, slot.hour, transit);
                          const mColor = getMemberColor(member, members.indexOf(member));
                          const diff = mEnergy - slot.energyPotential;

                          return (
                            <div
                              key={member.id}
                              className="flex items-center justify-between gap-2 text-[10px]"
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <span
                                  className="w-2.5 h-1 rounded-full shrink-0"
                                  style={{ backgroundColor: mColor }}
                                />
                                <span className="text-[#E8E2D9] truncate">
                                  {member.name}:
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 font-mono">
                                <span className="font-bold" style={{ color: mColor }}>
                                  {mEnergy}%
                                </span>
                                <span
                                  className={`text-[9px] ${
                                    Math.abs(diff) <= 6
                                      ? 'text-[#A3D1BE]'
                                      : diff > 0
                                      ? 'text-[#E8C4A2]'
                                      : 'text-[#D8D0C5]'
                                  }`}
                                >
                                  ({diff >= 0 ? `+${diff}` : diff}%)
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Hourly Vibe Tags */}
                    <div className="pt-2 mt-1.5 border-t border-[#3D3730] flex items-center justify-between text-[9px] text-[#C5BCB0]">
                      <span>Collab Harmony: {slot.collaborationHarmony}%</span>
                      <span>Safe Dialogue: {slot.confrontationSafety}%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Collective Energy Sync Insight Box */}
      {selectedMembers.length > 0 && bestHarmonicSlot && (
        <div className="bg-white p-3 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#B97A57]/15 text-[#8F4E2C] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#2D2A26]">
                Optimal Collective Peak Window:
              </span>{' '}
              <span className="text-[#635E59]">
                {bestHarmonicSlot.slot.label} ({bestHarmonicSlot.slot.idealFocus}) with{' '}
                <strong className="text-[#8F4E2C]">{bestHarmonicSlot.score}% synchrony</strong> across selected circle members.
              </span>
            </div>
          </div>

          <span className="text-[10px] text-[#7C9082] font-bold uppercase tracking-wider bg-[#7C9082]/15 px-2.5 py-1 rounded-full border border-[#7C9082]/25 self-start sm:self-center shrink-0">
            Harmonic Synergy Active
          </span>
        </div>
      )}
    </div>
  );
};

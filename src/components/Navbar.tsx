import React from 'react';
import {
  Calendar,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Home,
  Layers,
  Heart,
  User,
  Activity,
  UserPlus,
} from 'lucide-react';
import { AstrologicalTransit, UserProfile } from '../types';

interface NavbarProps {
  currentDate: string;
  onDateChange: (newDate: string) => void;
  transit: AstrologicalTransit;
  userProfile: UserProfile;
  activeTab: 'schedule' | 'synastry' | 'roles' | 'mindfulness' | 'analytics' | 'profile';
  onTabChange: (tab: 'schedule' | 'synastry' | 'roles' | 'mindfulness' | 'analytics' | 'profile') => void;
  activeRoleFilter: 'all' | 'work_leader' | 'home_parent';
  onRoleFilterChange: (filter: 'all' | 'work_leader' | 'home_parent') => void;
  todayPositivityScore: number;
  onOpenEnergyReboot: () => void;
  onOpenInviteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDate,
  onDateChange,
  transit,
  userProfile,
  activeTab,
  onTabChange,
  activeRoleFilter,
  onRoleFilterChange,
  todayPositivityScore,
  onOpenEnergyReboot,
  onOpenInviteModal,
}) => {
  const handleShiftDate = (days: number) => {
    const d = new Date(currentDate + 'T12:00:00');
    d.setDate(d.getDate() + days);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const isToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    return currentDate === todayStr;
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] text-[#3D3A35] shadow-xs">
      {/* Top Bar: Brand, Astro Status, Date, Quick Reboot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo & Astrological Badge */}
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl bg-[#B97A57] p-0.5 shadow-xs flex items-center justify-center cursor-pointer transition hover:opacity-90"
              onClick={() => onTabChange('schedule')}
            >
              <div className="h-full w-full bg-[#FAF8F5] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#B97A57]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#2D2A26]">
                  AstroFlow
                </span>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#B97A57]/15 text-[#8F4E2C] border border-[#B97A57]/25">
                  Leadership & Daily Sync
                </span>
              </div>
              <p className="text-xs text-[#8A817C] flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="text-[#B97A57]">☽ Moon in {transit.moonSign}</span>
                <span className="text-[#D8D0C5]">•</span>
                <span>{transit.moonPhase}</span>
                <span className="text-[#D8D0C5]">•</span>
                <span className="text-[#7C9082]">{transit.dominantElement} Element</span>
              </p>
            </div>
          </div>

          {/* Date Selector & Positivity Battery */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Date Nav */}
            <div className="flex items-center bg-[#F2EDE4] rounded-lg p-1 border border-[#E8E2D9]">
              <button
                id="btn-date-prev"
                onClick={() => handleShiftDate(-1)}
                className="p-1 rounded text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#E8E2D9] transition"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-2.5 flex items-center gap-1.5 text-xs font-medium text-[#3D3A35] min-w-[110px] justify-center">
                <Calendar className="w-3.5 h-3.5 text-[#B97A57]" />
                <span>{formatDateDisplay(currentDate)}</span>
              </div>
              <button
                id="btn-date-next"
                onClick={() => handleShiftDate(1)}
                className="p-1 rounded text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#E8E2D9] transition"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {!isToday() && (
                <button
                  id="btn-date-today"
                  onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
                  className="ml-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-[#B97A57] text-white hover:bg-[#A66947] transition shadow-xs"
                >
                  Today
                </button>
              )}
            </div>

            {/* Positivity Meter */}
            <div className="flex items-center gap-2 bg-[#F2EDE4] px-3 py-1.5 rounded-lg border border-[#E8E2D9]" title="Today's Positive Energy Score">
              <Activity className="w-4 h-4 text-[#7C9082]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[#8A817C] uppercase tracking-wider font-semibold">Energy Vibe</span>
                <span className="text-xs font-bold text-[#4D6354]">{todayPositivityScore * 10}% Positive</span>
              </div>
              <div className="w-10 bg-[#E8E2D9] h-2 rounded-full overflow-hidden ml-1">
                <div
                  className="bg-[#7C9082] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, todayPositivityScore * 10)}%` }}
                />
              </div>
            </div>

            {/* Invite Team & Family Members Button */}
            <button
              id="btn-navbar-invite-circle"
              onClick={onOpenInviteModal}
              className="flex items-center gap-1.5 bg-[#4A6B82] hover:bg-[#3B576C] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition transform active:scale-95"
              title="Invite team members and family members to compare energy curves"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Members</span>
            </button>

            {/* Instant AI Energy Reboot */}
            <button
              id="btn-quick-energy-reboot"
              onClick={onOpenEnergyReboot}
              className="flex items-center gap-1.5 bg-[#B97A57] hover:bg-[#A66947] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition transform active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>2-Min Reset</span>
            </button>
          </div>
        </div>

        {/* Sub-bar: Main Navigation Tabs & Role Focus Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-[#E8E2D9] pt-1.5 pb-2 gap-2">
          {/* Main Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 text-xs">
            <button
              id="nav-tab-schedule"
              onClick={() => onTabChange('schedule')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'schedule'
                  ? 'bg-[#B97A57] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Schedule</span>
            </button>

            <button
              id="nav-tab-synastry"
              onClick={() => onTabChange('synastry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'synastry'
                  ? 'bg-[#4A6B82] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Astro Synastry & Timing</span>
            </button>

            <button
              id="nav-tab-roles"
              onClick={() => onTabChange('roles')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'roles'
                  ? 'bg-[#A36B73] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Leader & Parent Roles</span>
            </button>

            <button
              id="nav-tab-mindfulness"
              onClick={() => onTabChange('mindfulness')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'mindfulness'
                  ? 'bg-[#7C9082] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Energy & Mindfulness</span>
            </button>

            <button
              id="nav-tab-analytics"
              onClick={() => onTabChange('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'analytics'
                  ? 'bg-[#706B82] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Tracked Dashboard</span>
            </button>

            <button
              id="nav-tab-profile"
              onClick={() => onTabChange('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === 'profile'
                  ? 'bg-[#3D3A35] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35] hover:bg-[#F2EDE4]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Astro Profile</span>
            </button>
          </nav>

          {/* Role Filter Buttons */}
          <div className="flex items-center self-end sm:self-center bg-[#F2EDE4] p-0.5 rounded-lg border border-[#E8E2D9] text-[11px]">
            <button
              id="role-filter-all"
              onClick={() => onRoleFilterChange('all')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition ${
                activeRoleFilter === 'all'
                  ? 'bg-white text-[#2D2A26] shadow-xs border border-[#E8E2D9]'
                  : 'text-[#8A817C] hover:text-[#3D3A35]'
              }`}
            >
              <Layers className="w-3 h-3 text-[#B97A57]" />
              <span>Unified Flow</span>
            </button>
            <button
              id="role-filter-work"
              onClick={() => onRoleFilterChange('work_leader')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition ${
                activeRoleFilter === 'work_leader'
                  ? 'bg-[#4A6B82] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35]'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>Work Leader</span>
            </button>
            <button
              id="role-filter-home"
              onClick={() => onRoleFilterChange('home_parent')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition ${
                activeRoleFilter === 'home_parent'
                  ? 'bg-[#7C9082] text-white shadow-xs'
                  : 'text-[#8A817C] hover:text-[#3D3A35]'
              }`}
            >
              <Home className="w-3 h-3" />
              <span>Home Parent</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

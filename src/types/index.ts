export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type AstroElement = 'Fire' | 'Earth' | 'Air' | 'Water';
export type AstroModality = 'Cardinal' | 'Fixed' | 'Mutable';
export type Chronotype = 'Lion' | 'Bear' | 'Wolf' | 'Dolphin';

export interface UserProfile {
  name: string;
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  risingSign: ZodiacSign;
  element: AstroElement;
  modality: AstroModality;
  chronotype: Chronotype;
  workRole: string;
  familyRole: string;
  wakeTime: string; // e.g. "06:30"
  bedTime: string; // e.g. "22:30"
  workEndTime: string; // e.g. "17:30"
  coreIntentions: string[];
}

export type MemberType = 'team' | 'family';

export interface Member {
  id: string;
  name: string;
  type: MemberType;
  role: string; // e.g. "Senior Frontend Dev", "Spouse / Co-parent", "Teenage Son", "VP Operations"
  zodiacSign: ZodiacSign;
  moonSign?: ZodiacSign;
  ascendant?: ZodiacSign;
  element: AstroElement;
  avatarBg?: string;
  email?: string;
  color?: string;
  status?: 'active' | 'invited';
  chronotype?: Chronotype;
  communicationStyle: 'Direct & Action-driven' | 'Analytical & Precise' | 'Diplomatic & Collaborative' | 'Empathetic & Intuitive' | 'Enthusiastic & Visionary';
  conflictSensitivity: 'Low' | 'Moderate' | 'High' | 'Very Sensitive';
  relationshipNotes: string;
  synastryHarmonicScore: number; // 1 - 100
  bestCollaborationHours: string[]; // e.g. ["10:00 - 11:30", "14:00 - 15:30"]
  bestConfrontationHours: string[]; // e.g. ["11:00 - 12:00", "16:00 - 17:00"]
  challengingHoursToAvoid: string[]; // e.g. ["09:00 - 10:00", "13:00 - 14:00"]
  strengths: string[];
  frictionTriggers: string[];
  deescalationKey: string;
}

export type BlockCategory =
  | 'focus'
  | 'leadership'
  | 'parenting'
  | 'mindfulness'
  | 'collaboration'
  | 'challenging_convo'
  | 'wellness'
  | 'switchover';

export interface ScheduleBlock {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "08:30"
  endTime: string; // "10:00"
  title: string;
  category: BlockCategory;
  description: string;
  counterpartId?: string; // Links to a Member if applicable
  energyDemand: 'high' | 'medium' | 'recharging';
  roleContext: 'work_leader' | 'home_parent' | 'self_care' | 'transition';
  astroAlignmentScore: number; // 1-100
  astroNote: string;
  mindfulnessPrompt?: string;
  completed: boolean;
}

export interface AstrologicalTransit {
  date: string;
  moonSign: ZodiacSign;
  moonPhase: 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
  sunSeason: ZodiacSign;
  dominantElement: AstroElement;
  mercuryDirect: boolean;
  transitSummary: string;
  leadershipVibe: string;
  parentingVibe: string;
  collaborationGoldenHour: string;
  tacticalConfrontationHour: string;
  hourlyVibeCurve: {
    hour: number; // 6 to 22
    label: string; // "6 AM", "7 AM", etc.
    energyPotential: number; // 0 - 100
    collaborationHarmony: number; // 0 - 100
    confrontationSafety: number; // 0 - 100 (high means safe to have tough talks)
    idealFocus: 'Strategic Vision' | 'Deep Focus' | 'Team Synchrony' | 'Difficult Dialogue' | 'Role Transition' | 'Family Warmth' | 'Restorative Calm';
  }[];
}

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  productivityScore: number; // 0-100
  focusHoursCompleted: number; // e.g. 4.5
  leadershipPresence: number; // 1-10
  parentAttunement: number; // 1-10
  energyPositivity: number; // 1-10
  completedBlocksCount: number;
  totalBlocksCount: number;
  roleSwitchoverCompleted: boolean;
  mindfulMinutes: number;
  astroAlignmentAvg: number;
  dailyNotes: string;
  dominantEmotion: string;
}

export interface EnergyRitual {
  id: string;
  title: string;
  category: 'somatic' | 'elemental' | 'cognitive' | 'breathing' | 'astrological';
  durationMinutes: number;
  targetNeed: 'Slump Recovery' | 'Pre-Confrontation Centering' | 'Work-to-Home Switchover' | 'Parenting Patience' | 'Executive Clarity';
  icon: string;
  tagline: string;
  steps: string[];
  elementalAffinity: AstroElement;
}

export interface SynastryAdvice {
  counterpartName: string;
  topic: string;
  bestTimeWindow: string;
  astrologicalReasoning: string;
  confrontationRiskLevel: 'Low' | 'Moderate' | 'High';
  openingScript: string;
  empathyKey: string;
  tacticsToAvoid: string[];
  leaderOrParentTip: string;
  energyPreservationTip: string;
}

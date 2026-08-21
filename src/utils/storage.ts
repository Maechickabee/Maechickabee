import {
  UserProfile,
  Member,
  ScheduleBlock,
  DailyMetric,
  EnergyRitual,
} from '../types';
import { calculateSynastryScore } from './astroEngine';

const STORAGE_KEYS = {
  USER_PROFILE: 'astroflow_user_profile',
  MEMBERS: 'astroflow_members',
  SCHEDULE_BLOCKS: 'astroflow_schedule_blocks',
  METRICS_HISTORY: 'astroflow_metrics_history',
  ENERGY_RITUALS: 'astroflow_energy_rituals',
  ACTIVE_ROLE: 'astroflow_active_role',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  sunSign: 'Leo',
  moonSign: 'Sagittarius',
  risingSign: 'Aries',
  element: 'Fire',
  modality: 'Fixed',
  chronotype: 'Bear',
  workRole: 'VP of Engineering & Product Lead',
  familyRole: 'Parent of 2 (Co-parent & Anchor)',
  wakeTime: '06:30',
  bedTime: '22:30',
  workEndTime: '17:30',
  coreIntentions: [
    'Lead with vision without executive micromanagement',
    'Arrive home with warmth, patience, and zero residual work friction',
    'Maintain daily energy positivity in the upper 80% zone',
  ],
};

export const INITIAL_MEMBERS: Member[] = [
  // Team Members
  {
    id: 'team-1',
    name: 'Sarah Chen',
    type: 'team',
    role: 'Principal Architect & Tech Lead',
    zodiacSign: 'Scorpio',
    moonSign: 'Virgo',
    element: 'Water',
    communicationStyle: 'Empathetic & Intuitive',
    conflictSensitivity: 'High',
    relationshipNotes: 'Brilliant systems thinker. Values deep transparency; hates surprise scope shifts or superficial praise.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Scorpio'),
    bestCollaborationHours: ['10:00 - 11:30', '15:00 - 16:30'],
    bestConfrontationHours: ['14:00 - 15:00'],
    challengingHoursToAvoid: ['09:00 - 10:00', '16:30 - 17:30'],
    strengths: ['Architectural precision', 'Steely focus', 'Unyielding dedication'],
    frictionTriggers: ['Unprepared meetings', 'Vague corporate rhetoric', 'Micromanaged tasks'],
    deescalationKey: 'Be 100% direct, admit any ambiguity upfront, and offer data-driven rationale.',
  },
  {
    id: 'team-2',
    name: 'Marcus Vance',
    type: 'team',
    role: 'Staff Product Manager',
    zodiacSign: 'Aries',
    moonSign: 'Leo',
    element: 'Fire',
    communicationStyle: 'Direct & Action-driven',
    conflictSensitivity: 'Moderate',
    relationshipNotes: 'High-octane driver. Thrives on speed and ambitious milestones. Can get impatient with bureaucratic delays.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Aries'),
    bestCollaborationHours: ['09:30 - 11:00', '13:30 - 14:45'],
    bestConfrontationHours: ['11:00 - 12:00'],
    challengingHoursToAvoid: ['16:00 - 17:00'],
    strengths: ['Momentum generation', 'Fearless prioritization', 'Executive clarity'],
    frictionTriggers: ['Slow decision cycles', 'Pedantic roadblocks', 'Lack of ownership'],
    deescalationKey: 'Acknowledge his initiative, frame obstacles as rapid tactical puzzles, give clear autonomy.',
  },
  {
    id: 'team-3',
    name: 'Elena Rostova',
    type: 'team',
    role: 'Lead Product Designer',
    zodiacSign: 'Libra',
    moonSign: 'Gemini',
    element: 'Air',
    communicationStyle: 'Diplomatic & Collaborative',
    conflictSensitivity: 'Moderate',
    relationshipNotes: 'Exceptional visual storyteller and cross-functional bridge. Sensitive to harsh tone or unilateral diktats.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Libra'),
    bestCollaborationHours: ['10:30 - 12:00', '14:30 - 16:00'],
    bestConfrontationHours: ['14:15 - 15:15'],
    challengingHoursToAvoid: ['13:00 - 14:00'],
    strengths: ['User empathy', 'Aesthetic harmony', 'Synthesizing conflicting inputs'],
    frictionTriggers: ['Abrupt top-down mandates', 'Aggressive posture', 'Overly transactional tone'],
    deescalationKey: 'Appeal to mutual aesthetic vision, ask for her perspective first, co-create solutions gently.',
  },
  {
    id: 'team-4',
    name: 'David Patel',
    type: 'team',
    role: 'Director of Finance & Ops',
    zodiacSign: 'Capricorn',
    moonSign: 'Taurus',
    element: 'Earth',
    communicationStyle: 'Analytical & Precise',
    conflictSensitivity: 'Low',
    relationshipNotes: 'Pragmatic gatekeeper of budgets and runway. Expects structured agendas, bulleted spreadsheets, and sober projections.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Capricorn'),
    bestCollaborationHours: ['09:00 - 10:30', '13:30 - 14:30'],
    bestConfrontationHours: ['10:30 - 11:30'],
    challengingHoursToAvoid: ['15:30 - 17:00'],
    strengths: ['Fiduciary discipline', 'Long-term risk mitigation', 'Operational dependability'],
    frictionTriggers: ['Emotional hand-waving', 'Moving target deadlines', 'Disregard for fiscal prudence'],
    deescalationKey: 'Present bottom-line financial metrics, articulate clear ROI, and respect his strategic timing.',
  },

  // Family Members
  {
    id: 'fam-1',
    name: 'Jordan Morgan',
    type: 'family',
    role: 'Spouse & Life Partner',
    zodiacSign: 'Cancer',
    moonSign: 'Pisces',
    element: 'Water',
    communicationStyle: 'Empathetic & Intuitive',
    conflictSensitivity: 'High',
    relationshipNotes: 'Intuitive emotional compass of the home. Can instantly sense when work stress or mental preoccupation is carried through the door.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Cancer'),
    bestCollaborationHours: ['18:30 - 20:00', '07:30 - 08:30'],
    bestConfrontationHours: ['20:15 - 21:00'],
    challengingHoursToAvoid: ['17:30 - 18:30', '22:00 - 23:00'],
    strengths: ['Deep nurturing', 'Emotional attunement', 'Creating comforting sanctuary'],
    frictionTriggers: ['Distracted scrolling at dinner', 'Work irritability brought into the kitchen', 'Dismissive emotional responses'],
    deescalationKey: 'Offer warm physical touch, listen without giving immediate tactical advice, validate feelings first.',
  },
  {
    id: 'fam-2',
    name: 'Leo (14 yrs)',
    type: 'family',
    role: 'Teenage Son',
    zodiacSign: 'Gemini',
    moonSign: 'Aquarius',
    element: 'Air',
    communicationStyle: 'Enthusiastic & Visionary',
    conflictSensitivity: 'Moderate',
    relationshipNotes: 'High intellectual curiosity and banter. Shuts down immediately if lectured or given rigid parental mandates without discussion.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Gemini'),
    bestCollaborationHours: ['17:45 - 19:00', '20:00 - 21:00'],
    bestConfrontationHours: ['18:30 - 19:15'],
    challengingHoursToAvoid: ['07:00 - 08:00', '21:30 - 22:30'],
    strengths: ['Humor & wit', 'Fast learner', 'Creative problem solver'],
    frictionTriggers: ['Authoritarian tone', 'Boring repetitive chores without gamification', 'Feeling unheard'],
    deescalationKey: 'Treat him like an emerging adult, use humor, frame chores as mutual team agreements.',
  },
  {
    id: 'fam-3',
    name: 'Mia (8 yrs)',
    type: 'family',
    role: 'Younger Daughter',
    zodiacSign: 'Pisces',
    moonSign: 'Cancer',
    element: 'Water',
    communicationStyle: 'Empathetic & Intuitive',
    conflictSensitivity: 'Very Sensitive',
    relationshipNotes: 'Highly imaginative and sensitive to emotional atmospheres. Needs bedtime connection and gentle transitions.',
    synastryHarmonicScore: calculateSynastryScore('Leo', 'Pisces'),
    bestCollaborationHours: ['18:00 - 19:30'],
    bestConfrontationHours: ['18:15 - 19:00'],
    challengingHoursToAvoid: ['20:00 - 21:00'],
    strengths: ['Artistic imagination', 'Sweet compassion', 'Joyful playfulness'],
    frictionTriggers: ['Rushed bedtime', 'Raised voices', 'Feeling ignored when showing artwork'],
    deescalationKey: 'Crouch down to eye level, speak in a gentle melody, read a soothing story together.',
  },
];

export const INITIAL_ENERGY_RITUALS: EnergyRitual[] = [
  {
    id: 'rit-1',
    title: 'Executive Breath of Fire Reset',
    category: 'breathing',
    durationMinutes: 3,
    targetNeed: 'Slump Recovery',
    icon: 'Flame',
    tagline: 'Rapid rhythmic diaphragm pumping to clear midday brain fog and boost mental clarity',
    steps: [
      'Sit tall with an open chest and relaxed shoulders.',
      'Take quick, active snorts through the nose by snapping the navel inward.',
      'Allow passive inhalation between each snap.',
      'Do 3 rounds of 30 pumps, followed by a long deep inhale, hold for 10s, and a peaceful exhale.',
    ],
    elementalAffinity: 'Fire',
  },
  {
    id: 'rit-2',
    title: 'The 5:30 PM Role Switchover Bridge',
    category: 'astrological',
    durationMinutes: 5,
    targetNeed: 'Work-to-Home Switchover',
    icon: 'DoorClosed',
    tagline: 'De-armor from executive combat mode and transition into warm, grounded presence for family',
    steps: [
      'Physically close all work laptop tabs and place phone on silent charger.',
      'Place both hands over heart center; take 3 physiological double-inhale sighs.',
      'Mentally declare: "My team is safe, my work is paused, my presence belongs to my family now."',
      'Wash hands and face with cool water to symbolize shedding the corporate skin.',
    ],
    elementalAffinity: 'Water',
  },
  {
    id: 'rit-3',
    title: 'Somatic Grounding & Tension Shake',
    category: 'somatic',
    durationMinutes: 4,
    targetNeed: 'Pre-Confrontation Centering',
    icon: 'Activity',
    tagline: 'Shake off cortisol and adrenaline before stepping into a high-stakes discussion',
    steps: [
      'Stand with feet wider than hips, knees loose and bouncy.',
      'Gently shake hands, wrists, arms, shoulders, and jaw for 90 seconds.',
      'Pause in total stillness; feel the tingling circulation and grounded weight in your heels.',
      'Inhale confidence, exhale defensiveness.',
    ],
    elementalAffinity: 'Earth',
  },
  {
    id: 'rit-4',
    title: 'Heart Coherence for Leadership',
    category: 'breathing',
    durationMinutes: 4,
    targetNeed: 'Executive Clarity',
    icon: 'Heart',
    tagline: 'Synchronize heart rate variability to emanate authentic calm and strategic poise',
    steps: [
      'Focus attention on the area around your heart.',
      'Inhale smoothly for 5 seconds, expanding the chest gently.',
      'Exhale smoothly for 5 seconds, visualizing tension dissolving.',
      'Cultivate an intentional feeling of genuine appreciation for your team or loved ones.',
    ],
    elementalAffinity: 'Air',
  },
  {
    id: 'rit-5',
    title: 'Parenting Patience Sanctuary',
    category: 'cognitive',
    durationMinutes: 3,
    targetNeed: 'Parenting Patience',
    icon: 'Smile',
    tagline: 'Micro-meditation when kids are dysregulated or testing emotional boundaries',
    steps: [
      'Pause before responding. Say internally: "They are not giving me a hard time, they are HAVING a hard time."',
      'Drop your gaze and lower your voice by half an octave.',
      'Feel the floor underneath your feet; anchor your calm as the room\'s emotional thermostat.',
    ],
    elementalAffinity: 'Water',
  },
];

// Helper to generate seed schedule blocks for a given date
export function getInitialScheduleForDate(dateStr: string): ScheduleBlock[] {
  return [
    {
      id: `block-${dateStr}-1`,
      date: dateStr,
      startTime: '06:45',
      endTime: '07:30',
      title: 'Morning Sun & Mindful Centering',
      category: 'wellness',
      description: 'Hydration, light stretching, 10 min solar plexus breathing, and setting daily intention.',
      energyDemand: 'recharging',
      roleContext: 'self_care',
      astroAlignmentScore: 95,
      astroNote: 'Aligns with Sun in Leo vitality window; sets high neuro-hormonal baseline.',
      mindfulnessPrompt: 'Inhale clarity, exhale mental clutter. Today I lead with purpose and love.',
      completed: true,
    },
    {
      id: `block-${dateStr}-2`,
      date: dateStr,
      startTime: '07:30',
      endTime: '08:30',
      title: 'Family Breakfast & School Launch',
      category: 'parenting',
      description: 'Warm morning connection with Jordan, packing lunches with Mia, and checking in on Leo.',
      counterpartId: 'fam-1',
      energyDemand: 'medium',
      roleContext: 'home_parent',
      astroAlignmentScore: 88,
      astroNote: 'Cancer Moon morning hours support gentle family bonding without rush.',
      mindfulnessPrompt: 'Be 100% present in the kitchen. Make eye contact with each child before they leave.',
      completed: true,
    },
    {
      id: `block-${dateStr}-3`,
      date: dateStr,
      startTime: '09:00',
      endTime: '10:30',
      title: 'Deep Architecture & Strategic Roadmap',
      category: 'focus',
      description: 'Zero-distraction deep work: Finalize Q3 infrastructure scaling plan and AI roadmap.',
      energyDemand: 'high',
      roleContext: 'work_leader',
      astroAlignmentScore: 94,
      astroNote: 'Peak cognitive chrono-window (Bear chronotype) + Mercury focus flow.',
      mindfulnessPrompt: 'Close all communication apps. Dive into the flow state with effortless absorption.',
      completed: true,
    },
    {
      id: `block-${dateStr}-4`,
      date: dateStr,
      startTime: '10:30',
      endTime: '11:45',
      title: 'Tech Architecture & Product Sync (Sarah Chen)',
      category: 'collaboration',
      description: 'High-leverage co-design session with Sarah on microservices decoupling and event streaming.',
      counterpartId: 'team-1',
      energyDemand: 'high',
      roleContext: 'work_leader',
      astroAlignmentScore: 96,
      astroNote: 'Optimal Golden Collaboration Window: Fire-Water harmonic synthesis during 10:30 AM peak.',
      mindfulnessPrompt: 'Listen 60% of the time. Validate Sarah\'s structural foresight before iterating.',
      completed: false,
    },
    {
      id: `block-${dateStr}-5`,
      date: dateStr,
      startTime: '12:00',
      endTime: '13:00',
      title: 'Mindful Lunch & Solar Walk',
      category: 'wellness',
      description: 'Screen-free nourishing meal, 15-minute outdoor walk in sunlight to reset circadian rhythms.',
      energyDemand: 'recharging',
      roleContext: 'self_care',
      astroAlignmentScore: 90,
      astroNote: 'Sun peak recharge; essential to prevent the 2:00 PM dopamine crash.',
      mindfulnessPrompt: 'Taste every bite mindfully. Feel the sunlight on your skin.',
      completed: false,
    },
    {
      id: `block-${dateStr}-6`,
      date: dateStr,
      startTime: '14:00',
      endTime: '15:00',
      title: 'Tough Alignment & Priority Trade-offs (Marcus Vance)',
      category: 'challenging_convo',
      description: 'Tactical alignment on postponing non-critical feature release to protect engineering quality.',
      counterpartId: 'team-2',
      energyDemand: 'high',
      roleContext: 'work_leader',
      astroAlignmentScore: 92,
      astroNote: 'Astrological Safe Window: Mars-Mercury trine softens confrontation risks for Fire-Fire pairs.',
      mindfulnessPrompt: 'Ground your feet. Speak with unwavering clarity and warm respect. Don\'t rush his response.',
      completed: false,
    },
    {
      id: `block-${dateStr}-7`,
      date: dateStr,
      startTime: '15:30',
      endTime: '16:45',
      title: 'Team Unblocker & Design Review (Elena & David)',
      category: 'leadership',
      description: 'Reviewing UI micro-interactions and clearing budget approvals for new telemetry licenses.',
      counterpartId: 'team-3',
      energyDemand: 'medium',
      roleContext: 'work_leader',
      astroAlignmentScore: 89,
      astroNote: 'Air-Earth balance window: High diplomacy and clear financial signoffs.',
      mindfulnessPrompt: 'Praise creative craft openly and confirm operational timeline feasibility.',
      completed: false,
    },
    {
      id: `block-${dateStr}-8`,
      date: dateStr,
      startTime: '17:15',
      endTime: '17:30',
      title: 'Daily Shutdown & Executive Wrap',
      category: 'focus',
      description: 'Clear inbox, document tomorrow\'s top 3 outcomes, and log leadership presence score.',
      energyDemand: 'medium',
      roleContext: 'work_leader',
      astroAlignmentScore: 87,
      astroNote: 'Saturnian closure ritual; releases cognitive loops before switching roles.',
      mindfulnessPrompt: 'Acknowledge today\'s progress. Work is now safely closed.',
      completed: false,
    },
    {
      id: `block-${dateStr}-9`,
      date: dateStr,
      startTime: '17:30',
      endTime: '17:45',
      title: 'The Role Switchover Ritual (Work to Home)',
      category: 'switchover',
      description: 'Shed corporate armor, 3 double-inhale sighs, wash hands/face, set intention for warm parenting.',
      energyDemand: 'recharging',
      roleContext: 'transition',
      astroAlignmentScore: 98,
      astroNote: 'Essential boundary ritual: Prevents stress spillover into evening home sanctuary.',
      mindfulnessPrompt: 'I leave the leader behind. I step forward as a loving, attentive parent.',
      completed: false,
    },
    {
      id: `block-${dateStr}-10`,
      date: dateStr,
      startTime: '18:00',
      endTime: '19:30',
      title: 'Dinner & Family Play / Homework Space',
      category: 'parenting',
      description: 'Cook dinner with Jordan, laugh over silly school stories with Leo, help Mia with drawing.',
      counterpartId: 'fam-3',
      energyDemand: 'medium',
      roleContext: 'home_parent',
      astroAlignmentScore: 94,
      astroNote: 'Moon in Water activates deep empathic connection and joyful family storytelling.',
      mindfulnessPrompt: 'No phones at the table. Fully listen with soft eyes and an open heart.',
      completed: false,
    },
    {
      id: `block-${dateStr}-11`,
      date: dateStr,
      startTime: '20:00',
      endTime: '21:00',
      title: 'Bedtime Reading & Partner Reconnection',
      category: 'parenting',
      description: 'Tuck-in stories with Mia, quiet catch-up with Leo, and a warm cup of herbal tea with Jordan.',
      counterpartId: 'fam-1',
      energyDemand: 'recharging',
      roleContext: 'home_parent',
      astroAlignmentScore: 95,
      astroNote: 'Evening Venusian wind-down; emotional safety and restorative intimacy.',
      mindfulnessPrompt: 'Surround your loved ones with quiet peace. Gratitude for another full day.',
      completed: false,
    },
  ];
}

// Generate 30 days of longitudinal history for tracking metrics
export function generateInitialHistory(todayStr: string): DailyMetric[] {
  const history: DailyMetric[] = [];
  const today = new Date(todayStr + 'T12:00:00');

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Seed realistic fluctuating scores with an upward trend as user practices rituals
    const baseProgress = (30 - i) / 30; // 0 to 1
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const productivity = isWeekend
      ? Math.round(55 + Math.random() * 20)
      : Math.round(75 + baseProgress * 15 + (Math.sin(i * 0.7) * 8));

    const focusHours = isWeekend
      ? +(1.5 + Math.random() * 1.5).toFixed(1)
      : +(3.8 + baseProgress * 1.4 + (Math.cos(i * 0.5) * 0.8)).toFixed(1);

    const leadership = isWeekend
      ? Math.round(6 + Math.random() * 2)
      : Math.min(10, Math.round(7 + baseProgress * 2 + (Math.sin(i * 0.4) * 1)));

    const parenting = Math.min(10, Math.round(7.5 + baseProgress * 1.8 + (Math.cos(i * 0.6) * 1)));
    const energyPositivity = Math.min(10, Math.round(7.2 + baseProgress * 2.1 + (Math.sin(i * 0.8) * 0.9)));

    const completedBlocks = isWeekend ? 5 : Math.round(8 + Math.random() * 3);
    const totalBlocks = isWeekend ? 6 : 11;
    const switchoverDone = Math.random() > (0.4 - baseProgress * 0.3);

    const emotions = ['Grounded & Focused', 'Joyful & Energized', 'Calm & Flowing', 'Resilient & Clear', 'Deeply Present'];
    const dominantEmotion = emotions[(i + dayOfWeek) % emotions.length];

    history.push({
      date: dateStr,
      productivityScore: Math.min(100, Math.max(40, productivity)),
      focusHoursCompleted: Math.max(1, focusHours),
      leadershipPresence: Math.min(10, Math.max(4, leadership)),
      parentAttunement: Math.min(10, Math.max(4, parenting)),
      energyPositivity: Math.min(10, Math.max(4, energyPositivity)),
      completedBlocksCount: completedBlocks,
      totalBlocksCount: totalBlocks,
      roleSwitchoverCompleted: switchoverDone,
      mindfulMinutes: Math.round(15 + baseProgress * 15 + Math.random() * 10),
      astroAlignmentAvg: Math.round(82 + baseProgress * 12 + (Math.sin(i) * 5)),
      dailyNotes: i === 0 ? 'Optimal day with successful 5:30 PM role switchover and clear tech alignment with Sarah.' : 'Consistent focus blocks and restorative family evening.',
      dominantEmotion,
    });
  }

  return history;
}

// Storage helpers
export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profile from storage', e);
  }
  return DEFAULT_USER_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to storage', e);
  }
}

export function loadMembers(): Member[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load members from storage', e);
  }
  return INITIAL_MEMBERS;
}

export function saveMembers(members: Member[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  } catch (e) {
    console.error('Failed to save members to storage', e);
  }
}

export function loadScheduleBlocks(dateStr: string): ScheduleBlock[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.SCHEDULE_BLOCKS}_${dateStr}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load schedule from storage', e);
  }
  return getInitialScheduleForDate(dateStr);
}

export function saveScheduleBlocks(dateStr: string, blocks: ScheduleBlock[]): void {
  try {
    localStorage.setItem(`${STORAGE_KEYS.SCHEDULE_BLOCKS}_${dateStr}`, JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to save schedule to storage', e);
  }
}

export function loadMetricsHistory(todayStr: string): DailyMetric[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.METRICS_HISTORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load metrics from storage', e);
  }
  const initial = generateInitialHistory(todayStr);
  saveMetricsHistory(initial);
  return initial;
}

export function saveMetricsHistory(metrics: DailyMetric[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.METRICS_HISTORY, JSON.stringify(metrics));
  } catch (e) {
    console.error('Failed to save metrics to storage', e);
  }
}

export function loadEnergyRituals(): EnergyRitual[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENERGY_RITUALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load rituals from storage', e);
  }
  return INITIAL_ENERGY_RITUALS;
}

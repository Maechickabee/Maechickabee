import {
  ZodiacSign,
  AstroElement,
  AstroModality,
  AstrologicalTransit,
  Member,
  UserProfile,
  SynastryAdvice,
} from '../types';

export interface ZodiacData {
  sign: ZodiacSign;
  symbol: string;
  element: AstroElement;
  modality: AstroModality;
  ruler: string;
  traits: string[];
  communicationStyle: 'Direct & Action-driven' | 'Analytical & Precise' | 'Diplomatic & Collaborative' | 'Empathetic & Intuitive' | 'Enthusiastic & Visionary';
  conflictTriggers: string[];
  deescalationKey: string;
  bestCompliments: string[];
}

export const ZODIAC_REGISTRY: Record<ZodiacSign, ZodiacData> = {
  Aries: {
    sign: 'Aries',
    symbol: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'Mars',
    traits: ['Pioneering', 'Courageous', 'Direct', 'Impulsive'],
    communicationStyle: 'Direct & Action-driven',
    conflictTriggers: ['Micromanagement', 'Hesitation/Indecision', 'Feeling disrespected or slow-walked'],
    deescalationKey: 'Give autonomy, acknowledge their initiative immediately, and stick directly to bulleted bottom-lines.',
    bestCompliments: ['Decisiveness', 'Bold leadership', 'Speed of execution'],
  },
  Taurus: {
    sign: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'Venus',
    traits: ['Steadfast', 'Grounded', 'Sensory', 'Pragmatic'],
    communicationStyle: 'Analytical & Precise',
    conflictTriggers: ['Abrupt changes without warning', 'Feeling rushed', 'Questioning their security/reliability'],
    deescalationKey: 'Provide warm pacing, offer concrete timelines, do not push for instant concessions, validate their stability.',
    bestCompliments: ['Reliability', 'Thoughtful craftsmanship', 'Calm presence'],
  },
  Gemini: {
    sign: 'Gemini',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    ruler: 'Mercury',
    traits: ['Curious', 'Versatile', 'Quick-witted', 'Adaptable'],
    communicationStyle: 'Enthusiastic & Visionary',
    conflictTriggers: ['Boredom', 'Dogmatism', 'Feeling ignored or dismissed intellectually'],
    deescalationKey: 'Engage their intellectual curiosity, frame challenges as puzzle-solving, acknowledge multiple perspectives.',
    bestCompliments: ['Mental agility', 'Articulate ideas', 'Creative lateral thinking'],
  },
  Cancer: {
    sign: 'Cancer',
    symbol: '♋',
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'Moon',
    traits: ['Nurturing', 'Intuitive', 'Protective', 'Loyal'],
    communicationStyle: 'Empathetic & Intuitive',
    conflictTriggers: ['Cold detachment', 'Threats to emotional safety or home sanctity', 'Perceived betrayal'],
    deescalationKey: 'Start with genuine warmth and care, lower vocal tone, ensure they know their psychological safety is valued.',
    bestCompliments: ['Deep empathy', 'Care for the collective', 'Protective stewardship'],
  },
  Leo: {
    sign: 'Leo',
    symbol: '♌',
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'Sun',
    traits: ['Charismatic', 'Generous', 'Proud', 'Warm-hearted'],
    communicationStyle: 'Enthusiastic & Visionary',
    conflictTriggers: ['Public criticism', 'Feeling unappreciated or eclipsed', 'Condescending feedback'],
    deescalationKey: 'Deliver critique in total privacy, preface with genuine praise for their strengths, appeal to their nobility.',
    bestCompliments: ['Generosity of spirit', 'Magnetic leadership', 'Creative vision'],
  },
  Virgo: {
    sign: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'Mercury',
    traits: ['Discerning', 'Systematic', 'Helpful', 'Dedicated'],
    communicationStyle: 'Analytical & Precise',
    conflictTriggers: ['Disorganized chaos', 'Sloppy work passing down to them', 'Vague, ungrounded feedback'],
    deescalationKey: 'Bring specific data and clear action steps; acknowledge how hard they strive for excellence and relieve perfectionist pressure.',
    bestCompliments: ['Attention to nuance', 'Flawless dedication', 'Refined systems mastery'],
  },
  Libra: {
    sign: 'Libra',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'Venus',
    traits: ['Harmonious', 'Diplomatic', 'Aesthetic', 'Fair-minded'],
    communicationStyle: 'Diplomatic & Collaborative',
    conflictTriggers: ['Aggressive confrontation', 'Injustice or unfair double standards', 'Forced instant ultimatums'],
    deescalationKey: 'Frame the issue around shared fairness and balance; invite their opinion on equitable compromise.',
    bestCompliments: ['Fairness', 'Relational bridge-building', 'Elevated taste'],
  },
  Scorpio: {
    sign: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    modality: 'Fixed',
    ruler: 'Pluto & Mars',
    traits: ['Deep', 'Perceptive', 'Passionate', 'Resilient'],
    communicationStyle: 'Empathetic & Intuitive',
    conflictTriggers: ['Superficiality', 'Dishonesty or hidden agendas', 'Feeling manipulated or blindsided'],
    deescalationKey: 'Be 100% candid and transparent. Own mistakes immediately without spin. Give them time to process before pushing.',
    bestCompliments: ['Strategic depth', 'Unshakable loyalty', 'Transformative power'],
  },
  Sagittarius: {
    sign: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'Jupiter',
    traits: ['Optimistic', 'Philosophical', 'Adventurous', 'Candid'],
    communicationStyle: 'Enthusiastic & Visionary',
    conflictTriggers: ['Feeling trapped or micromanaged', 'Pessimism', 'Hypocrisy'],
    deescalationKey: 'Appeal to the bigger horizon; keep conversations inspiring and expansive rather than getting bogged in petty friction.',
    bestCompliments: ['Expansive vision', 'Authentic honesty', 'Infectious enthusiasm'],
  },
  Capricorn: {
    sign: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'Saturn',
    traits: ['Disciplined', 'Strategic', 'Architectural', 'Prudent'],
    communicationStyle: 'Direct & Action-driven',
    conflictTriggers: ['Incompetence', 'Disregard for hierarchy/commitments', 'Wasting their valuable time'],
    deescalationKey: 'Focus on mutual strategic ROI, long-term stability, and respect for their time and boundaries.',
    bestCompliments: ['Strategic rigor', 'Unmatched grit', 'Steadfast execution'],
  },
  Aquarius: {
    sign: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixed',
    ruler: 'Uranus & Saturn',
    traits: ['Innovative', 'Humanitarian', 'Independent', 'Objective'],
    communicationStyle: 'Diplomatic & Collaborative',
    conflictTriggers: ['Overly emotional guilt-tripping', 'Stifling rigid orthodoxy', 'Infringing on individuality'],
    deescalationKey: 'Appeal to logic and community welfare; respect their need for objective space without emotional pressure.',
    bestCompliments: ['Original visionary thinking', 'Progressive values', 'Intellectual integrity'],
  },
  Pisces: {
    sign: 'Pisces',
    symbol: '♓',
    element: 'Water',
    modality: 'Mutable',
    ruler: 'Neptune & Jupiter',
    traits: ['Compassionate', 'Visionary', 'Soulful', 'Imaginative'],
    communicationStyle: 'Empathetic & Intuitive',
    conflictTriggers: ['Harsh cynicism', 'Cruelty or emotional coldness', 'Being overwhelmed by rigid demands'],
    deescalationKey: 'Use soft vocal tones, validate their intuitive feelings, offer gentle structure without harsh rigidity.',
    bestCompliments: ['Profound empathy', 'Creative transcendence', 'Gentle wisdom'],
  },
};

export const ELEMENT_MAP: Record<ZodiacSign, AstroElement> = {
  Aries: 'Fire',
  Taurus: 'Earth',
  Gemini: 'Air',
  Cancer: 'Water',
  Leo: 'Fire',
  Virgo: 'Earth',
  Libra: 'Air',
  Scorpio: 'Water',
  Sagittarius: 'Fire',
  Capricorn: 'Earth',
  Aquarius: 'Air',
  Pisces: 'Water',
};

// Calculate Synastry compatibility score (1-100) between user and counterpart
export function calculateSynastryScore(userSign: ZodiacSign, counterpartSign: ZodiacSign): number {
  const userElement = ELEMENT_MAP[userSign];
  const cpElement = ELEMENT_MAP[counterpartSign];

  // Same element (Trine affinity)
  if (userElement === cpElement) {
    return userSign === counterpartSign ? 88 : 94; // Trine harmonic resonance
  }

  // Complementary elements: Fire + Air, Earth + Water
  if (
    (userElement === 'Fire' && cpElement === 'Air') ||
    (userElement === 'Air' && cpElement === 'Fire') ||
    (userElement === 'Earth' && cpElement === 'Water') ||
    (userElement === 'Water' && cpElement === 'Earth')
  ) {
    return 91; // Sextile / High synergy
  }

  // Semi-compatible / Dynamic tension: Fire + Earth, Air + Water
  if (
    (userElement === 'Fire' && cpElement === 'Earth') ||
    (userElement === 'Earth' && cpElement === 'Fire') ||
    (userElement === 'Air' && cpElement === 'Water') ||
    (userElement === 'Water' && cpElement === 'Air')
  ) {
    return 74; // Requires conscious translation
  }

  // Fire + Water (Steam/Intensity), Earth + Air (Dust/Abstraction friction)
  return 68; // Opportunity for high emotional or operational mastery
}

// Generate realistic daily transit based on a date
export function getDailyTransit(dateStr: string, userProfile: UserProfile): AstrologicalTransit {
  const d = new Date(dateStr + 'T12:00:00');
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const zodiacSigns: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  
  // Moon shifts every ~2.3 days
  const moonIndex = (Math.floor(dayOfYear / 2.3) + 3) % 12;
  const moonSign = zodiacSigns[moonIndex];

  // Sun sign by date
  const month = d.getMonth() + 1;
  const day = d.getDate();
  let sunSeason: ZodiacSign = 'Leo';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSeason = 'Aries';
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSeason = 'Taurus';
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSeason = 'Gemini';
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSeason = 'Cancer';
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSeason = 'Leo';
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSeason = 'Virgo';
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSeason = 'Libra';
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSeason = 'Scorpio';
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSeason = 'Sagittarius';
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSeason = 'Capricorn';
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSeason = 'Aquarius';
  else sunSeason = 'Pisces';

  const dominantElement = ELEMENT_MAP[moonSign];

  // Calculate moon phase from day of lunar month (approx 29.5 day cycle)
  const lunarDay = Math.floor((dayOfYear % 29.5));
  let moonPhase: AstrologicalTransit['moonPhase'] = 'Waxing Gibbous';
  if (lunarDay < 3) moonPhase = 'New Moon';
  else if (lunarDay < 7) moonPhase = 'Waxing Crescent';
  else if (lunarDay < 11) moonPhase = 'First Quarter';
  else if (lunarDay < 15) moonPhase = 'Waxing Gibbous';
  else if (lunarDay < 18) moonPhase = 'Full Moon';
  else if (lunarDay < 22) moonPhase = 'Waning Gibbous';
  else if (lunarDay < 26) moonPhase = 'Last Quarter';
  else moonPhase = 'Waning Crescent';

  const hourlyVibeCurve = [
    { hour: 6, label: '6 AM', energyPotential: 65, collaborationHarmony: 50, confrontationSafety: 40, idealFocus: 'Restorative Calm' as const },
    { hour: 7, label: '7 AM', energyPotential: 75, collaborationHarmony: 60, confrontationSafety: 50, idealFocus: 'Strategic Vision' as const },
    { hour: 8, label: '8 AM', energyPotential: 85, collaborationHarmony: 70, confrontationSafety: 65, idealFocus: 'Deep Focus' as const },
    { hour: 9, label: '9 AM', energyPotential: 92, collaborationHarmony: 80, confrontationSafety: 72, idealFocus: 'Deep Focus' as const },
    { hour: 10, label: '10 AM', energyPotential: 96, collaborationHarmony: 94, confrontationSafety: 88, idealFocus: 'Team Synchrony' as const },
    { hour: 11, label: '11 AM', energyPotential: 90, collaborationHarmony: 91, confrontationSafety: 85, idealFocus: 'Team Synchrony' as const },
    { hour: 12, label: '12 PM', energyPotential: 70, collaborationHarmony: 75, confrontationSafety: 55, idealFocus: 'Restorative Calm' as const },
    { hour: 13, label: '1 PM', energyPotential: 68, collaborationHarmony: 65, confrontationSafety: 45, idealFocus: 'Strategic Vision' as const },
    { hour: 14, label: '2 PM', energyPotential: 82, collaborationHarmony: 88, confrontationSafety: 90, idealFocus: 'Difficult Dialogue' as const },
    { hour: 15, label: '3 PM', energyPotential: 86, collaborationHarmony: 86, confrontationSafety: 84, idealFocus: 'Team Synchrony' as const },
    { hour: 16, label: '4 PM', energyPotential: 78, collaborationHarmony: 75, confrontationSafety: 68, idealFocus: 'Deep Focus' as const },
    { hour: 17, label: '5 PM', energyPotential: 72, collaborationHarmony: 65, confrontationSafety: 55, idealFocus: 'Role Transition' as const },
    { hour: 18, label: '6 PM', energyPotential: 80, collaborationHarmony: 85, confrontationSafety: 75, idealFocus: 'Family Warmth' as const },
    { hour: 19, label: '7 PM', energyPotential: 82, collaborationHarmony: 88, confrontationSafety: 70, idealFocus: 'Family Warmth' as const },
    { hour: 20, label: '8 PM', energyPotential: 74, collaborationHarmony: 80, confrontationSafety: 60, idealFocus: 'Family Warmth' as const },
    { hour: 21, label: '9 PM', energyPotential: 60, collaborationHarmony: 50, confrontationSafety: 35, idealFocus: 'Restorative Calm' as const },
    { hour: 22, label: '10 PM', energyPotential: 45, collaborationHarmony: 30, confrontationSafety: 20, idealFocus: 'Restorative Calm' as const },
  ];

  // Adjust for user chronotype
  if (userProfile.chronotype === 'Wolf') {
    // Night owls shift peak later
    hourlyVibeCurve.forEach((h) => {
      if (h.hour < 10) h.energyPotential -= 15;
      if (h.hour >= 15 && h.hour <= 21) h.energyPotential = Math.min(100, h.energyPotential + 12);
    });
  } else if (userProfile.chronotype === 'Lion') {
    // Early risers shift peak earlier
    hourlyVibeCurve.forEach((h) => {
      if (h.hour <= 11) h.energyPotential = Math.min(100, h.energyPotential + 10);
      if (h.hour >= 19) h.energyPotential = Math.max(20, h.energyPotential - 18);
    });
  }

  const transitSummary = `Moon in ${moonSign} activates ${dominantElement} energy under the ${sunSeason} Sun season. ${
    dominantElement === 'Fire' ? 'High creative drive and bold decision velocity.' :
    dominantElement === 'Earth' ? 'Grounding pragmatic clarity, ideal for structural alignment and stable agreements.' :
    dominantElement === 'Air' ? 'Elevated intellectual synthesis, swift communication, and strategic diplomacy.' :
    'Deep emotional attunement, empathetic listening, and psychological resonance.'
  }`;

  const leadershipVibe = dominantElement === 'Fire' || dominantElement === 'Air'
    ? 'Inspire with clear vision and high-velocity alignment.'
    : 'Lead with grounded presence, deliberate pacing, and empathetic psychological safety.';

  const parentingVibe = dominantElement === 'Water' || dominantElement === 'Earth'
    ? 'Ideal evening for warm storytelling, sensory comfort, and gentle boundaries.'
    : 'Channel playful enthusiasm and engaging interactive exploration with the children.';

  return {
    date: dateStr,
    moonSign,
    moonPhase,
    sunSeason,
    dominantElement,
    mercuryDirect: true,
    transitSummary,
    leadershipVibe,
    parentingVibe,
    collaborationGoldenHour: '10:00 AM - 11:30 AM',
    tacticalConfrontationHour: '02:00 PM - 03:15 PM',
    hourlyVibeCurve,
  };
}

// Generate Instant Rule-based Synastry Advice
export function getLocalSynastryAdvice(
  user: UserProfile,
  counterpart: Member,
  topic: string,
  type: 'collaboration' | 'confrontation' | 'feedback' | 'parenting_sync'
): SynastryAdvice {
  const cpData = ZODIAC_REGISTRY[counterpart.zodiacSign];
  const userData = ZODIAC_REGISTRY[user.sunSign];

  const isConfrontational = type === 'confrontation' || type === 'feedback';
  const riskLevel = counterpart.conflictSensitivity === 'Very Sensitive' || counterpart.conflictSensitivity === 'High'
    ? 'High'
    : counterpart.conflictSensitivity === 'Moderate'
    ? 'Moderate'
    : 'Low';

  let bestTime = isConfrontational ? '2:15 PM - 3:30 PM' : '10:15 AM - 11:45 AM';
  if (counterpart.bestConfrontationHours && counterpart.bestConfrontationHours.length > 0 && isConfrontational) {
    bestTime = counterpart.bestConfrontationHours[0];
  } else if (counterpart.bestCollaborationHours && counterpart.bestCollaborationHours.length > 0 && !isConfrontational) {
    bestTime = counterpart.bestCollaborationHours[0];
  }

  const openingScript = isConfrontational
    ? `"${counterpart.name}, I deeply value how much care you bring to our ${counterpart.type === 'team' ? 'team\'s outcomes' : 'family dynamic'}. I want to align openly on ${topic || 'our shared path'} so we both feel energized and clear."`
    : `"${counterpart.name}, given your ${cpData.traits[0]} perspective, I'd love to co-create with you on ${topic || 'this initiative'} during your peak mental window today."`;

  return {
    counterpartName: counterpart.name,
    topic: topic || 'High-Impact Alignment',
    bestTimeWindow: bestTime,
    astrologicalReasoning: `${userData.element} Sun (${user.sunSign}) meets ${cpData.element} ${cpData.sign}. Harmonic alignment is maximized during afternoon Venus-Mercury harmonic windows, bypassing defensive Mars triggers.`,
    confrontationRiskLevel: riskLevel,
    openingScript,
    empathyKey: `Their root need is ${cpData.element === 'Fire' ? 'respect and autonomy' : cpData.element === 'Earth' ? 'security and predictability' : cpData.element === 'Air' ? 'intellectual fairness and voice' : 'emotional safety and unconditional validation'}.`,
    tacticsToAvoid: cpData.conflictTriggers,
    leaderOrParentTip: cpData.deescalationKey,
    energyPreservationTip: 'Ground your feet flat on the floor, exhale twice as long as you inhale, and separate their emotional weather from your core inner calm.',
  };
}

// Distinct, vibrant & harmonic color palette for members
export const MEMBER_COLORS = [
  '#2563EB', // Royal Blue
  '#D97706', // Warm Amber/Orange
  '#059669', // Emerald Green
  '#7C3AED', // Purple / Violet
  '#DC2626', // Crimson Red
  '#0891B2', // Cyan / Ocean Blue
  '#D946EF', // Magenta / Fuchsia
  '#4F46E5', // Indigo
  '#EA580C', // Flame Orange
  '#0D9488', // Deep Teal
  '#9333EA', // Orchid Purple
  '#64748B', // Slate Steel
];

export function getMemberColor(member: Member, index: number): string {
  if (member.color) return member.color;
  return MEMBER_COLORS[index % MEMBER_COLORS.length];
}

// Calculate hourly energy curve for any team or family member
export function getMemberHourlyEnergy(
  member: Member,
  hour: number, // 6 to 22
  transit: AstrologicalTransit
): number {
  const element = member.element || ELEMENT_MAP[member.zodiacSign] || 'Fire';
  let baseEnergy = 70;

  if (element === 'Fire') {
    // Fire signs: Peak energy between 10 AM and 3 PM, high drive
    if (hour >= 6 && hour <= 8) baseEnergy = 68 + (hour - 6) * 6; // 68, 74, 80
    else if (hour >= 9 && hour <= 12) baseEnergy = 88 + ((hour % 3) * 4); // 88, 92, 96, 88
    else if (hour >= 13 && hour <= 15) baseEnergy = 86 + (15 - hour) * 3; // 92, 89, 86
    else if (hour >= 16 && hour <= 18) baseEnergy = 78 + (18 - hour) * 2; // 82, 80, 78
    else if (hour >= 19 && hour <= 21) baseEnergy = 72 - (hour - 19) * 6; // 72, 66, 60
    else baseEnergy = 48;
  } else if (element === 'Earth') {
    // Earth signs: Steady endurance plateau across working day 8 AM to 4 PM
    if (hour >= 6 && hour <= 8) baseEnergy = 74 + (hour - 6) * 5; // 74, 79, 84
    else if (hour >= 9 && hour <= 16) baseEnergy = 86 + (Math.sin(hour) * 4); // 82 - 90
    else if (hour >= 17 && hour <= 19) baseEnergy = 75 - (hour - 17) * 4; // 75, 71, 67
    else if (hour >= 20 && hour <= 22) baseEnergy = 58 - (hour - 20) * 8; // 58, 50, 42
  } else if (element === 'Air') {
    // Air signs: Twin mental peaks morning (9-11 AM) and late afternoon/early evening (4-7 PM)
    if (hour >= 6 && hour <= 8) baseEnergy = 64 + (hour - 6) * 8; // 64, 72, 80
    else if (hour >= 9 && hour <= 11) baseEnergy = 92 + (hour === 10 ? 4 : 0); // 92, 96, 92
    else if (hour >= 12 && hour <= 14) baseEnergy = 72 + (hour === 13 ? -4 : 2); // 74, 68, 74
    else if (hour >= 15 && hour <= 18) baseEnergy = 88 + (hour === 16 ? 4 : 0); // 88, 92, 88, 85
    else if (hour >= 19 && hour <= 22) baseEnergy = 74 - (hour - 19) * 7; // 74, 67, 60, 53
  } else {
    // Water signs: Gentle morning, rises late afternoon and emotional/creative peak in evening (5-9 PM)
    if (hour >= 6 && hour <= 8) baseEnergy = 58 + (hour - 6) * 6; // 58, 64, 70
    else if (hour >= 9 && hour <= 12) baseEnergy = 76 + (hour - 9) * 3; // 76, 79, 82, 85
    else if (hour >= 13 && hour <= 16) baseEnergy = 84 + (Math.cos(hour) * 4); // 80 - 88
    else if (hour >= 17 && hour <= 20) baseEnergy = 90 + (hour === 19 ? 4 : 0); // 90, 92, 94, 88
    else if (hour >= 21 && hour <= 22) baseEnergy = 66 - (hour - 21) * 12; // 66, 54
  }

  // Adjust for moon transit element resonance
  if (element === transit.dominantElement) {
    baseEnergy += 5;
  }

  // Slight deterministic variance per member to reflect individual biological baseline
  const charSum = member.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variance = ((charSum + hour * 7) % 7) - 3; // -3 to +3
  const finalScore = Math.min(98, Math.max(30, Math.round(baseEnergy + variance)));

  return finalScore;
}


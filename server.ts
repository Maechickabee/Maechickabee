import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy/safe initialization of GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Schedule Optimization Endpoint
  app.post('/api/gemini/optimize-schedule', async (req, res) => {
    try {
      const { userProfile, schedule, currentTransit, goals } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.status(200).json({
          optimized: false,
          message: 'Gemini API Key not set, using heuristic astro-flow optimizer',
          blocks: null
        });
      }

      const prompt = `You are AstroFlow AI, an expert executive leadership coach, conscious parenting advisor, and astrological chronotype optimizer.
Analyze the user's daily schedule, astrological profile, and goals to optimize their daily schedule for maximum productivity, leadership impact, parent presence, and positive energy maintenance.

User Profile:
- Name: ${userProfile?.name || 'User'}
- Sun Sign: ${userProfile?.sunSign || 'Aries'}
- Moon Sign: ${userProfile?.moonSign || 'Leo'}
- Rising Sign: ${userProfile?.risingSign || 'Sagittarius'}
- Element: ${userProfile?.element || 'Fire'}
- Chronotype: ${userProfile?.chronotype || 'Bear'}
- Work Role: ${userProfile?.workRole || 'Team Leader'}
- Family Role: ${userProfile?.familyRole || 'Parent of 2'}

Current Astrological Transit:
- Moon in: ${currentTransit?.moonSign || 'Taurus'} (${currentTransit?.moonPhase || 'Waxing Gibbous'})
- Dominant Element Today: ${currentTransit?.dominantElement || 'Earth'}

Current Schedule Blocks:
${JSON.stringify(schedule || [], null, 2)}

Goals / Preferences:
${goals || 'Maximize deep focus in morning, lead high-stakes collaboration mid-day, hold a clear 5:30 PM switchover ritual, and be fully energized and present for family in the evening.'}

Please return a JSON object with:
1. "summary": A brief 2-3 sentence strategic rationale for the schedule optimization.
2. "energyStrategy": 2 key energy management tips to maintain positive energy today based on planetary aspects.
3. "roleSwitchoverTip": A specific 5-minute mindfulness transition practice between work and home.
4. "optimizedBlocks": An array of schedule block items with:
   - "id": string
   - "startTime": "HH:MM"
   - "endTime": "HH:MM"
   - "title": string
   - "category": ("focus" | "leadership" | "parenting" | "mindfulness" | "collaboration" | "challenging_convo" | "wellness" | "switchover")
   - "description": string
   - "energyDemand": ("high" | "medium" | "recharging")
   - "astroAlignmentScore": number (1-100)
   - "astroNote": string
   - "mindfulnessPrompt": optional string prompt for entering this block with calm focus.

Return ONLY valid JSON matching this schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      res.json({
        optimized: true,
        ...parsed,
      });
    } catch (err: any) {
      console.error('Error in /api/gemini/optimize-schedule:', err);
      res.status(500).json({ error: err.message || 'Optimization failed' });
    }
  });

  // AI Astrological Synastry & Conversation Timing Advisor
  app.post('/api/gemini/synastry-timing', async (req, res) => {
    try {
      const { userProfile, counterpart, topic, conversationType, urgency } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.status(200).json({
          fallback: true,
          message: 'Gemini API not configured, providing rule-based astrological synastry guidance.',
        });
      }

      const prompt = `You are an executive leadership and interpersonal communication strategist specializing in psychological archetypes, emotional intelligence, and astrological synastry.

User Profile:
- Name: ${userProfile?.name}
- Sun Sign: ${userProfile?.sunSign}
- Element: ${userProfile?.element}
- Role: ${userProfile?.workRole} / ${userProfile?.familyRole}

Counterpart Profile:
- Name: ${counterpart?.name}
- Type: ${counterpart?.type} (${counterpart?.role})
- Sun Sign: ${counterpart?.zodiacSign}
- Element: ${counterpart?.element || 'Unknown'}
- Communication Style: ${counterpart?.communicationStyle || 'Direct'}
- Conflict Sensitivity: ${counterpart?.conflictSensitivity || 'Moderate'}

Conversation Details:
- Topic: ${topic}
- Type: ${conversationType} (e.g. 'challenging_convo', 'collaboration_brainstorm', 'boundary_setting', 'performance_feedback', 'family_harmony')
- Urgency: ${urgency || 'Normal'}

Provide a strategic interpersonal astrological brief in JSON format:
{
  "bestTimeWindow": "e.g. 10:30 AM - 11:45 AM or 2:30 PM - 3:45 PM",
  "astrologicalReasoning": "Planetary hour & elemental synastry explanation (e.g. Fire-Air harmony, avoiding Mars square)",
  "confrontationRiskLevel": "Low" | "Moderate" | "High",
  "openingScript": "A powerful 2-sentence opening script crafted for their specific zodiac temperament to lower defensiveness",
  "empathyKey": "What they secretly care about or fear based on their sign archetype",
  "tacticsToAvoid": ["1-2 things that trigger friction with their sign"],
  "leaderOrParentTip": "Specific leadership or parental mindfulness anchor to stay grounded throughout",
  "energyPreservationTip": "How to prevent energy drain after this interaction"
}

Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      res.json({
        success: true,
        data: parsed,
      });
    } catch (err: any) {
      console.error('Error in /api/gemini/synastry-timing:', err);
      res.status(500).json({ error: err.message || 'Synastry analysis failed' });
    }
  });

  // AI Energy Reboot & Crisis Reset Advisor
  app.post('/api/gemini/energy-reboot', async (req, res) => {
    try {
      const { userProfile, currentMood, energyLevel, trigger, context } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.status(200).json({
          fallback: true,
          message: 'Gemini API not configured, providing immediate somatic reset.',
        });
      }

      const prompt = `You are an executive wellness, somatic regulation, and mindfulness coach.
The user is experiencing an energy dip, stress, or emotional friction right now.

User:
- Sun Sign: ${userProfile?.sunSign} (${userProfile?.element} element)
- Current Role Context: ${context} (e.g., 'In middle of workday as Leader' or 'About to transition home to Kids' or 'At home with family')
- Current State: Mood "${currentMood}", Energy Level ${energyLevel}/10
- Immediate Trigger: "${trigger}"

Generate an immediate 2-minute actionable positive energy reset protocol in JSON:
{
  "title": "Short catchy name for the reset (e.g. Solar Plexus Grounding)",
  "immediateStep": "10-second somatic action right now (e.g. physiological sigh, drop shoulders, cold water)",
  "mindsetReframe": "2-sentence cognitive reframe tailored to their element (${userProfile?.element})",
  "affirmation": "Strong empowering anchor statement",
  "microAction": "1 simple physical or environmental tweak to maintain positivity for the next 2 hours",
  "roleAdvice": "Specific advice for how to show up with confidence as a ${context === 'work' ? 'Leader' : 'Parent'}"
}

Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      res.json({
        success: true,
        data: parsed,
      });
    } catch (err: any) {
      console.error('Error in /api/gemini/energy-reboot:', err);
      res.status(500).json({ error: err.message || 'Energy reboot failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AstroFlow server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

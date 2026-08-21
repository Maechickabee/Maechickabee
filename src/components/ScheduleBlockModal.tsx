import React, { useState } from 'react';
import { X, Clock, Sparkles, Brain, Briefcase, Heart, ShieldAlert, Feather, Coffee, Smile } from 'lucide-react';
import { ScheduleBlock, BlockCategory, Member } from '../types';

interface ScheduleBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: ScheduleBlock) => void;
  initialBlock?: ScheduleBlock | null;
  dateStr: string;
  members: Member[];
}

export const ScheduleBlockModal: React.FC<ScheduleBlockModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialBlock,
  dateStr,
  members,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialBlock?.title || '');
  const [category, setCategory] = useState<BlockCategory>(initialBlock?.category || 'focus');
  const [startTime, setStartTime] = useState(initialBlock?.startTime || '09:00');
  const [endTime, setEndTime] = useState(initialBlock?.endTime || '10:00');
  const [description, setDescription] = useState(initialBlock?.description || '');
  const [counterpartId, setCounterpartId] = useState(initialBlock?.counterpartId || '');
  const [energyDemand, setEnergyDemand] = useState<'high' | 'medium' | 'recharging'>(initialBlock?.energyDemand || 'medium');
  const [roleContext, setRoleContext] = useState<'work_leader' | 'home_parent' | 'self_care' | 'transition'>(
    initialBlock?.roleContext || 'work_leader'
  );
  const [mindfulnessPrompt, setMindfulnessPrompt] = useState(initialBlock?.mindfulnessPrompt || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlock: ScheduleBlock = {
      id: initialBlock?.id || `block-${Date.now()}`,
      date: dateStr,
      startTime,
      endTime,
      title: title || 'Scheduled Event',
      category,
      description,
      counterpartId: counterpartId || undefined,
      energyDemand,
      roleContext,
      astroAlignmentScore: initialBlock?.astroAlignmentScore || 90,
      astroNote: initialBlock?.astroNote || 'Aligned with daily transit rhythm.',
      mindfulnessPrompt: mindfulnessPrompt || undefined,
      completed: initialBlock?.completed || false,
    };
    onSave(newBlock);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8E2D9] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D9] bg-[#FAF8F5]">
          <h3 className="font-bold text-[#2D2A26] text-base">
            {initialBlock ? 'Edit Schedule Block' : 'Add New Schedule Block'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#3D3A35] mb-1">Block Title</label>
            <input
              id="block-modal-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep Architecture Review, Family Dinner, 1-on-1 with Sarah..."
              className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Category</label>
              <select
                id="block-modal-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as BlockCategory)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="focus">Deep Focus</option>
                <option value="leadership">Leadership Presence</option>
                <option value="parenting">Parent Attunement</option>
                <option value="collaboration">Team Collaboration</option>
                <option value="challenging_convo">Tactical Convo / Feedback</option>
                <option value="switchover">Role Switchover Bridge</option>
                <option value="wellness">Recharge / Wellness</option>
                <option value="mindfulness">Mindfulness</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Role Context</label>
              <select
                id="block-modal-role-context"
                value={roleContext}
                onChange={(e) => setRoleContext(e.target.value as any)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="work_leader">Work Leader 💼</option>
                <option value="home_parent">Home Parent 🏡</option>
                <option value="self_care">Self Care 🧘</option>
                <option value="transition">Role Transition 🌉</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Start Time</label>
              <input
                id="block-modal-start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">End Time</label>
              <input
                id="block-modal-end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Energy Demand</label>
              <select
                id="block-modal-energy-demand"
                value={energyDemand}
                onChange={(e) => setEnergyDemand(e.target.value as any)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="high">High Energy Demand</option>
                <option value="medium">Medium Energy</option>
                <option value="recharging">Recharging / Restorative</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#3D3A35] mb-1">Assign Counterpart (Optional)</label>
              <select
                id="block-modal-counterpart"
                value={counterpartId}
                onChange={(e) => setCounterpartId(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
              >
                <option value="">None / Solo</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.zodiacSign} • {m.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#3D3A35] mb-1">Description / Notes</label>
            <textarea
              id="block-modal-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key objectives, agenda items, or outcomes..."
              className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg p-2.5 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#3D3A35] mb-1">Mindfulness Anchor Prompt (Optional)</label>
            <input
              id="block-modal-mindfulness-prompt"
              type="text"
              value={mindfulnessPrompt}
              onChange={(e) => setMindfulnessPrompt(e.target.value)}
              placeholder="e.g. Inhale grounded clarity, listen without judging..."
              className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#2D2A26] focus:border-[#7C9082] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D9]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#8A817C] hover:text-[#2D2A26] hover:bg-[#F2EDE4] transition"
            >
              Cancel
            </button>
            <button
              id="btn-save-schedule-block"
              type="submit"
              className="bg-[#7C9082] hover:bg-[#6A7E70] text-white font-bold px-5 py-2 rounded-lg shadow-xs transition"
            >
              Save Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

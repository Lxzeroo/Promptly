'use client';

import { AITarget } from '@/types';

const TARGETS: AITarget[] = ['ChatGPT', 'Claude', 'Gemini', 'Cursor', 'GitHub Copilot'];

interface TargetSelectorProps {
  value: AITarget;
  onChange: (target: AITarget) => void;
  disabled?: boolean;
}

export default function TargetSelector({ value, onChange, disabled }: TargetSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-widest text-[#121212]">
        AI Target
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as AITarget)}
          disabled={disabled}
          aria-label="Select AI target"
          className="w-full appearance-none bg-white
                     border-2 border-[#121212] md:border-4
                     shadow-[4px_4px_0px_0px_#121212]
                     px-4 py-3 pr-10
                     font-bold text-sm uppercase tracking-wide text-[#121212]
                     focus:outline-none focus:shadow-[6px_6px_0px_0px_#1040C0] focus:border-[#1040C0]
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-shadow duration-200 cursor-pointer
                     rounded-none"
        >
          {TARGETS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 7L11 1" stroke="#121212" strokeWidth="2.5" strokeLinecap="square"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

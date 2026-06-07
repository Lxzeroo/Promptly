'use client';

import { useState } from 'react';
import TargetSelector from '@/components/TargetSelector';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import PromptOutput from '@/components/PromptOutput';
import { AITarget } from '@/types';

export default function Home() {
  const [target, setTarget] = useState<AITarget>('ChatGPT');
  const [thoughts, setThoughts] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [outputError, setOutputError] = useState('');

  const handleGenerate = async () => {
    setInputError('');
    setOutputError('');
    if (!thoughts.trim()) {
      setInputError('Please enter your thoughts before generating.');
      return;
    }
    setLoading(true);
    setGeneratedPrompt('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thoughts, target }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setOutputError(data.error || 'Unable to generate prompt. Please try again.');
      } else {
        setGeneratedPrompt(data.prompt);
      }
    } catch {
      setOutputError('Unable to generate prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F0F0] overflow-hidden">

      {/* ─────────────────────────────────────────
          HEADER — color-blocked, geometric composition
      ───────────────────────────────────────── */}
      <header className="border-b-4 border-[#121212] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="flex items-stretch min-h-[140px] md:min-h-[180px]">

            {/* Left: wordmark + tagline */}
            <div className="flex-1 flex flex-col justify-center py-8 pr-8 relative z-10">

              {/* Geometric logo mark — three Bauhaus shapes */}
              <div className="flex items-center gap-[5px] mb-4" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-[#D02020]" />
                <div className="w-3 h-3 rounded-none bg-[#1040C0]" />
                {/* Triangle via clip-path */}
                <div
                  className="w-3 h-3 bg-[#F0C020]"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#121212]">
                PROMPTLY
              </h1>
              <p className="mt-3 text-sm md:text-base font-medium text-[#121212]/60 tracking-wide">
                Turn rough thoughts into master prompts.
              </p>
            </div>

            {/* Right panel — Bauhaus blue color block with geometric composition */}
            <div
              className="hidden md:flex w-56 lg:w-72 bg-[#1040C0] border-l-4 border-[#121212]
                         items-center justify-center relative overflow-hidden flex-shrink-0"
              aria-hidden="true"
            >
              {/* Large background circle */}
              <div className="absolute w-48 h-48 rounded-full border-4 border-white/20 -right-12 -top-12" />
              {/* Rotated square */}
              <div className="absolute w-20 h-20 border-4 border-[#F0C020] rotate-45 bottom-4 left-4 opacity-60" />
              {/* Centered filled square */}
              <div className="relative z-10 w-16 h-16 bg-white border-4 border-white flex items-center justify-center">
                {/* Inner triangle */}
                <div
                  className="w-7 h-7 bg-[#D02020]"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* ── Left column: inputs (2/3 width) ── */}
          <div className="w-full lg:flex-1 flex flex-col gap-7">

            {/* Target + input stacked */}
            <div className="w-full sm:w-72">
              <TargetSelector value={target} onChange={setTarget} disabled={loading} />
            </div>

            <PromptInput
              value={thoughts}
              onChange={setThoughts}
              disabled={loading}
              error={inputError}
            />

            <GenerateButton onClick={handleGenerate} loading={loading} disabled={loading} />
          </div>

          {/* ── Vertical divider (desktop) / Horizontal (mobile) ── */}
          <div className="hidden lg:flex flex-col items-center self-stretch gap-2 pt-1" aria-hidden="true">
            <div className="w-[4px] flex-1 bg-[#121212]" />
            {/* Three color squares stacked */}
            <div className="w-3 h-3 bg-[#D02020]" />
            <div className="w-3 h-3 bg-[#F0C020]" />
            <div className="w-3 h-3 bg-[#1040C0]" />
            <div className="w-[4px] flex-1 bg-[#121212]" />
          </div>

          {/* Horizontal divider (mobile/tablet) */}
          <div className="lg:hidden flex items-center gap-0 w-full" aria-hidden="true">
            <div className="h-[3px] flex-1 bg-[#121212]" />
            <div className="w-3 h-3 bg-[#D02020]" />
            <div className="w-3 h-3 bg-[#F0C020]" />
            <div className="w-3 h-3 bg-[#1040C0]" />
          </div>

          {/* ── Right column: output (2/3 width) ── */}
          <div className={`w-full lg:flex-1 ${generatedPrompt || outputError ? 'fade-in-up' : ''}`}>
            <PromptOutput value={generatedPrompt} error={outputError} />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          FOOTER — near-black, Bauhaus
      ───────────────────────────────────────── */}
      <footer className="border-t-4 border-[#121212] bg-[#121212] mt-10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            Promptly v1
          </span>
          {/* Three geometric shapes in footer */}
          <div className="flex items-center gap-[4px]" aria-hidden="true">
            <div className="w-[10px] h-[10px] rounded-full bg-[#D02020]" />
            <div className="w-[10px] h-[10px] rounded-none bg-[#F0C020]" />
            <div
              className="w-[10px] h-[10px] bg-[#1040C0]"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          </div>
        </div>
      </footer>
    </main>
  );
}

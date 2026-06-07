'use client';

import { useState, useRef } from 'react';

interface PromptOutputProps {
  value: string;
  error?: string;
}

export default function PromptOutput({ value, error }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (textareaRef.current) {
        textareaRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Label row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="prompt-output"
          className="text-xs font-bold uppercase tracking-widest text-[#121212]"
        >
          Master Prompt
        </label>
        {value && (
          <span className="text-xs font-medium text-[#121212]/50 tabular-nums">
            {value.length} chars
          </span>
        )}
      </div>

      {/* Output box — always black border + hard shadow */}
      <div className="relative border-2 md:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">
        <textarea
          id="prompt-output"
          ref={textareaRef}
          value={value}
          readOnly
          rows={10}
          aria-label="Generated master prompt"
          aria-live="polite"
          className="w-full resize-none bg-white px-5 py-4
                     font-['JetBrains_Mono',monospace] text-sm leading-[1.75]
                     text-[#121212] placeholder:text-[#B0B0B0] placeholder:italic
                     focus:outline-none rounded-none"
          placeholder="Your master prompt will appear here..."
        />
        {/* Error text inside box */}
        {error && !value && (
          <div className="absolute inset-0 flex items-start px-5 py-4 pointer-events-none bg-white">
            <p className="text-[#D02020] text-sm font-medium leading-relaxed">
              ↑ {error}
            </p>
          </div>
        )}
      </div>

      {/* Copy button — Bauhaus blue secondary style */}
      <button
        onClick={handleCopy}
        disabled={!value || !!error}
        aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
        className={`w-full px-6 py-4
                    border-2 md:border-4 border-[#121212]
                    font-black text-sm uppercase tracking-widest
                    transition-all duration-200 ease-out rounded-none
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                    focus:outline-none focus:ring-2 focus:ring-[#121212] focus:ring-offset-2
                    disabled:opacity-30 disabled:cursor-not-allowed
                    ${copied
                      ? 'bg-[#1040C0] text-white shadow-[4px_4px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020]'
                    }`}
      >
        {copied ? 'Copied ✓' : 'Copy Prompt'}
      </button>
    </div>
  );
}

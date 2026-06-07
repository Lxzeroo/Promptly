'use client';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export default function PromptInput({ value, onChange, disabled, error }: PromptInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="prompt-input"
        className="text-xs font-bold uppercase tracking-widest text-[#121212]"
      >
        Your Thoughts
      </label>

      <div className={`relative transition-shadow duration-200 ${
        error
          ? 'shadow-[4px_4px_0px_0px_#D02020]'
          : 'shadow-[4px_4px_0px_0px_#121212] focus-within:shadow-[6px_6px_0px_0px_#1040C0] focus-within:border-[#1040C0]'
      } border-2 md:border-4 ${error ? 'border-[#D02020]' : 'border-[#121212]'}`}>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={7}
          placeholder={`Build a student finance tracker.\nJava backend.\nModern UI.\nInclude analytics.`}
          aria-label="Enter your rough thoughts"
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
          className="w-full resize-none bg-white px-5 py-4
                     font-['JetBrains_Mono',monospace] text-sm text-[#121212]
                     placeholder:text-[#B0B0B0] placeholder:font-normal
                     focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed
                     leading-[1.75] rounded-none"
        />
      </div>

      {error && (
        <p
          id="input-error"
          role="alert"
          className="text-xs font-bold uppercase tracking-wide text-[#D02020]"
        >
          ↑ {error}
        </p>
      )}
    </div>
  );
}

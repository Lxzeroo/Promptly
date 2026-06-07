'use client';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function GenerateButton({ onClick, loading, disabled }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className="relative w-full
                 bg-[#D02020] text-white
                 border-2 md:border-4 border-[#121212]
                 shadow-[4px_4px_0px_0px_#121212]
                 px-6 py-4
                 font-black text-sm uppercase tracking-widest
                 hover:bg-[#D02020]/90
                 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                 focus:outline-none focus:ring-2 focus:ring-[#121212] focus:ring-offset-2
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-200 ease-out
                 rounded-none overflow-hidden"
    >
      <span className={`transition-opacity duration-150 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        Generate Master Prompt
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center gap-3">
          <span className="flex gap-[6px] items-end">
            <span className="w-[5px] h-[5px] bg-white rounded-none animate-bounce [animation-delay:0ms]" />
            <span className="w-[5px] h-[5px] bg-white rounded-none animate-bounce [animation-delay:150ms]" />
            <span className="w-[5px] h-[5px] bg-white rounded-none animate-bounce [animation-delay:300ms]" />
          </span>
          <span className="font-black text-sm uppercase tracking-widest text-white">
            Refining your idea...
          </span>
        </span>
      )}
    </button>
  );
}

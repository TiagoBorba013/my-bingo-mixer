import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center rounded-[24px] border px-3 py-4 text-center text-[0.82rem] leading-tight transition-all duration-200 select-none min-h-[72px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-gradient-to-br from-[#fde68a] via-[#f59e0b] to-[#f97316] border-[#fbbf24] text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
      : 'bg-gradient-to-br from-[#6366f1]/95 to-[#0ea5e9]/80 border-[#818cf8] text-white shadow-[0_0_24px_rgba(99,102,241,0.3)]'
    : square.isFreeSpace
      ? 'bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_45%)] border-[#38bdf8]/50 text-cyan-100'
      : 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] border-white/10 text-slate-100 hover:border-[#a78bfa] hover:shadow-[0_0_16px_rgba(168,85,247,0.22)] active:border-[#38bdf8]';

  const freeSpaceClasses = square.isFreeSpace ? 'font-semibold tracking-wide' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-xs font-bold text-white">✓</span>
      )}
    </button>
  );
}

import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex min-h-full flex-col px-4 py-5 sm:px-6">
      <header className="glow-panel mb-5 flex items-center justify-between rounded-[32px] border border-white/10 bg-surface/90 px-4 py-4 shadow-[0_30px_90px_rgba(15,23,54,0.35)]">
        <button
          onClick={onReset}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-accent/50 hover:bg-accent/10"
        >
          ← Back
        </button>

        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Galaxy Board</p>
          <h1 className="text-xl font-bold text-white">Bingo Mixer</h1>
        </div>

        <div className="w-16" />
      </header>

      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 rounded-[28px] border border-white/10 bg-surface/80 px-5 py-4 text-center shadow-[0_24px_80px_rgba(15,23,54,0.25)]">
          <p className="text-sm text-slate-300 sm:text-base">
            Tap a square when you match the prompt. Keep your eyes on the glowing line and chase BINGO.
          </p>
        </div>

        {hasBingo && (
          <div className="mb-4 rounded-[28px] border border-[#fbbf24]/20 bg-[#a7720d]/10 px-5 py-4 text-center text-sm font-semibold text-[#f1c40f] shadow-[0_20px_60px_rgba(251,191,36,0.18)]">
            🎉 BINGO! You got a line!
          </div>
        )}

        <div className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-[0_40px_120px_rgba(8,13,35,0.45)]">
          <BingoBoard
            board={board}
            winningSquareIds={winningSquareIds}
            onSquareClick={onSquareClick}
          />
        </div>
      </div>
    </div>
  );
}

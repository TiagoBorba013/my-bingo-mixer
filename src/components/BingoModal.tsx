interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-w-xs rounded-[32px] border border-cyan-300/20 bg-surface-strong/95 p-6 text-center shadow-[0_0_90px_rgba(56,189,248,0.25)]">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] via-[#38bdf8] to-[#fde68a] text-4xl shadow-[0_0_40px_rgba(124,58,237,0.25)]">
          ✨
        </div>
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">BINGO!</h2>
        <p className="mb-6 text-sm text-slate-300">Your line is complete. Keep the galaxy glowing.</p>

        <button
          onClick={onDismiss}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent via-accent-light to-[#38bdf8] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.35)] transition duration-200 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.98]"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">
            Space Galaxy Glow
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_25px_45px_rgba(124,58,237,0.35)]">
            Bingo Mixer
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Discover connections across the room while the board glows with cosmic energy.
          </p>
        </div>

        <div className="glow-panel rounded-[32px] border border-white/10 p-8 shadow-[0_30px_80px_rgba(15,23,54,0.45)] mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">How to play</h2>
          <ul className="space-y-3 text-left text-sm text-slate-300">
            <li>• Find people who match the glowing questions</li>
            <li>• Tap a square when you complete a match</li>
            <li>• Light up 5 squares in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full rounded-[28px] bg-gradient-to-r from-accent via-accent-light to-[#38bdf8] px-8 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.35)] transition duration-200 hover:shadow-[0_0_60px_rgba(56,189,248,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.99] animate-[pulse-slow_3s_ease-in-out_infinite]"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default function BackgroundSketches() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Competitive Programming / ICPC Sketch (Top Right) */}
      <svg
        className="absolute -top-10 -right-10 w-[500px] h-[500px] opacity-10 text-text-1 rotate-12"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        {/* Array / Sorting algorithm sketch */}
        <rect x="20" y="80" width="160" height="40" rx="2" />
        <line x1="60" y1="80" x2="60" y2="120" />
        <line x1="100" y1="80" x2="100" y2="120" />
        <line x1="140" y1="80" x2="140" y2="120" />
        <text x="35" y="105" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none">3</text>
        <text x="75" y="105" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none">1</text>
        <text x="115" y="105" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none">4</text>
        <text x="155" y="105" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none">2</text>
        <path d="M 40 70 Q 60 40, 80 70" strokeDasharray="2 2" markerEnd="url(#arrow)" />
        <text x="40" y="60" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">swap(i, j)</text>
        
        {/* ICPC Balloon */}
        <path d="M 160 30 C 180 10, 190 40, 160 60 C 130 40, 140 10, 160 30 Z" />
        <path d="M 160 60 Q 150 90, 165 120" strokeDasharray="2 2" />
        <text x="175" y="45" fontSize="6" fontFamily="sans-serif" fill="currentColor" stroke="none">AC</text>
      </svg>

      {/* 2. Abstract Code Blocks & AI (Center Left) */}
      <svg
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] opacity-10 text-text-1 -rotate-6"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <rect x="20" y="20" width="160" height="120" rx="4" />
        <line x1="30" y1="40" x2="120" y2="40" />
        <line x1="30" y1="55" x2="150" y2="55" />
        <line x1="30" y1="70" x2="90" y2="70" />
        <line x1="45" y1="85" x2="140" y2="85" />
        <line x1="45" y1="100" x2="100" y2="100" />
        <path d="M 10 10 L 30 10 L 30 -10" strokeDasharray="2 2" />
        <text x="30" y="30" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">model = Sequential([</text>
        <text x="40" y="45" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">Dense(128, activation='relu')</text>
        <text x="40" y="60" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">Dense(64, activation='relu')</text>
        <text x="30" y="75" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">])</text>
        <text x="130" y="110" fontSize="20" fontFamily="monospace" fill="currentColor" stroke="none">{'}'}</text>
      </svg>

      {/* 3. Music Notes & Vocalist Graph (Bottom Right) */}
      <svg
        className="absolute -bottom-10 right-10 w-[450px] h-[450px] opacity-10 text-text-1 rotate-6"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        {/* Staff Lines */}
        <line x1="20" y1="60" x2="180" y2="60" />
        <line x1="20" y1="70" x2="180" y2="70" />
        <line x1="20" y1="80" x2="180" y2="80" />
        <line x1="20" y1="90" x2="180" y2="90" />
        <line x1="20" y1="100" x2="180" y2="100" />
        
        {/* Treble Clef approximate */}
        <path d="M 40 110 C 20 110, 20 80, 40 70 C 60 60, 50 30, 40 30 C 30 30, 30 50, 40 120" strokeWidth="1" />
        
        {/* Notes */}
        <circle cx="80" cy="85" r="4" fill="currentColor" />
        <line x1="84" y1="85" x2="84" y2="50" strokeWidth="1" />
        
        <circle cx="120" cy="75" r="4" fill="currentColor" />
        <line x1="124" y1="75" x2="124" y2="40" strokeWidth="1" />
        
        <circle cx="150" cy="65" r="4" fill="currentColor" />
        <line x1="154" y1="65" x2="154" y2="30" strokeWidth="1" />
        
        {/* Beams */}
        <line x1="124" y1="40" x2="154" y2="30" strokeWidth="2" />
        
        <text x="80" y="140" fontSize="10" fontFamily="serif" fill="currentColor" stroke="none" fontStyle="italic">C Maj / freq = 440Hz</text>
      </svg>
      
      {/* 4. Binary Tree Structure (Top Center) */}
      <svg
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-10 text-text-1"
        viewBox="0 0 300 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="150" cy="20" r="8" />
        <circle cx="100" cy="50" r="6" />
        <circle cx="200" cy="50" r="6" />
        <circle cx="70" cy="80" r="4" />
        <circle cx="130" cy="80" r="4" />
        <circle cx="170" cy="80" r="4" />
        <circle cx="230" cy="80" r="4" />
        
        <line x1="150" y1="28" x2="100" y2="44" />
        <line x1="150" y1="28" x2="200" y2="44" />
        <line x1="100" y1="56" x2="70" y2="76" />
        <line x1="100" y1="56" x2="130" y2="76" />
        <line x1="200" y1="56" x2="170" y2="76" />
        <line x1="200" y1="56" x2="230" y2="76" />
        
        <text x="165" y="25" fontSize="6" fontFamily="monospace" fill="currentColor" stroke="none">O(log n)</text>
      </svg>
    </div>
  );
}

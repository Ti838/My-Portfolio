export default function BackgroundSketches() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Neural Network Sketch (Top Right) */}
      <svg
        className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.03] text-white rotate-12"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <path d="M 20 100 Q 50 20, 100 100 T 180 100" strokeDasharray="4 4" />
        <circle cx="20" cy="100" r="4" />
        <circle cx="60" cy="60" r="3" />
        <circle cx="100" cy="100" r="5" />
        <circle cx="140" cy="140" r="3" />
        <circle cx="180" cy="100" r="4" />
        <line x1="20" y1="100" x2="60" y2="60" />
        <line x1="60" y1="60" x2="100" y2="100" />
        <line x1="100" y1="100" x2="140" y2="140" />
        <line x1="140" y1="140" x2="180" y2="100" />
        <line x1="100" y1="100" x2="180" y2="100" strokeDasharray="2 2" />
        <text x="70" y="50" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">L1_hidden</text>
        <text x="130" y="160" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">L2_output</text>
      </svg>

      {/* 2. Abstract Code Blocks (Center Left) */}
      <svg
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] opacity-[0.02] text-white -rotate-6"
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
        <text x="30" y="30" fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none">function trainModel(data) {'{'} </text>
        <text x="130" y="110" fontSize="20" fontFamily="monospace" fill="currentColor" stroke="none">{'}'}</text>
      </svg>

      {/* 3. Mathematical Formula / Logic Graph (Bottom Right) */}
      <svg
        className="absolute -bottom-10 right-10 w-[450px] h-[450px] opacity-[0.03] text-white rotate-6"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="100" cy="100" r="80" strokeDasharray="8 8" />
        <line x1="20" y1="100" x2="180" y2="100" />
        <line x1="100" y1="20" x2="100" y2="180" />
        <path d="M 20 100 Q 60 20, 100 100 T 180 100" strokeWidth="1" />
        <text x="120" y="40" fontSize="12" fontFamily="serif" fill="currentColor" stroke="none" fontStyle="italic">f(x) = σ(W·x + b)</text>
        <text x="140" y="90" fontSize="8" fontFamily="sans-serif" fill="currentColor" stroke="none">activation</text>
        <circle cx="60" cy="60" r="2" fill="currentColor" />
        <circle cx="140" cy="140" r="2" fill="currentColor" />
      </svg>
      
      {/* 4. Binary Tree Structure (Top Center) */}
      <svg
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-[0.02] text-white"
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

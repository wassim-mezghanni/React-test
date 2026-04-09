import { LoginForm } from './LoginForm';
import { useCountUp } from './useCountUp';

/* ── Mini-chart components (Feature 3) ── */

/** Staggered bar chart — Remotion spring({ delay: i * STAGGER }) */
function MiniBarChart({ delay }: { delay: number }) {
  const heights = [60, 85, 45, 100, 70];
  return (
    <div className="flex items-end gap-[2px] h-5 mt-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-emerald-400/70 animate-bar-grow"
          style={{
            height: `${h}%`,
            animationDelay: `${delay + i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

/** SVG sparkline — Remotion evolvePath() stroke draw */
function MiniSparkline({ delay }: { delay: number }) {
  return (
    <svg className="w-16 h-4 mt-1.5" viewBox="0 0 64 16">
      <path
        d="M2,14 L12,10 L22,12 L32,6 L42,8 L52,3 L62,5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="animate-sparkline-draw"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}

/** Circular progress ring — Remotion interpolate stroke-dashoffset */
function MiniRing({ percent, delay }: { percent: number; delay: number }) {
  const r = 7;
  const circumference = 2 * Math.PI * r;
  const target = circumference - (percent / 100) * circumference;
  return (
    <svg className="w-5 h-5 mt-1 -rotate-90" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r={r} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle
        cx="9" cy="9" r={r} fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        className="animate-ring-fill"
        style={{
          '--ring-circumference': circumference,
          '--ring-target': target,
          animationDelay: `${delay}s`,
        } as React.CSSProperties}
      />
    </svg>
  );
}

/* ── 6 curved flow paths: hub → each node (Feature 2) ── */
const flowPaths = [
  // Hub → Top Left (Efficiency) — sweeps left then up
  { d: 'M200,200 C160,190 120,150 75,75', delay: 0.3 },
  // Hub → Top Right (AI Prediction) — sweeps right then up
  { d: 'M200,200 C240,190 280,150 325,75', delay: 0.45 },
  // Hub → Left (CSV Import) — gentle downward arc to left
  { d: 'M200,200 C170,230 110,230 35,200', delay: 0.55 },
  // Hub → Right (Analytics) — gentle upward arc to right
  { d: 'M200,200 C230,170 290,170 365,200', delay: 0.65 },
  // Hub → Bottom Left (Database) — sweeps left then down
  { d: 'M200,200 C160,210 120,250 75,325', delay: 0.75 },
  // Hub → Bottom Right (SAP) — sweeps right then down
  { d: 'M200,200 C240,210 280,250 325,325', delay: 0.85 },
];

export default function Login() {
  // Feature 6: Counter animations with spring overshoot
  const efficiency = useCountUp(30.5, 1200, 1000);
  const optimization = useCountUp(12, 1400, 900);
  const revenue = useCountUp(8.2, 1600, 1000);
  const syncPercent = useCountUp(78, 1800, 1100);

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Login Form */}
      <section className="w-full md:w-1/2 bg-surface-container-lowest dot-grid relative flex flex-col items-center justify-center p-8 md:p-16 lg:p-24">
        {/* Branding */}
        <div className="absolute top-12 left-12">
          <span className="text-primary-container font-heading font-extrabold text-2xl tracking-tighter">
            Querai
          </span>
        </div>

        <LoginForm />

        {/* Footer */}
        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center opacity-40 pointer-events-none">
          <span className="font-sans text-[10px] uppercase tracking-widest font-medium">
            &copy; 2026 QUERAI
          </span>
          <span className="font-sans text-[10px] uppercase tracking-widest font-medium">
            VERSION 1.0
          </span>
        </div>
      </section>

      {/* Right Side: Visualization — all 6 Remotion-inspired features */}
      <section className="hidden md:flex w-1/2 bg-gradient-to-br from-[#EEF2FF] via-white/50 to-primary/5 relative items-center justify-center p-12 overflow-hidden">
        {/* Background blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-container/5 blur-[120px] rounded-full" />
        {/* Radial vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.2)_100%)] pointer-events-none" />

        {/* FEATURE 4: Cinematic light sweep overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
          <div
            className="absolute w-[200%] h-24 animate-light-sweep"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(26,77,46,0.04) 30%, rgba(255,255,255,0.12) 50%, rgba(26,77,46,0.04) 70%, transparent 100%)',
              top: '30%',
              left: '-50%',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* FEATURE 5: 3D Perspective scene wrapper */}
        <div className="relative z-10 w-full max-w-2xl text-center space-y-12 animate-perspective-scene">
          {/* Visualization Area */}
          <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">

            {/* SVG Flow Paths — 6 curved bezier lines, masked behind hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="marker-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Mask: hide everything inside the hub circle */}
                <mask id="hub-mask">
                  <rect width="400" height="400" fill="white" />
                  <circle cx="200" cy="200" r="78" fill="black" />
                </mask>
              </defs>

              {/* All paths + markers masked — lines stop at hub edge */}
              <g mask="url(#hub-mask)">
                {flowPaths.map((fp, i) => (
                  <g key={i}>
                    <path
                      className="animate-path-draw"
                      d={fp.d}
                      fill="none"
                      stroke="#1a4d2e"
                      strokeWidth="1.2"
                      filter="url(#glow)"
                      style={{ animationDelay: `${fp.delay}s` }}
                    />
                    {/* Glowing marker traveling along the curve */}
                    <circle
                      r="3"
                      fill="#1a4d2e"
                      filter="url(#marker-glow)"
                      className="animate-marker"
                      style={{
                        offsetPath: `path('${fp.d}')`,
                        animationDelay: `${fp.delay + 1.8}s`,
                        animationDuration: `${2.8 + i * 0.2}s`,
                      } as React.CSSProperties}
                    />
                  </g>
                ))}
              </g>
            </svg>

            {/* Data Pulse Dots — eased with glow trails */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-up" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-down" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-left" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-right" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-bottom-left" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-bottom-right" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-center-left" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-center-right" />
            </div>

            <div className="w-full h-full relative">
              {/* Central AI Hub — Spring entrance → breathing idle */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                {/* FEATURE 1: Orbiting Radar Rings */}
                {/* Ring 1 — outermost, slow spin */}
                <div className="absolute w-52 h-52 animate-radar-ring-1">
                  <svg className="w-full h-full animate-radar-spin-slow" viewBox="0 0 208 208">
                    <circle cx="104" cy="104" r="100" fill="none" stroke="#1a4d2e" strokeWidth="0.5" opacity="0.12" strokeDasharray="4 8" />
                    {/* Bright arc segment */}
                    <circle cx="104" cy="104" r="100" fill="none" stroke="#1a4d2e" strokeWidth="1.5" opacity="0.3"
                      strokeDasharray="40 588" strokeLinecap="round" className="animate-radar-arc-pulse" />
                  </svg>
                </div>
                {/* Ring 2 — middle, reverse spin */}
                <div className="absolute w-44 h-44 animate-radar-ring-2">
                  <svg className="w-full h-full animate-radar-spin-reverse" viewBox="0 0 176 176">
                    <circle cx="88" cy="88" r="84" fill="none" stroke="#1a4d2e" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 10" />
                    <circle cx="88" cy="88" r="84" fill="none" stroke="#1a4d2e" strokeWidth="1" opacity="0.25"
                      strokeDasharray="30 498" strokeLinecap="round" className="animate-radar-arc-pulse" style={{ animationDelay: '1.5s' }} />
                  </svg>
                </div>
                {/* Ring 3 — inner, fast spin */}
                <div className="absolute w-[10.5rem] h-[10.5rem] animate-radar-ring-3">
                  <svg className="w-full h-full animate-radar-spin" viewBox="0 0 168 168">
                    <circle cx="84" cy="84" r="80" fill="none" stroke="#1a4d2e" strokeWidth="0.5" opacity="0.08" strokeDasharray="2 6" />
                    <circle cx="84" cy="84" r="80" fill="none" stroke="#1a4d2e" strokeWidth="1" opacity="0.2"
                      strokeDasharray="25 478" strokeLinecap="round" className="animate-radar-arc-pulse" style={{ animationDelay: '0.8s' }} />
                  </svg>
                </div>

                {/* Outer glow */}
                <div className="absolute w-44 h-44 rounded-full bg-primary/10 blur-2xl animate-hub-glow-ring" />
                {/* Glass circle — spring scale entrance */}
                <div className="relative w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(26,77,46,0.15)] flex items-center justify-center animate-hub-entrance">
                  {/* Inner glow ring */}
                  <div className="absolute inset-2 rounded-full border border-primary/10" />
                  {/* Icon — breathes after entrance */}
                  <span className="icon text-5xl text-primary drop-shadow-[0_0_12px_rgba(26,77,46,0.3)] animate-hub-breathe">auto_awesome</span>
                </div>
              </div>

              {/* Efficiency Node (Top Left) — entrance #1 + drift + MINI BAR CHART + COUNTER */}
              <div className="absolute top-0 left-0 z-20 animate-node-enter-1 animate-drift">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-emerald-50/80 rounded-lg flex items-center justify-center text-emerald-600">
                    <span className="icon">trending_up</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Efficiency</p>
                    <p className="text-xs font-semibold">+{efficiency.toFixed(1)}% Boost</p>
                    <MiniBarChart delay={1.3} />
                  </div>
                </div>
              </div>

              {/* AI Prediction Node (Top Right) — entrance #2 + drift-alt + SPARKLINE + COUNTER */}
              <div className="absolute top-0 right-0 z-20 animate-node-enter-2 animate-drift-alt">
                <div className="bg-primary-container/70 backdrop-blur-lg p-5 rounded-2xl shadow-2xl text-on-primary border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">insights</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Prediction</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Optimization: {optimization.toFixed(0)}%</p>
                  <MiniSparkline delay={1.5} />
                </div>
              </div>

              {/* CSV Import Node (Left) — entrance #3 + drift */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 animate-node-enter-3 animate-drift">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-amber-50/80 rounded-lg flex items-center justify-center text-amber-600">
                    <span className="icon">description</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">CSV Import</p>
                    <MiniBarChart delay={1.7} />
                  </div>
                </div>
              </div>

              {/* Analytics Node (Right) — entrance #4 + drift-alt + SPARKLINE + COUNTER */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 animate-node-enter-4 animate-drift-alt">
                <div className="bg-primary-container/70 backdrop-blur-lg p-5 rounded-2xl shadow-2xl text-on-primary border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">analytics</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Analysis</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Revenue: +{revenue.toFixed(1)}%</p>
                  <MiniSparkline delay={1.9} />
                </div>
              </div>

              {/* Database Node (Bottom Left) — entrance #5 + drift-alt + RING + COUNTER */}
              <div className="absolute bottom-0 left-0 z-20 animate-node-enter-5 animate-drift-alt">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-indigo-50/80 rounded-lg flex items-center justify-center text-indigo-600">
                    <span className="icon">storage</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Cloud Database</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold">{syncPercent.toFixed(0)}% Synced</p>
                      <MiniRing percent={78} delay={2.0} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SAP Node (Bottom Right) — entrance #6 + drift + BAR CHART */}
              <div className="absolute bottom-0 right-0 z-20 animate-node-enter-6 animate-drift">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-blue-50/80 rounded-lg flex items-center justify-center text-blue-600">
                    <span className="icon">database</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">SAP S/4HANA</p>
                    <p className="text-xs font-semibold">Financial Ledger</p>
                    <MiniBarChart delay={2.2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan — Glass Box with delayed entrance */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-4 animate-slogan-entrance">
            <h3 className="text-2xl font-heading font-extrabold text-primary-container tracking-tight">
              Predictive Clarity. Enterprise Intelligence. Quatelio Powered.
            </h3>
          </div>
        </div>

        {/* Dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none dot-grid opacity-[0.03]" />
      </section>
    </main>
  );
}

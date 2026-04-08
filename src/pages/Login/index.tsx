import { LoginForm } from './LoginForm';

export default function Login() {
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
            © 2026 QUERAI
          </span>
          <span className="font-sans text-[10px] uppercase tracking-widest font-medium">
            VERSION 1.0
          </span>
        </div>
      </section>

      {/* Right Side: Visualization — Remotion-inspired orchestrated animation */}
      <section className="hidden md:flex w-1/2 bg-gradient-to-br from-[#EEF2FF] via-white/50 to-primary/5 relative items-center justify-center p-12 overflow-hidden">
        {/* Background blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-container/5 blur-[120px] rounded-full" />
        {/* Radial vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.2)_100%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
          {/* Visualization Area */}
          <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
            {/* SVG Flow Paths — animated draw-in from center */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Center → Top Left */}
              <path className="animate-path-draw" d="M200,200 L80,80" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" />
              {/* Center → Top Right */}
              <path className="animate-path-draw" d="M200,200 L320,80" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.4s' }} />
              {/* Center → Left */}
              <path className="animate-path-draw" d="M200,200 L40,200" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.5s' }} />
              {/* Center → Right */}
              <path className="animate-path-draw" d="M200,200 L360,200" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.6s' }} />
              {/* Center → Bottom Left */}
              <path className="animate-path-draw" d="M200,200 L80,320" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.7s' }} />
              {/* Center → Bottom Right */}
              <path className="animate-path-draw" d="M200,200 L320,320" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.8s' }} />
              {/* Center → Bottom */}
              <path className="animate-path-draw" d="M200,200 L200,340" fill="none" stroke="#1a4d2e" strokeWidth="1.5" filter="url(#glow)" style={{ animationDelay: '0.9s' }} />
            </svg>

            {/* Data Pulse Dots — eased with glow trails, 8 directions */}
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
                {/* Outer glow — fades in with hub */}
                <div className="absolute w-44 h-44 rounded-full bg-primary/10 blur-2xl animate-hub-glow-ring" />
                {/* Glass circle — spring scale entrance */}
                <div className="relative w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(26,77,46,0.15)] flex items-center justify-center animate-hub-entrance">
                  {/* Inner glow ring */}
                  <div className="absolute inset-2 rounded-full border border-primary/10" />
                  {/* Icon — breathes after entrance */}
                  <span className="icon text-5xl text-primary drop-shadow-[0_0_12px_rgba(26,77,46,0.3)] animate-hub-breathe">auto_awesome</span>
                </div>
              </div>

              {/* Efficiency Node (Top Left) — entrance #1 + drift */}
              <div className="absolute top-0 left-0 z-20 animate-node-enter-1 animate-drift">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-emerald-50/80 rounded-lg flex items-center justify-center text-emerald-600">
                    <span className="icon">trending_up</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Efficiency</p>
                    <p className="text-xs font-semibold">+30.5% Boost</p>
                  </div>
                </div>
              </div>

              {/* AI Prediction Node (Top Right) — entrance #2 + drift-alt */}
              <div className="absolute top-0 right-0 z-20 animate-node-enter-2 animate-drift-alt">
                <div className="bg-primary-container/70 backdrop-blur-lg p-5 rounded-2xl shadow-2xl text-on-primary border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">insights</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Prediction</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Optimization Potential: 12%</p>
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
                  </div>
                </div>
              </div>

              {/* Analytics Node (Right) — entrance #4 + drift-alt */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 animate-node-enter-4 animate-drift-alt">
                <div className="bg-primary-container/70 backdrop-blur-lg p-5 rounded-2xl shadow-2xl text-on-primary border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">analytics</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Analysis</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Revenue: +8.2%</p>
                </div>
              </div>

              {/* Database Node (Bottom Left) — entrance #5 + drift-alt */}
              <div className="absolute bottom-0 left-0 z-20 animate-node-enter-5 animate-drift-alt">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-indigo-50/80 rounded-lg flex items-center justify-center text-indigo-600">
                    <span className="icon">storage</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Cloud Database</p>
                    <p className="text-xs font-semibold">Real-time Sync</p>
                  </div>
                </div>
              </div>

              {/* SAP Node (Bottom Right) — entrance #6 + drift */}
              <div className="absolute bottom-0 right-0 z-20 animate-node-enter-6 animate-drift">
                <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 bg-blue-50/80 rounded-lg flex items-center justify-center text-blue-600">
                    <span className="icon">database</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">SAP S/4HANA</p>
                    <p className="text-xs font-semibold">Financial Ledger</p>
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

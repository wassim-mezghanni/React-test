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

      {/* Right Side: Visualization */}
      <section className="hidden md:flex w-1/2 bg-[#EEF2FF] relative items-center justify-center p-12 overflow-hidden">
        {/* Background blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-container/5 blur-[120px] rounded-full" />

        <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
          {/* Visualization Area */}
          <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
            {/* SVG Flow Paths */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 400">
              {/* Center → Bottom */}
              <path d="M200,320 L200,230" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Top Left */}
              <path d="M200,200 L80,80" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Top Right */}
              <path d="M200,200 L320,80" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Left */}
              <path d="M170,200 L40,200" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Right */}
              <path d="M230,200 L360,200" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Bottom Left */}
              <path d="M200,230 L80,320" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
              {/* Center → Bottom Right (SAP) */}
              <path d="M200,230 L320,320" fill="none" stroke="#1a4d2e" strokeDasharray="4 4" strokeWidth="2" />
            </svg>

            {/* Data Pulse Dots */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-container rounded-full animate-data-pulse-up" />
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-container rounded-full animate-data-pulse-up [animation-delay:1s]" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-branch-left [animation-delay:2s]" />
              <div className="absolute w-2 h-2 bg-primary-container rounded-full animate-data-pulse-branch-right [animation-delay:2s]" />
            </div>

            <div className="w-full h-full relative">
              {/* Central AI Hub — Glassmorphic Circle */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                {/* Outer glow */}
                <div className="absolute w-44 h-44 rounded-full bg-primary/10 blur-2xl animate-pulse" />
                {/* Glass circle */}
                <div className="relative w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(26,77,46,0.15)] flex items-center justify-center">
                  {/* Inner glow ring */}
                  <div className="absolute inset-2 rounded-full border border-primary/10" />
                  {/* Icon */}
                  <span className="icon text-5xl text-primary drop-shadow-[0_0_12px_rgba(26,77,46,0.3)] animate-pulse">auto_awesome</span>
                </div>
              </div>

              {/* Efficiency Node (Top Left) */}
              <div className="absolute top-0 left-0 z-20 animate-float">
                <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <span className="icon">trending_up</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Efficiency</p>
                    <p className="text-xs font-semibold">+30.5% Boost</p>
                  </div>
                </div>
              </div>

              {/* AI Prediction Node (Top Right) */}
              <div className="absolute top-0 right-0 z-20 animate-float-delayed">
                <div className="bg-primary-container p-5 rounded-2xl shadow-2xl text-on-primary">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">insights</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Prediction</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Optimization Potential: 12%</p>
                </div>
              </div>

              {/* CSV Import Node (Left) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 animate-float">
                <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                    <span className="icon">description</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">CSV Import</p>

                  </div>
                </div>
              </div>

              {/* Analytics Node (Right) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 animate-float-delayed">
                <div className="bg-primary-container p-5 rounded-2xl shadow-2xl text-on-primary">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="icon text-sm">analytics</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Analysis</p>
                  </div>
                  <p className="text-sm font-heading font-bold">Revenue: +8.2%</p>
                </div>
              </div>

              {/* Database Node (Bottom Left) */}
              <div className="absolute bottom-0 left-0 z-20 animate-float-delayed">
                <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <span className="icon">storage</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Cloud Database</p>
                    <p className="text-xs font-semibold">Real-time Sync</p>
                  </div>
                </div>
              </div>

              {/* SAP Node (Bottom Right) */}
              <div className="absolute bottom-0 right-0 z-20 animate-float">
                <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
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
          {/* Description */}
          <div className="space-y-4 px-12">
            <h3 className="text-2xl font-heading font-extrabold text-primary-container tracking-tight">
              Enterprise Intelligence
            </h3>
            <p className="text-on-surface-variant leading-relaxed max-w-sm mx-auto">
              Querai bridges the gap between complex SAP datasets and actionable executive clarity through proprietary neural forecasting and analytics.
            </p>
          </div>
        </div>

        {/* Dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none dot-grid opacity-[0.03]" />
      </section>
    </main>
  );
}

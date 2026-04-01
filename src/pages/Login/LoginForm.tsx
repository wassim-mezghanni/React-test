import { Input } from '../../components/form/Input';
import { useLogin } from './useLogin';

export function LoginForm() {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin();

  return (
    <div className="w-full max-w-md space-y-10 relative z-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight leading-tight">
          Welcome back to the future of finance.
        </h1>
        <p className="text-on-surface-variant text-lg">
          Sign in to your financial command center.
        </p>
      </header>

      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-heading">
              Password
            </label>
            <a href="#" className="text-xs font-semibold text-primary-container hover:underline transition-all">
              Forgot?
            </a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-container-high border-none rounded-lg p-4 font-sans text-on-surface placeholder:text-outline transition-all duration-300 focus:ring-4 focus:ring-primary/10 focus:bg-surface-container-lowest focus:outline-none"
          />
        </div>

        {error && (
          <p className="text-xs font-bold text-error px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary-container hover:bg-primary text-on-primary font-heading font-bold text-lg rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <span className="icon text-xl">arrow_forward</span>}
        </button>
      </form>

      <div className="pt-8 border-t border-outline-variant/15 flex flex-col gap-4">
        <button className="w-full h-12 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-heading font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors">
          <span className="icon">key</span>
          Single Sign-On (SSO)
        </button>
        <p className="text-center text-on-surface-variant text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-primary-container font-bold hover:underline">
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
}

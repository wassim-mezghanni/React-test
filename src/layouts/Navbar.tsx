import { Button } from '../components/ui/Button.tsx';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="flex items-center gap-12">
        <span className="text-2xl font-black tracking-tighter text-primary font-heading">
          Querai
        </span>
        <nav className="hidden md:flex gap-8">
          <a className="font-heading text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">Portfolio</a>
          <a className="font-heading text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">Insights</a>
          <a className="font-heading text-sm font-bold text-primary border-b-2 border-primary pb-1" href="#">Design Library</a>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-primary/5 transition-all">
          <span className="icon text-primary">notifications</span>
        </button>
        <Button variant="primary" icon="magic_button" className="hidden lg:flex">
          New Analysis
        </Button>
      </div>
    </header>
  );
}

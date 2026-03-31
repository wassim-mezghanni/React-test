const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 text-center">
      <div className="container mx-auto px-6 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-bg-surface border border-surface-border text-sm font-medium text-accent mb-6 backdrop-blur-md">
          Now Powered by Tailwind CSS v4
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] mb-6">
          Build the <span className="gradient-text">Future</span> of Web Apps
        </h1>
        
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
          A premium React foundation designed for performance, scalability, and stunning visual impact. 
          Start your next masterpiece today.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button className="px-8 py-3.5 rounded-xl text-lg font-semibold bg-primary text-white shadow-[0_4px_15px_var(--color-primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--color-primary-glow)] transition-all">
            Get Started Free
          </button>
          <button className="px-8 py-3.5 rounded-xl text-lg font-semibold bg-white/10 text-white border border-surface-border hover:bg-white/15 transition-all">
            View Documentation
          </button>
        </div>
        
        <div className="relative h-[400px] rounded-3xl mt-10 overflow-hidden glass z-[-1]">
          <div className="w-full h-full flex justify-center items-center">
             <div className="absolute w-[300px] h-[300px] rounded-full bg-primary blur-[80px] opacity-30 animate-pulse left-[20%] top-[10%]"></div>
             <div className="absolute w-[300px] h-[300px] rounded-full bg-accent blur-[80px] opacity-30 animate-pulse right-[20%] bottom-[10%] delay-[-5s]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

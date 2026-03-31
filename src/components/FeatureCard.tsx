interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="group relative p-8 rounded-2xl glass transition-all hover:-translate-y-2 hover:border-primary hover:shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="w-12 h-12 rounded-xl bg-bg-surface border border-surface-border flex items-center justify-center mb-5 text-2xl transition-all group-hover:bg-primary group-hover:border-primary group-hover:rotate-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;

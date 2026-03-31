export interface ChipProps {
  label: string;
  icon?: string;
  onDelete?: () => void;
  className?: string;
  active?: boolean;
}

export function Chip({
  label,
  icon,
  onDelete,
  className = '',
  active = false
}: ChipProps) {
  const baseStyles = "inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-label text-sm font-medium transition-all duration-300 select-none";
  
  const activeStyles = active 
    ? "bg-primary-container text-on-primary shadow-sm" 
    : "bg-secondary-container text-on-secondary-container hover:bg-on-secondary-container hover:text-white";

  return (
    <div className={`${baseStyles} ${activeStyles} ${className}`}>
      {icon && <span className="icon text-[1.2em]">{icon}</span>}
      <span className="leading-tight tracking-tight uppercase text-[0.75rem] font-bold">{label}</span>
      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="hover:scale-110 active:scale-95 transition-transform"
        >
          <span className="icon text-[1em]">close</span>
        </button>
      )}
    </div>
  );
};

export default Chip;

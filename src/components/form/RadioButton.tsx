import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}>
      <div className="relative">
        <input 
          type="radio" 
          className="peer sr-only" 
          {...props} 
        />
        <div className="
          w-5 h-5 rounded-full border-none 
          bg-surface-container-highest 
          flex items-center justify-center 
          transition-all duration-300 
          peer-checked:bg-primary-container 
          peer-checked:scale-110 
          group-hover:bg-outline/20
        ">
          <div className="
            w-2 h-2 rounded-full bg-white 
            opacity-0 
            peer-checked:opacity-100 
            transition-opacity
          "></div>
        </div>
      </div>
      <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
        {label}
      </span>
    </label>
  );
};

export default Radio;

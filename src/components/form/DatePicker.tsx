import React from 'react';

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const baseInputStyles = `
    w-full 
    bg-surface-container-high 
    border-none 
    rounded-lg 
    p-4 
    font-body 
    text-on-surface 
    placeholder:text-outline 
    transition-all 
    duration-300 
    focus:ring-2 
    focus:ring-primary/20 
    focus:bg-surface-container-lowest 
    focus:outline-none
    appearance-none
    cursor-pointer
    ${error ? 'ring-2 ring-error/20 bg-error/5' : ''}
  `;

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1 font-heading">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <input 
          ref={ref} 
          type="date" 
          className={baseInputStyles} 
          {...props} 
        />
        <span className="icon absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-focus-within:scale-110 transition-transform duration-300">
          calendar_today
        </span>
      </div>
      
      {error && <p className="text-xs font-bold text-error mt-1 px-1">{error}</p>}
      {!error && helperText && <p className="text-xs text-on-surface-variant/70 mt-1 px-1">{helperText}</p>}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

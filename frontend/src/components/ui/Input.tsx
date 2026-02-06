import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
      return (
        <div className="w-full">
          {label && (
            <label className="block text-sm font-medium text-accent-gray mb-2">{label}</label>
          )}
          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-darkGray">
                {leftIcon}
              </div>
            )}
            <input
              ref={ref}
              className={cn(
                'w-full px-4 py-3 bg-dark-lighter border border-white/10 rounded-xl text-accent placeholder:text-accent-darkGray',
                'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
                'transition-all duration-300',
                leftIcon && 'pl-10',
                rightIcon && 'pr-10',
                error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                className
              )}
              {...props}
            />
            {rightIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-darkGray">
                {rightIcon}
              </div>
            )}
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;

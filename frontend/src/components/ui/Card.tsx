import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'glass',
  hover = true,
  children,
  ...props
}) => {
  const variants = {
    glass: 'glass',
    solid: 'bg-dark-lighter',
    outline: 'border border-white/10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:-translate-y-1 hover:shadow-cardHover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

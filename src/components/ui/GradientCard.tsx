import React from 'react';
import { cn } from '@/lib/utils';

type GradientCardProps = {
  children: React.ReactNode;
  className?: string;
  gradient: 'yellow' | 'blue' | 'orange';
};

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className,
  gradient,
}) => {
  const gradients = {
    yellow: 'bg-gradient-to-br from-amber-300 to-amber-500',
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    orange: 'bg-gradient-to-br from-orange-400 to-red-500',
  };

  return (
    <div className={cn(
      'rounded-3xl p-8 text-white shadow-xl',
      gradients[gradient],
      className
    )}>
      {children}
    </div>
  );
};

export default GradientCard;
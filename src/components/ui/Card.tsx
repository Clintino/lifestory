import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  selected?: boolean;
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  selected = false,
}) => {
  const baseStyles = 'bg-white rounded-2xl shadow-lg overflow-hidden';
  const hoverStyles = hoverable ? 'cursor-pointer transition-all duration-300' : '';
  const selectedStyles = selected ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : '';
  
  const cardStyles = cn(baseStyles, hoverStyles, selectedStyles, className);
  
  if (hoverable) {
    return (
      <motion.div
        className={cardStyles}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
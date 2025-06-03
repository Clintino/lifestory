import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  onClick,
  type = 'button',
  disabled = false,
  icon,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full';
  
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
    text: 'bg-transparent text-primary hover:bg-primary/5',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };
  
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  const buttonStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className
  );
  
  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );
  
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link to={to} className={buttonStyles}>
          {content}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
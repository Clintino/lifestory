import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradient,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        'rounded-3xl p-6 aspect-square flex flex-col items-center justify-center text-center',
        gradient
      )}
    >
      <div className="mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
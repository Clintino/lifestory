import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const headlines = [
  "Give your children the story of their grandmother",
  "The questions you'll wish you asked -- before it's too late.",
  "Let your parents speak to your kids -- across time.",
  "Preserve her voice. Share her story. Keep her legacy.",
  "One conversation today. A story they'll treasure forever."
];

const RotatingHeadline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[120px] md:h-[140px] lg:h-[160px] mb-8">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-[#1C1B1F] text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight absolute w-full"
        >
          {headlines[currentIndex].split('grandmother').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && (
                <span className="text-[#E75A68]">grandmother</span>
              )}
            </React.Fragment>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default RotatingHeadline;
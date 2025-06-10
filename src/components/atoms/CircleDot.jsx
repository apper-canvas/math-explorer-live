import React from 'react';
import { motion } from 'framer-motion';

const CircleDot = ({ colorClass, delay, ...props }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: delay,
        duration: 0.2,
        ease: "easeOut"
      }}
      className={`w-4 h-4 rounded-full transition-colors duration-300 ${colorClass}`}
      {...props}
    />
  );
};

export default CircleDot;
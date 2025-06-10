import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const HomeHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <Text type="h1" className="text-4xl md:text-5xl font-display text-primary mb-4">
        Welcome to Math Explorer
      </Text>
      <Text type="p" className="text-lg text-surface-600 max-w-2xl mx-auto">
        Master multiplication and division through visual learning and interactive practice. 
        Choose a module below to start your mathematical journey!
      </Text>
    </motion.div>
  );
};

export default HomeHero;
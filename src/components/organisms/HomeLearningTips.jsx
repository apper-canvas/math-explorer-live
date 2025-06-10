import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/molecules/InfoCard';

const HomeLearningTips = () => {
  const tips = [
    '• Use the visual aids to understand how numbers work together',
    '• Practice a little bit each day for the best results',
    '• Don\'t worry about speed at first - focus on understanding',
    '• Celebrate your progress, no matter how small!',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8"
    >
      <InfoCard 
        title="Learning Tips" 
        tips={tips} 
        icon="Lightbulb" 
        iconBgColor="info"
        bgColorFrom="info/10"
        bgColorTo="primary/10"
      />
    </motion.div>
  );
};

export default HomeLearningTips;
import React from 'react';
import { motion } from 'framer-motion';
import FactsDisplaySection from '@/components/organisms/FactsDisplaySection';
import InfoCard from '@/components/molecules/InfoCard';

const ProgressTipsSection = ({ masteredFacts, masteredCount }) => {
  const tips = [
    '• Practice a little bit each day for best results',
    '• Use the visual aids to understand patterns',
    '• Focus on facts you find challenging',
    '• Celebrate every improvement, no matter how small!',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <FactsDisplaySection masteredFacts={masteredFacts} masteredCount={masteredCount} />

      <InfoCard 
        title="Practice Tips" 
        tips={tips} 
        icon="Lightbulb" 
        iconBgColor="info"
        bgColorFrom="info/10"
        bgColorTo="primary/10"
      />
    </motion.div>
  );
};

export default ProgressTipsSection;
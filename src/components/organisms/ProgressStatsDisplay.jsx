import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const ProgressStatsDisplay = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </motion.div>
  );
};

export default ProgressStatsDisplay;
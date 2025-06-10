import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/atoms/Text';
import StatValue from '@/components/atoms/StatValue';
import Button from '@/components/atoms/Button';

const HomeProgressSummary = () => {
  const navigate = useNavigate();
  // These are placeholder values for the home page.
  // Full progress is shown on the dedicated progress page.
  const stats = [
    { label: 'Problems Solved', value: 0, color: 'accent' },
    { label: 'Accuracy', value: '0%', color: 'secondary' },
    { label: 'Facts Mastered', value: 0, color: 'success' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Text type="h3" className="text-xl font-semibold text-surface-800">Your Progress</Text>
        <Button
          onClick={() => navigate('/progress')}
          className="text-primary hover:text-primary/80 font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <StatValue value={stat.value} colorClass={`text-${stat.color}`} className="text-2xl mb-1" />
            <Text type="div" className="text-sm text-surface-600">{stat.label}</Text>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeProgressSummary;
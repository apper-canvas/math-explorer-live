import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const ProgressHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center">
            <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
          </div>
          <div>
            <Text type="h1" className="text-3xl font-display text-surface-800">Your Progress</Text>
            <Text type="p" className="text-surface-600">Track your math learning journey</Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressHeader;
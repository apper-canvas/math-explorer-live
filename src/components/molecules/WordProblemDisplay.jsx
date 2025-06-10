import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const WordProblemDisplay = ({ problem }) => {
  if (!problem) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Context Badge */}
      <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
        {problem.context}
      </div>

      {/* Problem Text */}
      <div className="bg-surface-50 rounded-xl p-4 border-l-4 border-primary">
        <Text type="p" className="text-lg leading-relaxed text-surface-800">
          {problem.text}
        </Text>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4">
        <Text type="p" className="text-lg font-medium text-surface-800">
          <span className="text-primary">Question:</span> {problem.question}
        </Text>
      </div>

      {/* Problem Metadata */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="inline-flex items-center px-2 py-1 bg-surface-100 text-surface-600 rounded-md text-xs">
          {problem.operation}
        </span>
        <span className="inline-flex items-center px-2 py-1 bg-surface-100 text-surface-600 rounded-md text-xs">
          {problem.difficulty}
        </span>
        <span className="inline-flex items-center px-2 py-1 bg-surface-100 text-surface-600 rounded-md text-xs">
          Numbers: {problem.minNumber}-{problem.maxNumber}
        </span>
      </div>
    </motion.div>
  );
};

export default WordProblemDisplay;
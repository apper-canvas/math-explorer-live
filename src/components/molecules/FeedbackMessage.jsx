import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackIcon from '@/components/atoms/FeedbackIcon';
import Text from '@/components/atoms/Text';

const FeedbackMessage = ({ isCorrect, message, show, type = 'quiz' }) => {
  const getColorClasses = () => {
    if (type === 'story') {
      return isCorrect 
        ? 'bg-reading-primary/10 text-reading-primary border border-reading-primary/20'
        : 'bg-reading-accent/10 text-reading-accent border border-reading-accent/20';
    }
    return isCorrect
      ? 'bg-success/10 text-success border border-success/20'
      : 'bg-error/10 text-error border border-error/20';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`inline-flex items-center space-x-2 px-4 py-3 rounded-xl ${getColorClasses()}`}
        >
          <FeedbackIcon isCorrect={isCorrect} />
          <Text type="span" className="font-medium">
            {message}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackMessage;
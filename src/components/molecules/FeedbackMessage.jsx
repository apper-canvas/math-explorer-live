import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackIcon from '@/components/atoms/FeedbackIcon';
import Text from '@/components/atoms/Text';

const FeedbackMessage = ({ isCorrect, message, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isCorrect
              ? 'bg-success/10 text-success'
              : 'bg-error/10 text-error'
          }`}
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
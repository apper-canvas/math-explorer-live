import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function VisualAid({ type, operand1, operand2, answer, showAnswer = false }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setAnimationComplete(false);
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, [operand1, operand2]);

  const renderMultiplicationArray = () => {
    const rows = operand1;
    const cols = operand2;
    const dots = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push(
          <motion.div
            key={`dot-${row}-${col}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: (row * cols + col) * 0.05,
              duration: 0.2,
              ease: "easeOut"
            }}
            className={`w-4 h-4 rounded-full ${
              showAnswer ? 'bg-success' : 'bg-accent'
            } transition-colors duration-300`}
          />
        );
      }
    }

    return (
      <div 
        className="grid gap-2 justify-center"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          maxWidth: cols * 24 + (cols - 1) * 8
        }}
      >
        {dots}
      </div>
    );
  };

  const renderDivisionGroups = () => {
    const totalItems = operand1;
    const groups = operand2;
    const itemsPerGroup = Math.floor(totalItems / groups);
    const remainder = totalItems % groups;
    
    const groupElements = [];

    for (let group = 0; group < groups; group++) {
      const itemsInThisGroup = itemsPerGroup + (group < remainder ? 1 : 0);
      const groupDots = [];

      for (let item = 0; item < itemsInThisGroup; item++) {
        groupDots.push(
          <motion.div
            key={`group-${group}-item-${item}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: (group * itemsPerGroup + item) * 0.05,
              duration: 0.2,
              ease: "easeOut"
            }}
            className={`w-3 h-3 rounded-full ${
              showAnswer ? 'bg-success' : 'bg-secondary'
            } transition-colors duration-300`}
          />
        );
      }

      groupElements.push(
        <motion.div
          key={`group-${group}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: group * 0.1, duration: 0.3 }}
          className="bg-surface-50 border-2 border-dashed border-surface-300 rounded-lg p-3 min-h-[80px]"
        >
          <div className="text-xs text-surface-500 mb-2 text-center">
            Group {group + 1}
          </div>
          <div className="grid grid-cols-3 gap-1 justify-items-center">
            {groupDots}
          </div>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-2 text-sm font-medium text-secondary"
            >
              {itemsInThisGroup} items
            </motion.div>
          )}
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {groupElements}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-surface-800">
          {type === 'multiplication' ? 'Array Visualization' : 'Division Groups'}
        </h3>
        <div className="text-sm text-surface-500">
          {type === 'multiplication' 
            ? `${operand1} rows × ${operand2} columns`
            : `${operand1} items ÷ ${operand2} groups`
          }
        </div>
      </div>

      <div className="min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${type}-${operand1}-${operand2}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {type === 'multiplication' ? renderMultiplicationArray() : renderDivisionGroups()}
          </motion.div>
        </AnimatePresence>
      </div>

      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-4 p-3 rounded-lg text-center ${
            type === 'multiplication' 
              ? 'bg-accent/10 text-accent' 
              : 'bg-secondary/10 text-secondary'
          }`}
        >
          <div className="font-medium">
            {type === 'multiplication' 
              ? `Total dots: ${answer}`
              : `Each group has: ${answer} items`
            }
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VisualAid;
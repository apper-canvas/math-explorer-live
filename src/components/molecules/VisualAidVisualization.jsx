import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircleDot from '@/components/atoms/CircleDot';
import Text from '@/components/atoms/Text';

const VisualAidVisualization = ({ type, operand1, operand2, answer, showAnswer = false }) => {
  useEffect(() => {
    // No state to manage here, only props
  }, [operand1, operand2, type]);

  const renderMultiplicationArray = () => {
    const rows = operand1;
    const cols = operand2;
    const dots = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push(
          <CircleDot
            key={`dot-${row}-${col}`}
            delay={(row * cols + col) * 0.05}
            colorClass={showAnswer ? 'bg-success' : 'bg-accent'}
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
          <CircleDot
            key={`group-${group}-item-${item}`}
            delay={(group * itemsPerGroup + item) * 0.05}
            colorClass={showAnswer ? 'bg-success' : 'bg-secondary'}
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
          <Text type="div" className="text-xs text-surface-500 mb-2 text-center">
            Group {group + 1}
          </Text>
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
  );
};

export default VisualAidVisualization;
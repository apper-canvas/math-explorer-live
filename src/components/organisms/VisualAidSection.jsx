import React from 'react';
import { motion } from 'framer-motion';
import VisualAidToggle from '@/components/molecules/VisualAidToggle';
import VisualAidVisualization from '@/components/molecules/VisualAidVisualization';
import MultiplicationGrid from '@/components/molecules/MultiplicationGrid';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const VisualAidSection = ({ 
  type, 
  currentProblem, 
  showVisualAid, 
  setShowVisualAid, 
  showFeedback, 
  isCorrect, 
  maxGridSize,
  visualAidColorClass = 'secondary'
}) => {
  const isMultiplication = type === 'multiplication';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <VisualAidToggle 
        showVisualAid={showVisualAid} 
        onToggle={() => setShowVisualAid(!showVisualAid)} 
        toggleColorClass={visualAidColorClass}
      />

      {showVisualAid && currentProblem && (
        <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Text type="h3" className="font-semibold text-surface-800">
              {isMultiplication ? 'Array Visualization' : 'Division Groups'}
            </Text>
            <Text type="div" className="text-sm text-surface-500">
              {isMultiplication 
                ? `${currentProblem.operand1} rows × ${currentProblem.operand2} columns`
                : `${currentProblem.operand1} items ÷ ${currentProblem.operand2} groups`
              }
            </Text>
          </div>
          <VisualAidVisualization 
            type={type}
            operand1={currentProblem.operand1}
            operand2={currentProblem.operand2}
            answer={currentProblem.answer}
            showAnswer={showFeedback && isCorrect}
          />
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-4 p-3 rounded-lg text-center ${
                isMultiplication 
                  ? 'bg-accent/10 text-accent' 
                  : 'bg-secondary/10 text-secondary'
              }`}
            >
              <Text type="div" className="font-medium">
                {isMultiplication 
                  ? `Total dots: ${currentProblem.answer}`
                  : `Each group has: ${currentProblem.answer} items`
                }
              </Text>
            </motion.div>
          )}
        </div>
      )}

      {isMultiplication ? (
        <MultiplicationGrid 
          highlight={currentProblem ? [currentProblem.operand1, currentProblem.operand2] : null}
          maxSize={maxGridSize}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
          <Text type="h3" className="font-semibold text-surface-800 mb-4">Division Facts</Text>
          <div className="space-y-3 text-sm text-surface-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <Text type="span">Division is sharing equally into groups</Text>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <Text type="span">The answer tells us how many in each group</Text>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <Text type="span">Division is the opposite of multiplication</Text>
            </div>
            {currentProblem && (
              <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                <Text type="span" className="font-medium text-secondary">
                  {currentProblem.operand1} items shared into {currentProblem.operand2} groups
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VisualAidSection;
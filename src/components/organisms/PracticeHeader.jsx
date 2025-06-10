import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import DifficultySelector from '@/components/molecules/DifficultySelector';
import StatValue from '@/components/atoms/StatValue';
import Text from '@/components/atoms/Text';

const PracticeHeader = ({ 
  title, 
  subtitle, 
  iconName, 
  iconColorClass, 
  difficulties, 
  currentDifficulty, 
  onSelectDifficulty, 
  sessionStats 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-br from-${iconColorClass} to-${iconColorClass}/80 rounded-xl flex items-center justify-center`}>
              <ApperIcon name={iconName} className="w-6 h-6 text-white" />
            </div>
            <div>
              <Text type="h1" className="text-2xl font-display text-surface-800">{title}</Text>
              <Text type="p" className="text-surface-600">{subtitle}</Text>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <DifficultySelector
              difficulties={difficulties}
              currentDifficulty={currentDifficulty}
              onSelectDifficulty={onSelectDifficulty}
/>

            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <StatValue value={sessionStats?.correct || 0} colorClass={`text-${iconColorClass}`} />
                <Text type="div" className="text-surface-500">Correct</Text>
              </div>
              <div className="text-center">
                <StatValue value={sessionStats?.total || 0} colorClass="text-surface-600" />
                <Text type="div" className="text-surface-500">Total</Text>
              </div>
              <div className="text-center">
                <StatValue value={sessionStats?.streak || 0} colorClass="text-warning" />
                <Text type="div" className="text-surface-500">Streak</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PracticeHeader;
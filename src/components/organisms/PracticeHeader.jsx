import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import DifficultySelector from '@/components/molecules/DifficultySelector';
import StatValue from '@/components/atoms/StatValue';
import Text from '@/components/atoms/Text';

const StoryHeader = ({ 
  title, 
  subtitle, 
  iconName, 
  iconColorClass = 'reading-primary', 
  readingLevel,
  onLevelChange,
  storyStats,
  showDifficulty = false,
  difficulties, 
  currentDifficulty, 
  onSelectDifficulty
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
            {showDifficulty && (
              <DifficultySelector
                difficulties={difficulties}
                currentDifficulty={currentDifficulty}
                onSelectDifficulty={onSelectDifficulty}
              />
            )}

<div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <StatValue value={storyStats?.storiesRead || 0} colorClass={`text-${iconColorClass}`} />
                <Text type="div" className="text-surface-500">Stories Read</Text>
              </div>
              <div className="text-center">
                <StatValue value={storyStats?.quizScore || 0} colorClass="text-surface-600" />
                <Text type="div" className="text-surface-500">Quiz Score</Text>
              </div>
              <div className="text-center">
                <StatValue value={storyStats?.readingStreak || 0} colorClass="text-warning" />
                <Text type="div" className="text-surface-500">Reading Streak</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Keep PracticeHeader as alias for backward compatibility
const PracticeHeader = StoryHeader;

export default StoryHeader;
export { PracticeHeader };
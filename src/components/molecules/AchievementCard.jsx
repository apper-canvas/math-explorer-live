import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const AchievementCard = ({ title, description, icon, color, earned }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
        earned
          ? `bg-${color}/10 border border-${color}/20`
          : 'bg-surface-50 border border-surface-200'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        earned
          ? `bg-${color} text-white`
          : 'bg-surface-200 text-surface-400'
      }`}>
        <ApperIcon name={icon} className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <Text type="h3" className={`font-semibold ${
          earned ? 'text-surface-800' : 'text-surface-500'
        }`}>
          {title}
        </Text>
        <Text type="p" className={`text-sm ${
          earned ? 'text-surface-600' : 'text-surface-400'
        }`}>
          {description}
        </Text>
      </div>
      {earned && (
        <ApperIcon name="CheckCircle" className={`w-5 h-5 text-${color}`} />
      )}
    </div>
  );
};

export default AchievementCard;
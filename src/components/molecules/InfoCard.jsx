import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const InfoCard = ({ title, tips, icon, iconBgColor = 'info', bgColorFrom = 'info/10', bgColorTo = 'primary/10' }) => {
  return (
    <div className={`bg-gradient-to-r from-${bgColorFrom} to-${bgColorTo} rounded-2xl p-6`}>
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 bg-${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
          <ApperIcon name={icon} className="w-4 h-4 text-white" />
        </div>
        <div>
          <Text type="h4" className="font-semibold text-surface-800 mb-2">{title}</Text>
          <ul className="text-surface-600 space-y-1 text-sm">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const VisualAidToggle = ({ showVisualAid, onToggle, toggleColorClass = 'secondary' }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-4">
      <div className="flex items-center justify-between">
        <Text type="h3" className="font-semibold text-surface-800">Visual Aids</Text>
        <Button
          onClick={onToggle}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
            showVisualAid
              ? `bg-${toggleColorClass} text-white`
              : 'bg-surface-100 text-surface-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name={showVisualAid ? "Eye" : "EyeOff"} size={16} />
          <Text type="span" className="text-sm">{showVisualAid ? 'Hide' : 'Show'}</Text>
        </Button>
      </div>
    </div>
  );
};

export default VisualAidToggle;
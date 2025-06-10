import React from 'react';
import Button from '@/components/atoms/Button';

const DifficultySelector = ({ difficulties = {}, currentDifficulty, onSelectDifficulty }) => {
  return (
    <div className="flex space-x-2">
      {Object.entries(difficulties || {}).map(([key, diff]) => (
        <Button
          key={key}
          onClick={() => onSelectDifficulty(key)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            currentDifficulty === key
              ? `bg-${diff?.color || 'primary'} text-white shadow-md`
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {diff?.label || 'Unknown'}
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
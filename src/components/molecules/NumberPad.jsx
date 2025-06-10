import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const NumberPad = ({ onInput, disabled = false }) => {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['clear', '0', 'backspace']
  ];

  const getButtonStyle = (value) => {
    if (value === 'clear') return 'bg-error/10 text-error hover:bg-error/20';
    if (value === 'backspace') return 'bg-warning/10 text-warning hover:bg-warning/20';
    return 'bg-surface-100 text-surface-700 hover:bg-surface-200';
  };

  const getButtonLabel = (value) => {
    if (value === 'clear') return 'Clear';
    if (value === 'backspace') return <ApperIcon name="Delete" size={20} />;
    return value;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
      <Text type="h3" className="font-semibold text-surface-800 mb-4 text-center">Number Pad</Text>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {numbers.flat().map((value) => (
          <Button
            key={value}
            onClick={() => onInput(value)}
            disabled={disabled}
            className={`h-12 rounded-xl font-medium ${getButtonStyle(value)}`}
          >
            {getButtonLabel(value)}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => onInput('enter')}
        disabled={disabled}
        className="w-full h-12 bg-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Check Answer
      </Button>
    </div>
  );
};

export default NumberPad;
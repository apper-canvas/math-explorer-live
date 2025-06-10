import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

function NumberPad({ onInput, disabled = false }) {
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
      <h3 className="font-semibold text-surface-800 mb-4 text-center">Number Pad</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {numbers.flat().map((value, index) => (
          <motion.button
            key={value}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={() => !disabled && onInput(value)}
            disabled={disabled}
            className={`h-12 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyle(value)}`}
          >
            {getButtonLabel(value)}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={() => !disabled && onInput('enter')}
        disabled={disabled}
        className="w-full h-12 bg-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Check Answer
      </motion.button>
    </div>
  );
}

export default NumberPad;
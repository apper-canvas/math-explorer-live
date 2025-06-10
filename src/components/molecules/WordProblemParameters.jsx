import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import DifficultySelector from '@/components/molecules/DifficultySelector';

const WordProblemParameters = ({ parameters, setParameters, onGenerate, currentConfig }) => {
  const operations = [
    { value: 'addition', label: 'Addition', icon: 'Plus', color: 'success' },
    { value: 'subtraction', label: 'Subtraction', icon: 'Minus', color: 'warning' },
    { value: 'multiplication', label: 'Multiplication', icon: 'X', color: 'accent' },
    { value: 'division', label: 'Division', icon: 'Divide', color: 'secondary' }
  ];

  const contexts = [
    { value: 'shopping', label: 'Shopping & Money', icon: 'ShoppingCart' },
    { value: 'food', label: 'Food & Cooking', icon: 'Apple' },
    { value: 'sports', label: 'Sports & Games', icon: 'Trophy' },
    { value: 'school', label: 'School & Learning', icon: 'GraduationCap' },
    { value: 'animals', label: 'Animals & Nature', icon: 'TreePine' },
    { value: 'travel', label: 'Travel & Transport', icon: 'Plane' }
  ];

  const difficulties = {
    easy: { label: 'Easy', range: [1, 10], color: 'success' },
    medium: { label: 'Medium', range: [1, 50], color: 'warning' },
    hard: { label: 'Hard', range: [1, 100], color: 'error' }
  };

  const updateParameter = (key, value) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const updateNumberRange = (min, max) => {
    setParameters(prev => ({ 
      ...prev, 
      minNumber: min, 
      maxNumber: max 
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm border border-surface-200 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <Text type="h2" className="text-2xl font-heading text-surface-800 mb-2">
          Customize Your Word Problems
        </Text>
        <Text type="p" className="text-surface-600">
          Choose your preferences to generate personalized math problems
        </Text>
      </div>

      <div className="space-y-6">
        {/* Operation Selection */}
        <div>
          <Text type="h3" className="text-lg font-medium text-surface-800 mb-3">
            Mathematical Operation
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {operations.map((op) => (
              <motion.button
                key={op.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateParameter('operation', op.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  parameters.operation === op.value
                    ? `border-${op.color} bg-${op.color}/10`
                    : 'border-surface-200 bg-white hover:border-surface-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-${op.color}/10 text-${op.color} flex items-center justify-center mx-auto mb-2`}>
                  <i className={`fas fa-${op.icon === 'Plus' ? 'plus' : op.icon === 'Minus' ? 'minus' : op.icon === 'X' ? 'times' : 'divide'} text-sm`}></i>
                </div>
                <Text type="p" className="text-sm font-medium text-surface-800">
                  {op.label}
                </Text>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Context Selection */}
        <div>
          <Text type="h3" className="text-lg font-medium text-surface-800 mb-3">
            Problem Context
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {contexts.map((context) => (
              <motion.button
                key={context.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateParameter('context', context.value)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  parameters.context === context.value
                    ? 'border-primary bg-primary/10'
                    : 'border-surface-200 bg-white hover:border-surface-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas fa-${context.icon === 'ShoppingCart' ? 'shopping-cart' : context.icon === 'Apple' ? 'apple-alt' : 'star'} text-xs`}></i>
                  </div>
                  <Text type="p" className="text-sm font-medium text-surface-800">
                    {context.label}
                  </Text>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <Text type="h3" className="text-lg font-medium text-surface-800 mb-3">
            Difficulty Level
          </Text>
          <DifficultySelector
            difficulties={difficulties}
            currentDifficulty={parameters.difficulty}
            onSelectDifficulty={(difficulty) => {
              updateParameter('difficulty', difficulty);
              const range = difficulties[difficulty].range;
              updateNumberRange(range[0], range[1]);
            }}
          />
        </div>

        {/* Number Range */}
        <div>
          <Text type="h3" className="text-lg font-medium text-surface-800 mb-3">
            Number Range
          </Text>
          <div className="bg-surface-50 rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-surface-600 mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  value={parameters.minNumber}
                  onChange={(e) => updateParameter('minNumber', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  min="1"
                  max="999"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-surface-600 mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  value={parameters.maxNumber}
                  onChange={(e) => updateParameter('maxNumber', parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  min={parameters.minNumber}
                  max="999"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button
            onClick={onGenerate}
            className={`w-full bg-${currentConfig.color} hover:bg-${currentConfig.color}/90 text-white py-4 text-lg font-medium`}
          >
            Generate Word Problem
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WordProblemParameters;
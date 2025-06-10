import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import CircleDot from '@/components/atoms/CircleDot';

const WordProblemVisualAid = ({ problem, showAnswer, colorClass = 'primary' }) => {
  if (!problem) return null;

  const renderVisualElements = () => {
    const { visualData, operation } = problem;
    
    if (!visualData) return null;

    switch (operation) {
      case 'addition':
        return renderAdditionVisual(visualData);
      case 'subtraction':
        return renderSubtractionVisual(visualData);
      case 'multiplication':
        return renderMultiplicationVisual(visualData);
      case 'division':
        return renderDivisionVisual(visualData);
      default:
        return null;
    }
  };

  const renderAdditionVisual = (data) => {
    const group1Items = Array(data.operand1).fill(0);
    const group2Items = Array(data.operand2).fill(0);
    
    return (
      <div className="space-y-4">
        <Text type="p" className="text-sm text-surface-600 text-center">
          Visual representation of {data.operand1} + {data.operand2}
        </Text>
        
        <div className="space-y-3">
          {/* First group */}
          <div className="bg-success/10 rounded-lg p-3">
            <Text type="p" className="text-sm font-medium text-success mb-2">
              First group: {data.operand1} items
            </Text>
            <div className="flex flex-wrap gap-2">
              {group1Items.map((_, index) => (
                <motion.div
                  key={`group1-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CircleDot size="md" color="success" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Plus sign */}
          <div className="text-center">
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-plus text-sm"></i>
            </div>
          </div>

          {/* Second group */}
          <div className="bg-accent/10 rounded-lg p-3">
            <Text type="p" className="text-sm font-medium text-accent mb-2">
              Second group: {data.operand2} items
            </Text>
            <div className="flex flex-wrap gap-2">
              {group2Items.map((_, index) => (
                <motion.div
                  key={`group2-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (data.operand1 + index) * 0.1 }}
                >
                  <CircleDot size="md" color="accent" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/10 rounded-lg p-3"
            >
              <Text type="p" className="text-sm font-medium text-primary mb-2">
                Total: {data.answer} items
              </Text>
              <div className="flex flex-wrap gap-2">
                {Array(data.answer).fill(0).map((_, index) => (
                  <CircleDot 
                    key={`total-${index}`} 
                    size="md" 
                    color={index < data.operand1 ? 'success' : 'accent'} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderSubtractionVisual = (data) => {
    const totalItems = Array(data.operand1).fill(0);
    const removedCount = data.operand2;
    
    return (
      <div className="space-y-4">
        <Text type="p" className="text-sm text-surface-600 text-center">
          Visual representation of {data.operand1} - {data.operand2}
        </Text>
        
        <div className="space-y-3">
          {/* Starting group */}
          <div className="bg-primary/10 rounded-lg p-3">
            <Text type="p" className="text-sm font-medium text-primary mb-2">
              Starting with: {data.operand1} items
            </Text>
            <div className="flex flex-wrap gap-2">
              {totalItems.map((_, index) => (
                <motion.div
                  key={`start-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CircleDot 
                    size="md" 
                    color={index >= (data.operand1 - removedCount) ? 'error' : 'primary'} 
                    className={index >= (data.operand1 - removedCount) ? 'opacity-50' : ''}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Minus sign */}
          <div className="text-center">
            <div className="w-8 h-8 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-minus text-sm"></i>
            </div>
          </div>

          {/* Removed items */}
          <div className="bg-error/10 rounded-lg p-3">
            <Text type="p" className="text-sm font-medium text-error mb-2">
              Removing: {data.operand2} items
            </Text>
            <div className="flex flex-wrap gap-2">
              {Array(removedCount).fill(0).map((_, index) => (
                <motion.div
                  key={`removed-${index}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: 0.5, opacity: 0.3 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <CircleDot size="md" color="error" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-success/10 rounded-lg p-3"
            >
              <Text type="p" className="text-sm font-medium text-success mb-2">
                Remaining: {data.answer} items
              </Text>
              <div className="flex flex-wrap gap-2">
                {Array(data.answer).fill(0).map((_, index) => (
                  <CircleDot key={`remaining-${index}`} size="md" color="success" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderMultiplicationVisual = (data) => {
    const rows = data.operand1;
    const cols = data.operand2;
    
    return (
      <div className="space-y-4">
        <Text type="p" className="text-sm text-surface-600 text-center">
          Visual representation of {data.operand1} × {data.operand2}
        </Text>
        
        <div className="bg-accent/10 rounded-lg p-4">
          <Text type="p" className="text-sm font-medium text-accent mb-3">
            {rows} rows of {cols} items each
          </Text>
          
          <div className="space-y-2">
            {Array(rows).fill(0).map((_, rowIndex) => (
              <motion.div
                key={`row-${rowIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.2 }}
                className="flex gap-2"
              >
                {Array(cols).fill(0).map((_, colIndex) => (
                  <motion.div
                    key={`cell-${rowIndex}-${colIndex}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (rowIndex * cols + colIndex) * 0.05 }}
                  >
                    <CircleDot size="md" color="accent" />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
          
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 pt-3 border-t border-accent/20"
            >
              <Text type="p" className="text-sm font-medium text-accent">
                Total: {data.answer} items
              </Text>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderDivisionVisual = (data) => {
    const totalItems = data.operand1;
    const groups = data.operand2;
    const itemsPerGroup = data.answer;
    
    return (
      <div className="space-y-4">
        <Text type="p" className="text-sm text-surface-600 text-center">
          Visual representation of {data.operand1} ÷ {data.operand2}
        </Text>
        
        <div className="space-y-3">
          {/* Total items */}
          <div className="bg-secondary/10 rounded-lg p-3">
            <Text type="p" className="text-sm font-medium text-secondary mb-2">
              Starting with: {totalItems} items
            </Text>
            <div className="flex flex-wrap gap-2">
              {Array(totalItems).fill(0).map((_, index) => (
                <motion.div
                  key={`total-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CircleDot size="md" color="secondary" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Division sign */}
          <div className="text-center">
            <div className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-divide text-sm"></i>
            </div>
          </div>

          {/* Groups */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Text type="p" className="text-sm font-medium text-secondary mb-2">
                Divided into {groups} equal groups of {itemsPerGroup} each:
              </Text>
              
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(groups, 4)}, 1fr)` }}>
                {Array(groups).fill(0).map((_, groupIndex) => (
                  <motion.div
                    key={`group-${groupIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: groupIndex * 0.2 + 0.5 }}
                    className="bg-white rounded-lg p-2 border border-secondary/20"
                  >
                    <Text type="p" className="text-xs text-secondary mb-1">
                      Group {groupIndex + 1}
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      {Array(itemsPerGroup).fill(0).map((_, itemIndex) => (
                        <CircleDot 
                          key={`group-${groupIndex}-item-${itemIndex}`} 
                          size="sm" 
                          color="secondary" 
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderVisualElements()}
      
      {/* Problem context illustration */}
      <div className="bg-surface-50 rounded-lg p-3 border-l-4 border-primary">
        <Text type="p" className="text-xs text-surface-600">
          {problem.visualDescription}
        </Text>
      </div>
    </div>
  );
};

export default WordProblemVisualAid;
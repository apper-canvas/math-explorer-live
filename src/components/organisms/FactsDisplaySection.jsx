import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import FactPill from '@/components/atoms/FactPill';
import Text from '@/components/atoms/Text';

const FactsDisplaySection = ({ masteredFacts, masteredCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
      <Text type="h3" className="font-semibold text-surface-800 mb-4">Mastered Facts</Text>
      {masteredCount > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {masteredFacts.slice(0, 9).map((fact, index) => (
            <FactPill key={index}>{fact}</FactPill>
          ))}
          {masteredCount > 9 && (
            <div className="bg-surface-100 text-surface-600 text-center py-2 rounded-lg text-sm">
              +{masteredCount - 9} more
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-surface-500">
          <ApperIcon name="Target" className="w-8 h-8 mx-auto mb-2 text-surface-300" />
          <Text type="p">Keep practicing to master your first facts!</Text>
        </div>
      )}
    </div>
  );
};

export default FactsDisplaySection;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Text from '@/components/atoms/Text';

const ProblemStatement = ({ operand1, operand2, operator, problemId, problemNumber }) => {
    return (
        <AnimatePresence mode="wait">
            {operand1 && operand2 && operator && (
<motion.div
                    key={problemId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Problem Number Badge */}
                    {problemNumber && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex justify-center mb-6"
                        >
                            <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-full shadow-lg">
                                <Text type="span" className="text-sm font-medium">
                                    Problem #{problemNumber}
                                </Text>
                            </div>
                        </motion.div>
                    )}
                    
                    <Text type="div" className="text-6xl font-display text-surface-800 mb-4">
                        {operand1} {operator} {operand2}
                    </Text>
                    <Text type="div" className="text-4xl font-display text-surface-400 mb-6">=</Text>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProblemStatement;
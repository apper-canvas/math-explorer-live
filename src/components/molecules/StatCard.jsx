import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import StatValue from '@/components/atoms/StatValue';

const StatCard = ({ label, value, icon, color, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                    <ApperIcon name={icon} className={`w-5 h-5 text-${color}`} />
                </div>
                <div className="text-right">
                    <StatValue value={value} colorClass="text-surface-800" className="text-2xl" />
                </div>
            </div>
            <Text type="h3" className="font-semibold text-surface-800 mb-1">{label}</Text>
            <Text type="p" className="text-sm text-surface-600">{description}</Text>
        </motion.div>
    );
};

export default StatCard;
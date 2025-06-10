import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const Loader = ({ iconName, message, iconColorClass = 'primary', bgColorFrom = 'primary/5', bgColorVia = 'white', bgColorTo = 'info/5' }) => {
    return (
        <div className={`min-h-full bg-gradient-to-br from-${bgColorFrom} via-${bgColorVia} to-${bgColorTo} flex items-center justify-center`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
            >
                <div className={`w-16 h-16 bg-${iconColorClass} rounded-full flex items-center justify-center mb-4 animate-bounce`}>
                    <ApperIcon name={iconName} className="w-8 h-8 text-white" />
                </div>
                <p className="text-surface-600">{message}</p>
            </motion.div>
        </div>
    );
};

export default Loader;
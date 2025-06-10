import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const FeedbackIcon = ({ isCorrect, className = '', ...props }) => {
    return (
        <ApperIcon 
            name={isCorrect ? "CheckCircle" : "XCircle"} 
            className={`w-5 h-5 ${className}`} 
            {...props} 
        />
    );
};

export default FeedbackIcon;
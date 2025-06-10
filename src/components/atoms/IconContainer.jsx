import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const IconContainer = ({ iconName, iconClassName = '', containerClassName = '', colorClass, children, ...props }) => {
    return (
        <div className={`w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center ${containerClassName}`} {...props}>
            {iconName && <ApperIcon name={iconName} className={`w-6 h-6 text-white ${iconClassName}`} />}
            {children}
        </div>
    );
};

export default IconContainer;
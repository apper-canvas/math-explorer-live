import React from 'react';

const StatValue = ({ value, colorClass = 'text-surface-800', className = '' }) => {
    return (
        <div className={`font-display text-lg ${colorClass} ${className}`}>
            {value}
        </div>
    );
};

export default StatValue;
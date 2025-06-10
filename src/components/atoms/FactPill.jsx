import React from 'react';

const FactPill = ({ children, className = '' }) => {
  return (
    <div className={`bg-success/10 text-success text-center py-2 rounded-lg text-sm font-medium ${className}`}>
      {children}
    </div>
  );
};

export default FactPill;
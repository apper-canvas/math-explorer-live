import React, { useState } from 'react';
import Text from '@/components/atoms/Text';

const ColorPicker = ({ label, value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const predefinedColors = [
    '#5B4CDB', '#FF6B6B', '#4ECDC4', '#51CF66', '#FFD93D', '#339AF0',
    '#94a3b8', '#475569', '#1e293b', '#0f172a', '#f1f5f9', '#e2e8f0'
  ];

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <Text type="label" className="text-sm font-medium text-surface-700 mb-2 block">
          {label}
        </Text>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center space-x-3 p-3 bg-white border border-surface-300 rounded-lg hover:border-surface-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          aria-label={`Select color: ${value}`}
        >
          <div 
            className="w-6 h-6 rounded-full border border-surface-300 flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <Text type="span" className="text-surface-700 flex-1 text-left">
            {value}
          </Text>
          <svg 
            className={`w-4 h-4 text-surface-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-surface-300 rounded-lg shadow-lg p-3">
            <div className="grid grid-cols-6 gap-2 mb-3">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                    value === color ? 'border-primary' : 'border-surface-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            
            <div className="border-t border-surface-200 pt-3">
              <Text type="label" className="text-xs text-surface-600 mb-2 block">
                Custom Color
              </Text>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-full h-8 border border-surface-300 rounded cursor-pointer"
                aria-label="Custom color picker"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
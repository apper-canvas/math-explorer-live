import React from 'react';
import { motion } from 'framer-motion';

const Text = ({ 
  type = 'p', 
  children, 
  className = '', 
  animate = false, 
  initial = {}, 
  animation = {}, 
  transition = {},
  size = 'base',
  weight = 'normal',
  ...props 
}) => {
    const Tag = type;
    
    const sizeClasses = {
      'xs': 'text-xs',
      'sm': 'text-sm', 
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      'story': 'text-lg leading-relaxed'
    };
    
    const weightClasses = {
      'light': 'font-light',
      'normal': 'font-normal',
      'medium': 'font-medium',
      'semibold': 'font-semibold',
      'bold': 'font-bold'
    };
    
    const commonClasses = `font-sans text-surface-600 ${sizeClasses[size]} ${weightClasses[weight]}`;

    const textContent = (
        <Tag className={`${commonClasses} ${className}`} {...props}>
            {children}
        </Tag>
    );

    if (animate) {
        return (
            <motion.div initial={initial} animate={animation} transition={transition}>
                {textContent}
            </motion.div>
        );
    }

    return textContent;
};

export default Text;
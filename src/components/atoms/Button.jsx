import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  onClick, 
  children, 
  className = '', 
  disabled = false, 
  variant = 'primary',
  size = 'md',
  whileHover = { scale: 1.05 }, 
  whileTap = { scale: 0.95 }, 
  ...props 
}) => {
    const variants = {
      primary: 'bg-reading-primary hover:bg-reading-primary/90 text-white',
      secondary: 'bg-reading-secondary hover:bg-reading-secondary/90 text-white',
      choice: 'bg-white hover:bg-reading-primary/5 text-reading-primary border-2 border-reading-primary/20 hover:border-reading-primary',
      outline: 'border-2 border-reading-primary text-reading-primary hover:bg-reading-primary hover:text-white',
      ghost: 'text-reading-primary hover:bg-reading-primary/10'
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
      choice: 'px-6 py-4 text-left min-h-[60px]'
    };
    
    // Filter out non-DOM props before passing to the button element
    const filteredProps = { ...props };
    delete filteredProps.whileHover;
    delete filteredProps.whileTap;
    delete filteredProps.variant;
    delete filteredProps.size;
return (
        <motion.button
            whileHover={disabled ? {} : whileHover}
            whileTap={disabled ? {} : whileTap}
            onClick={onClick}
            disabled={disabled}
            className={`transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium ${variants[variant]} ${sizes[size]} ${className}`}
            {...filteredProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className = '', disabled = false, whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...props }) => {
    // Filter out non-DOM props before passing to the button element
    const filteredProps = { ...props };
    delete filteredProps.whileHover;
    delete filteredProps.whileTap;

    return (
        <motion.button
            whileHover={disabled ? {} : whileHover}
            whileTap={disabled ? {} : whileTap}
            onClick={onClick}
            disabled={disabled}
            className={`transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...filteredProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;
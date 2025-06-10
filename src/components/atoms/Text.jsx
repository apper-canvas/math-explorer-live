import React from 'react';
import { motion } from 'framer-motion';

const Text = ({ type = 'p', children, className = '', animate = false, initial = {}, animation = {}, transition = {}, ...props }) => {
    const Tag = type;
    const commonClasses = 'font-sans text-surface-600'; // Default styles for text, adjust as needed

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
import React from 'react';

const AnswerInput = ({ value, onChange, onKeyPress, placeholder = '?', disabled = false, isCorrect, showFeedback, className = '', ...props }) => {
    const feedbackClasses = showFeedback
        ? (isCorrect ? 'border-success bg-success/10 text-success' : 'border-error bg-error/10 text-error')
        : 'border-surface-300 focus:border-primary focus:outline-none'; // Default to primary focus color

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-32 h-16 text-4xl font-display text-center border-2 rounded-xl transition-all ${feedbackClasses} ${className}`}
            {...props}
        />
    );
};

export default AnswerInput;
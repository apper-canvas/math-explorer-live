import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const ModuleCard = ({ id, title, description, icon, bgGradient, path }) => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      key={id}
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.15 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="cursor-pointer group"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-surface-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className={`h-24 bg-gradient-to-r ${bgGradient} flex items-center justify-center`}>
          <ApperIcon 
            name={icon} 
            className="w-12 h-12 text-white drop-shadow-sm" 
          />
        </div>
        
        <div className="p-6">
          <Text type="h3" className="text-2xl font-semibold text-surface-800 mb-3 group-hover:text-primary transition-colors">
            {title}
          </Text>
          <Text type="p" className="text-surface-600 leading-relaxed mb-4">
            {description}
          </Text>
          
          <div className="flex items-center text-primary font-medium">
            <Text type="span">Start Learning</Text>
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
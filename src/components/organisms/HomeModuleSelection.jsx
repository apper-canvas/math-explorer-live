import React from 'react';
import { motion } from 'framer-motion';
import ModuleCard from '@/components/molecules/ModuleCard';

const HomeModuleSelection = ({ modules }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-6 mb-8"
    >
      {modules.map((module) => (
        <ModuleCard key={module.id} {...module} />
))}
    </motion.div>
  );
};

export default HomeModuleSelection;
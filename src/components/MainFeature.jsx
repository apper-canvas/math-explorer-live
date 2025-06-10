import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from './ApperIcon';

function MainFeature() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-surface-200 p-8"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Calculator" className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-display text-surface-800 mb-4">
          Ready to Practice Math?
        </h2>
        
        <p className="text-surface-600 mb-8 max-w-md mx-auto">
          Choose your learning adventure and master multiplication and division 
          with visual aids and interactive exercises.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/multiplication')}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <ApperIcon name="X" size={20} />
            <span>Multiplication</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/division')}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-secondary to-secondary/80 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <ApperIcon name="Divide" size={20} />
            <span>Division</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default MainFeature;
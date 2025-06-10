import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="Calculator" className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-6xl font-display text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-800 mb-4">Page Not Found</h2>
        <p className="text-surface-600 mb-8">
          Oops! It looks like this page got lost in a math problem. 
          Let's get you back to learning!
        </p>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Go Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-surface-100 text-surface-700 rounded-xl font-medium hover:bg-surface-200 transition-all"
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

function Home() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'multiplication',
      title: 'Multiplication',
      description: 'Master times tables with visual arrays and interactive grids',
      icon: 'X',
      color: 'accent',
      bgGradient: 'from-accent to-accent/80',
      path: '/multiplication'
    },
    {
      id: 'division',
      title: 'Division',
      description: 'Learn division through grouping and distribution',
      icon: 'Divide',
      color: 'secondary',
      bgGradient: 'from-secondary to-secondary/80',
      path: '/division'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
    <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">
            Welcome to Math Explorer
          </h1>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Master multiplication and division through visual learning and interactive practice. 
            Choose a module below to start your mathematical journey!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {modules.map((module) => (
            <motion.div
              key={module.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(module.path)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-surface-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`h-24 bg-gradient-to-r ${module.bgGradient} flex items-center justify-center`}>
                  <ApperIcon 
                    name={module.icon} 
                    className="w-12 h-12 text-white drop-shadow-sm" 
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-surface-800 mb-3 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-surface-600 leading-relaxed mb-4">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-medium">
                    <span>Start Learning</span>
                    <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-surface-800">Your Progress</h3>
            <button
              onClick={() => navigate('/progress')}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View Details
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-display text-accent mb-1">0</div>
              <div className="text-sm text-surface-600">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display text-secondary mb-1">0%</div>
              <div className="text-sm text-surface-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display text-success mb-1">0</div>
              <div className="text-sm text-surface-600">Facts Mastered</div>
            </div>
          </div>
        </motion.div>

        {/* Learning Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-info/10 to-primary/10 rounded-2xl p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <ApperIcon name="Lightbulb" className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-surface-800 mb-2">Learning Tips</h4>
              <ul className="text-surface-600 space-y-1 text-sm">
                <li>• Use the visual aids to understand how numbers work together</li>
                <li>• Practice a little bit each day for the best results</li>
                <li>• Don't worry about speed at first - focus on understanding</li>
                <li>• Celebrate your progress, no matter how small!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
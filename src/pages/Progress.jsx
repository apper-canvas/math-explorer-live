import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { progressService } from '../services';

function Progress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await progressService.getAll();
        setProgress(data[0] || {
          totalProblems: 0,
          accuracy: 0,
          masteredFacts: [],
          strugglingFacts: [],
          lastSession: new Date().toISOString()
        });
      } catch (err) {
        setError(err.message || 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-info/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
            <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
          </div>
          <p className="text-surface-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-info/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
          </div>
          <p className="text-error font-medium mb-2">Error loading progress</p>
          <p className="text-surface-600">{error}</p>
        </div>
      </div>
    );
  }

  const accuracyPercentage = progress.totalProblems > 0 ? Math.round(progress.accuracy * 100) : 0;
  const masteredCount = progress.masteredFacts?.length || 0;
  const strugglingCount = progress.strugglingFacts?.length || 0;

  const stats = [
    {
      label: 'Problems Solved',
      value: progress.totalProblems,
      icon: 'Target',
      color: 'primary',
      description: 'Total practice problems completed'
    },
    {
      label: 'Accuracy Rate',
      value: `${accuracyPercentage}%`,
      icon: 'TrendingUp',
      color: 'success',
      description: 'Percentage of correct answers'
    },
    {
      label: 'Facts Mastered',
      value: masteredCount,
      icon: 'Award',
      color: 'warning',
      description: 'Math facts you know well'
    },
    {
      label: 'Need Practice',
      value: strugglingCount,
      icon: 'BookOpen',
      color: 'info',
      description: 'Facts that need more work'
    }
  ];

  const achievements = [
    {
      id: 'first_problem',
      title: 'Getting Started',
      description: 'Solved your first problem',
      icon: 'Play',
      earned: progress.totalProblems > 0,
      color: 'primary'
    },
    {
      id: 'ten_problems',
      title: 'Practice Makes Perfect',
      description: 'Solved 10 problems',
      icon: 'Target',
      earned: progress.totalProblems >= 10,
      color: 'accent'
    },
    {
      id: 'high_accuracy',
      title: 'Sharp Shooter',
      description: 'Achieved 80% accuracy',
      icon: 'Zap',
      earned: accuracyPercentage >= 80,
      color: 'success'
    },
    {
      id: 'fact_master',
      title: 'Fact Master',
      description: 'Mastered 5 math facts',
      icon: 'Crown',
      earned: masteredCount >= 5,
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-info/5">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-display text-surface-800">Your Progress</h1>
                <p className="text-surface-600">Track your math learning journey</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display text-surface-800">{stat.value}</div>
                </div>
              </div>
              <h3 className="font-semibold text-surface-800 mb-1">{stat.label}</h3>
              <p className="text-sm text-surface-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
          >
            <h2 className="text-xl font-semibold text-surface-800 mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                    achievement.earned
                      ? `bg-${achievement.color}/10 border border-${achievement.color}/20`
                      : 'bg-surface-50 border border-surface-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.earned
                      ? `bg-${achievement.color} text-white`
                      : 'bg-surface-200 text-surface-400'
                  }`}>
                    <ApperIcon name={achievement.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-surface-800' : 'text-surface-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-surface-600' : 'text-surface-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <ApperIcon name="CheckCircle" className={`w-5 h-5 text-${achievement.color}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Learning Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Mastered Facts */}
            <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
              <h3 className="font-semibold text-surface-800 mb-4">Mastered Facts</h3>
              {masteredCount > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {progress.masteredFacts.slice(0, 9).map((fact, index) => (
                    <div
                      key={index}
                      className="bg-success/10 text-success text-center py-2 rounded-lg text-sm font-medium"
                    >
                      {fact}
                    </div>
                  ))}
                  {masteredCount > 9 && (
                    <div className="bg-surface-100 text-surface-600 text-center py-2 rounded-lg text-sm">
                      +{masteredCount - 9} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-surface-500">
                  <ApperIcon name="Target" className="w-8 h-8 mx-auto mb-2 text-surface-300" />
                  <p>Keep practicing to master your first facts!</p>
                </div>
              )}
            </div>

            {/* Practice Suggestions */}
            <div className="bg-gradient-to-r from-info/10 to-primary/10 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <ApperIcon name="Lightbulb" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-surface-800 mb-2">Practice Tips</h4>
                  <ul className="text-surface-600 space-y-1 text-sm">
                    <li>• Practice a little bit each day for best results</li>
                    <li>• Use the visual aids to understand patterns</li>
                    <li>• Focus on facts you find challenging</li>
                    <li>• Celebrate every improvement, no matter how small!</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
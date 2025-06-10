import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { progressService } from '@/services';
import Loader from '@/components/atoms/Loader';
import ProgressHeader from '@/components/organisms/ProgressHeader';
import ProgressStatsDisplay from '@/components/organisms/ProgressStatsDisplay';
import AchievementsDisplay from '@/components/organisms/AchievementsDisplay';
import ProgressTipsSection from '@/components/organisms/ProgressTipsSection';
import Text from '@/components/atoms/Text';

function ProgressPage() {
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
      <Loader 
        iconName="TrendingUp" 
        message="Loading your progress..." 
        iconColorClass="primary" 
        bgColorFrom="primary/5" 
        bgColorVia="white" 
        bgColorTo="info/5" 
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-info/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
          </div>
          <Text type="p" className="text-error font-medium mb-2">Error loading progress</Text>
          <Text type="p" className="text-surface-600">{error}</Text>
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
        <ProgressHeader />
        <ProgressStatsDisplay stats={stats} />

        <div className="grid lg:grid-cols-2 gap-6">
          <AchievementsDisplay achievements={achievements} />
          <ProgressTipsSection 
            masteredFacts={progress.masteredFacts} 
            masteredCount={masteredCount} 
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
import React from 'react';
import { motion } from 'framer-motion';
import AchievementCard from '@/components/molecules/AchievementCard';
import Text from '@/components/atoms/Text';

const AchievementsDisplay = ({ achievements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6"
    >
      <Text type="h2" className="text-xl font-semibold text-surface-800 mb-6">Achievements</Text>
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsDisplay;
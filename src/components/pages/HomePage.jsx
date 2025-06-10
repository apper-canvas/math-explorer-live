import React from 'react';
import HomeHero from '@/components/organisms/HomeHero';
import HomeModuleSelection from '@/components/organisms/HomeModuleSelection';
import HomeProgressSummary from '@/components/organisms/HomeProgressSummary';
import HomeLearningTips from '@/components/organisms/HomeLearningTips';
function HomePage() {
  const storyCategories = [
    {
      id: 'adventures',
      title: 'Adventure Stories',
      description: 'Exciting tales of brave heroes and magical quests',
      icon: 'Compass',
      color: 'reading-primary',
      bgGradient: 'from-reading-primary to-reading-primary/80',
      path: '/stories?category=adventures',
      storyCount: 12
    },
    {
      id: 'fairy-tales',
      title: 'Fairy Tales',
      description: 'Classic stories with magical creatures and happy endings',
      icon: 'Sparkles',
      color: 'reading-secondary',
      bgGradient: 'from-reading-secondary to-reading-secondary/80',
      path: '/stories?category=fairy-tales',
      storyCount: 8
    },
    {
      id: 'mystery',
      title: 'Mystery Stories',
      description: 'Solve puzzles and uncover secrets in these thrilling tales',
      icon: 'Search',
      color: 'reading-accent',
      bgGradient: 'from-reading-accent to-reading-accent/80',
      path: '/stories?category=mystery',
      storyCount: 6
    },
    {
      id: 'friendship',
      title: 'Friendship Tales',
      description: 'Heartwarming stories about friendship and kindness',
      icon: 'Heart',
      color: 'success',
      bgGradient: 'from-success to-success/80',
      path: '/stories?category=friendship',
      storyCount: 10
    }
  ];

return (
    <div className="min-h-full bg-gradient-to-br from-reading-primary/20 via-reading-secondary/10 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <HomeHero />
        <HomeModuleSelection modules={storyCategories} />
        <HomeProgressSummary />
        <HomeLearningTips />
      </div>
    </div>
  );
}

export default HomePage;
import React from 'react';
import HomeHero from '@/components/organisms/HomeHero';
import HomeModuleSelection from '@/components/organisms/HomeModuleSelection';
import HomeProgressSummary from '@/components/organisms/HomeProgressSummary';
import HomeLearningTips from '@/components/organisms/HomeLearningTips';

function HomePage() {
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

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <HomeHero />
        <HomeModuleSelection modules={modules} />
        <HomeProgressSummary />
        <HomeLearningTips />
      </div>
    </div>
  );
}

export default HomePage;
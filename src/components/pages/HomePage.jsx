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
    },
    {
      id: "letter-recognition",
      title: "Letter Recognition",
      description: "Learn letter recognition, phonics, and reading fundamentals",
      icon: "Type",
      color: 'reading-primary',
      bgGradient: "from-reading-primary to-reading-secondary",
      path: "/letter-recognition"
    },
    {
      id: "sentence-building",
      title: "Sentence Building",
      description: "Construct sentences using phonics and sight words",
      icon: "Edit3",
      color: 'reading-secondary',
      bgGradient: "from-reading-secondary to-reading-accent",
      path: "/sentence-building"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-lightBlue/30 via-lightBlue/10 to-white">
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
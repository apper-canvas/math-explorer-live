import HomePage from '@/components/pages/HomePage';
import MultiplicationPage from '@/components/pages/MultiplicationPage';
import DivisionPage from '@/components/pages/DivisionPage';
import ProgressPage from '@/components/pages/ProgressPage';
import WordProblemsPage from '@/components/pages/WordProblemsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import LetterRecognitionPage from '@/components/pages/LetterRecognitionPage';
import SentenceBuildingPage from '@/components/pages/SentenceBuildingPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  multiplication: {
    id: 'multiplication',
    label: 'Multiplication',
    path: '/multiplication',
    icon: 'X',
    component: MultiplicationPage
  },
  division: {
    id: 'division',
    label: 'Division',
path: '/division',
    icon: 'Divide',
    component: DivisionPage
  },
  wordproblems: {
    id: 'wordproblems',
    label: 'Word Problems',
    path: '/word-problems',
    icon: 'BookOpen',
    component: WordProblemsPage
  },
  letterrecognition: {
    id: 'letterrecognition',
    label: 'Letter Recognition',
    path: '/letter-recognition',
    icon: 'Type',
    component: LetterRecognitionPage
  },
  sentencebuilding: {
    id: 'sentencebuilding',
    label: 'Sentence Building',
    path: '/sentence-building',
    icon: 'Edit3',
    component: SentenceBuildingPage
  },
  progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'TrendingUp',
    component: ProgressPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: SettingsPage
  }
};

export const routeArray = Object.values(routes);
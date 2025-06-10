import HomePage from '@/components/pages/HomePage';
import MultiplicationPage from '@/components/pages/MultiplicationPage';
import DivisionPage from '@/components/pages/DivisionPage';
import ProgressPage from '@/components/pages/ProgressPage';

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
  progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'TrendingUp',
component: ProgressPage
  }
};

export const routeArray = Object.values(routes);
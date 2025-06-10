import Home from '../pages/Home';
import Multiplication from '../pages/Multiplication';
import Division from '../pages/Division';
import Progress from '../pages/Progress';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  multiplication: {
    id: 'multiplication',
    label: 'Multiplication',
    path: '/multiplication',
    icon: 'X',
    component: Multiplication
  },
  division: {
    id: 'division',
    label: 'Division',
    path: '/division',
    icon: 'Divide',
    component: Division
  },
  progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'TrendingUp',
    component: Progress
  }
};

export const routeArray = Object.values(routes);
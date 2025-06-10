import HomePage from '@/components/pages/HomePage';
import StoriesPage from '@/components/pages/StoriesPage';
import StoryPlayerPage from '@/components/pages/StoryPlayerPage';
import LibraryPage from '@/components/pages/LibraryPage';
import ReadingProgressPage from '@/components/pages/ReadingProgressPage';
import ProfilePage from '@/components/pages/ProfilePage';
import SettingsPage from '@/components/pages/SettingsPage';
import QuizPage from '@/components/pages/QuizPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  stories: {
    id: 'stories',
    label: 'Stories',
    path: '/stories',
    icon: 'Book',
    component: StoriesPage
  },
  library: {
    id: 'library',
    label: 'Library',
    path: '/library',
    icon: 'Library',
    component: LibraryPage
  },
  'story-player': {
    id: 'story-player',
    label: 'Story Player',
    path: '/story/:storyId',
    icon: 'Play',
    component: StoryPlayerPage,
    hideFromNav: true
  },
  quiz: {
    id: 'quiz',
    label: 'Quiz',
    path: '/quiz/:storyId',
    icon: 'HelpCircle',
    component: QuizPage,
    hideFromNav: true
  },
  progress: {
    id: 'progress',
    label: 'Reading Progress',
    path: '/progress',
    icon: 'TrendingUp',
    component: ReadingProgressPage
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: ProfilePage
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
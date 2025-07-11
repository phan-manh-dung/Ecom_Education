import BlogPage from '../pages/BlogPage/BlogPage';
import HomePage from '../pages/HomePage/HomePage';
import LearningPathPage from '../pages/LearningPathPage/LearningPathPage';

export interface RouteConfig {
  path: string;
  page: React.ComponentType;
  isShowHeader: boolean;
  isShowFooter: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true
  },
  {
    path: '/blog',
    page: BlogPage,
    isShowHeader: true,
    isShowFooter: true
  },
  {
    path: '/learning-path',
    page: LearningPathPage,
    isShowHeader: true,
    isShowFooter: true
  }
];

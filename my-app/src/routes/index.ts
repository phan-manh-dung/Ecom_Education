import LearningPathPage from '../pages/LearningPathPage/LearningPathPage';
import HomePage from '../pages/HomePage/HomePage';
import IndividualPage from '../pages/IndividualPage/IndividualPage';

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
    path: '/learning-path',
    page: LearningPathPage,
    isShowHeader: true,
    isShowFooter: true
  },
  {
    path: '/individual',
    page: IndividualPage,
    isShowHeader: true,
    isShowFooter: true
  }
];

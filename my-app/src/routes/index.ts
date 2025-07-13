import BlogPage from '../pages/BlogPage/BlogPage';
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
    path: '/blog',
    page: BlogPage,
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

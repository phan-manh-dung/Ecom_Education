import React from 'react';
import HeaderComponent from '../feature/HeaderComponent/HeaderComponent';
import FooterComponent from '../feature/FooterComponent/FooterComponent';

interface LayoutProps {
  children: React.ReactNode;
  showHeader: boolean;
  showFooter: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader, showFooter }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <HeaderComponent />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <FooterComponent />}
    </div>
  );
};

export default Layout; 
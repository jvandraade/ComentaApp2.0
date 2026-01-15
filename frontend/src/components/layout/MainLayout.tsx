import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

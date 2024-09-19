import { FC, ReactNode } from 'react';
import Headers from '../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Headers />
      {children}
    </>
  );
};

export default MainLayout;

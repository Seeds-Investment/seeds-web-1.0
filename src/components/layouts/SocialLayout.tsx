import type { ReactNode } from 'react';
import SocialHeader from './social/Header';
import Sidebar from './social/Sidebar';

interface SocialLayoutProps {
  children: ReactNode;
}

const SocialLayout: React.FC<SocialLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#F9F9F9] h-screen">
      <Sidebar />
      <div className="ml-[25vw] mr-[10vw] pt-6">
        <SocialHeader />
        {children}
      </div>
    </div>
  );
};

export default SocialLayout;

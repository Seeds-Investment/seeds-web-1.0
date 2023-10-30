import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import React from 'react';
import HeaderLogin from './HeaderLogin';
import SidebarLogin from './SidebarLogin';

interface props {
  children: any;
}

const LoginLayout: React.FC<props> = ({ children }) => {
  const width = useWindowInnerWidth();

  return (
    <div className="flex h-screen">
      <aside
        className={`w-1/5 h-screen py-6 social-sidebar ${
          width !== undefined ? (width >= 768 ? '' : 'hidden') : ''
        }`}
      >
        <SidebarLogin />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className={`bg-white border-b p-5 rounded-xl md:mx-14`}>
          <HeaderLogin />
        </header>

        <div className="flex-1 md:p-4 md:mx-11">{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;

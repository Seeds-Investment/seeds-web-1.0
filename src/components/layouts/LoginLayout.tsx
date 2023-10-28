import React from 'react';
import HeaderLogin from './HeaderLogin';
import SidebarLogin from './SidebarLogin';

interface props {
  children: any;
}

const LoginLayout: React.FC<props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F9F9F9]">
      <aside className="w-1/6 py-6 social-header bg-white">
        <SidebarLogin />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex bg-white border-b p-5 rounded-xl justify-end mx-14">
          <HeaderLogin />
        </header>

        <main className="flex-1 p-4 mx-11">{children}</main>
      </div>
    </div>
  );
};

export default LoginLayout;

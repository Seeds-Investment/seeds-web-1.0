// components/HamburgerButton.tsx
import React from 'react';

const HamburgerButton = ({open,onClick}:{open:boolean,onClick:()=>void}):React.ReactElement => {

  return (
    <button
      onClick={onClick}
      className="relative md:hidden w-5 h-4 flex flex-col justify-between items-center group"
      aria-label="Toggle menu"
    >
      <span
        className={`block h-0.5 w-5 bg-white transform transition duration-300 ease-in-out origin-left ${
          open ? 'rotate-45' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-white transform transition duration-300 ease-in-out origin-left ${
          open ? '-rotate-45' : ''
        }`}
      />
    </button>
  );
};

export default HamburgerButton;

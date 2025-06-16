import React from 'react';

const RadialButton = ({
  element,
  className,
  onClick
}: {
  onClick?: () => void;
  className?: string;
  element: React.ReactElement | string;
}): React.ReactElement => {
  return (
    <button
      className={`bg-radial from-black from-40% to-[#3AC4A0] border border-[#3AC4A0] px-2 py-1 md:px-4 md:py-2 rounded-full active:scale-95 transition-all ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {element}
    </button>
  );
};

export default RadialButton;

import type { ReactNode } from 'react';

interface PageGradientProps {
  children: ReactNode;
  className?: string;
  style?: object;
  defaultGradient?: boolean;
  customGradient?: JSX.Element;
  flexDirection?: 'row' | 'column';
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  padding?: string;
  background?: string;
}

const PageGradient: React.FC<PageGradientProps> = ({
  children,
  className,
  style,
  defaultGradient = false,
  customGradient,
  flexDirection = 'column',
  justifyContent = 'justify-end',
  alignItems = 'items-center',
  gap = '',
  padding = '',
  background = 'bg-[#F9F9F9]'
}) => {
  const defaultClasses = `z-0 relative overflow-hidden min-h-screen ${
    flexDirection === 'row' ? 'flex' : 'flex flex-col'
  } ${justifyContent} ${alignItems} ${gap} ${padding} ${background}`;

  return (
    <div className={className ?? defaultClasses} style={style}>
      {/* -----Default Gradient----- */}
      {defaultGradient && customGradient === undefined && (
        <>
          <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 sm:bg-[#4FE6AF] bg-transparent blur-[90px] rotate-45" />
          <span className="z-0 fixed bottom-0 left-0 w-24 h-24 sm:bg-[#4FE6AF] bg-transparent blur-[90px]" />
          <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 sm:bg-[#9A76FE] bg-transparent blur-[90px] rotate-45" />
          <span className="z-0 fixed top-64 -right-4 w-60 h-48 sm:bg-[#4FE6AF] bg-transparent blur-[90px] rotate-45 rounded-full" />
          <span className="z-0 fixed bottom-36 right-0 w-32 h-32 sm:bg-[#9A76FE] bg-transparent blur-[90px] rotate-90 rounded-full" />
        </>
      )}

      {/* -----Custom Gradient----- */}
      {!defaultGradient && customGradient !== undefined ? customGradient : null}

      {/* -----Page Content----- */}
      {children}
    </div>
  );
};

export default PageGradient;

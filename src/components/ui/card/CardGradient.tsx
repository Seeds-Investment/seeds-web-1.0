import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: object;
  defaultGradient?: boolean;
  customGradient?: JSX.Element;
  padding?: string;
}

const defaultStyle = {
  background:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(146.22deg, #FFFFFF 16.21%, rgba(255, 255, 255, 0) 97%)',
  border: '1px solid #FFFFFF'
};

const CardGradient: React.FC<CardProps> = ({
  children,
  className,
  style,
  defaultGradient = false,
  customGradient,
  padding = ''
}) => {
  const defaultClasses = `relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:h-[36rem] h-[44rem] ${padding} bg-white`;

  return (
    <div className={className ?? defaultClasses} style={style ?? defaultStyle}>
      {/* -----Default Gradient----- */}
      {defaultGradient && customGradient === undefined && (
        <>
          <span className="z-0 absolute -top-10 -left-10 lg:w-32 lg:h-32 md:w-24 md:h-24 md:bg-[#9A76FE] bg-transparent blur-[80px] rotate-45" />
          <span className="z-0 absolute sm:-bottom-24 sm:-left-24 -bottom-4 -left-4 lg:w-48 lg:h-48 w-32 h-32 bg-[#4FE6AF] lg:blur-[150px] blur-[90px] rotate-45 rounded-full" />
          <span className="z-0 absolute lg:-right-4 md:-right-20 md:top-44 top-28 -right-4 md:w-40 md:h-32 w-32 h-40 md:bg-[#4FE6AF] sm:bg-transparent bg-[#4FE6AF] blur-[125px] rotate-45 rounded-full" />
          <span className="z-0 absolute lg:top-48 lg:right-80 md:top-80 md:right-32 sm:-right-20 sm:top-40 top-36 right-28 lg:w-32 lg:h-40 md:w-24 md:h-24 sm:h-44 w-28 h-48 bg-[#4FE6AF] blur-[125px] sm:rotate-45 rotate-90 rounded-full" />
          <span className="z-0 absolute lg:bottom-24 lg:right-24 md:bottom-32 sm:-right-4 sm:bottom-36 bottom-72 right-0 lg:w-36 lg:h-36 md:w-32 md:h-32 w-24 h-24 bg-[#9A76FE] lg:blur-[80px] sm:blur-[90px] blur-[60px] rounded-full" />
        </>
      )}

      {/* -----Custom Gradient----- */}
      {!defaultGradient && customGradient !== undefined ? customGradient : null}

      {/* -----Card Content----- */}
      {children}
    </div>
  );
};

export default CardGradient;

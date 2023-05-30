interface PageGradientProps {
  children: JSX.Element;
  className?: string;
  style?: object;
  defaultGradient: boolean;
  customGradient?: JSX.Element;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  padding?: string;
  background?: string;
}

const PageGradient: React.FC<PageGradientProps> = props => {
  const defaultClasses = `z-0 relative overflow-hidden min-h-screen ${
    props.flexDirection === 'row'
      ? 'flex'
      : props.flexDirection === 'column'
      ? 'flex flex-col'
      : 'flex flex-col'
  } ${
    props.justifyContent !== undefined ? props.justifyContent : 'justify-end'
  } ${props.alignItems !== undefined ? props.alignItems : 'items-center'} ${
    props.gap !== undefined ? props.gap : ''
  } ${props.padding !== undefined ? props.padding : ''} ${
    props.background !== undefined ? props.background : 'bg-[#F9F9F9]'
  }`;

  return (
    <div className={props.className ?? defaultClasses} style={props.style}>
      {/* -----Default Gradient----- */}
      {props.defaultGradient && props.customGradient === undefined && (
        <>
          <span className="fixed bottom-10 -left-10 w-60 h-48 sm:bg-[#4FE6AF] bg-transparent blur-[90px] rotate-45" />
          <span className="fixed bottom-0 left-0 w-24 h-24 sm:bg-[#4FE6AF] bg-transparent blur-[90px]" />
          <span className="fixed -bottom-28 left-16 w-48 h-32 sm:bg-[#9A76FE] bg-transparent blur-[90px] rotate-45" />
          <span className="fixed top-64 -right-4 w-60 h-48 sm:bg-[#4FE6AF] bg-transparent blur-[90px] rotate-45 rounded-full" />
          <span className="fixed bottom-36 right-0 w-32 h-32 sm:bg-[#9A76FE] bg-transparent blur-[90px] rotate-90 rounded-full" />
        </>
      )}

      {/* -----Custom Gradient----- */}
      {!props.defaultGradient && props.customGradient !== undefined
        ? props.customGradient
        : null}

      {/* -----Page Content----- */}
      {props.children}
    </div>
  );
};

export default PageGradient;

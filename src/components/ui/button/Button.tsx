interface ButtonProps {
  label?: string;
  containerClasses?: string;
  typographyClasses?: string;
  width?: string;
  margin?: string;
  color?: 'light' | 'dark';
  className?: string;
  style?: object;
  props?: object;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Save',
  containerClasses = 'rounded-full py-3 px-6',
  typographyClasses = 'font-semibold leading-4 text-sm text-white',
  width = '',
  margin = '',
  color = 'light',
  className,
  style,
  ...props
}) => {
  const defaultButtonClasses = `${containerClasses} ${typographyClasses} ${width} ${margin} bg-seeds-${
    color === 'light' ? 'green' : 'button-green'
  } shadow-md shadow-seeds-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-seeds-green/40 focus:outline-seeds-button-green active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`;

  return (
    <button
      {...props.props}
      className={className ?? defaultButtonClasses}
      style={style}
      data-ripple-light="true"
    >
      {label}
    </button>
  );
};

export default Button;

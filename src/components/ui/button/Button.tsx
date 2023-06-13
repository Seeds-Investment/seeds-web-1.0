import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';

interface ButtonProps {
  label?: string;
  containerClasses?: string;
  typographyClasses?: string;
  extraClasses?: string;
  color?: 'light' | 'dark';
  className?: string;
  style?: object;
  props?: object;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Save',
  containerClasses = 'rounded-full py-3 px-6',
  typographyClasses = 'font-poppins font-semibold leading-4 text-white',
  extraClasses = '',
  color = 'light',
  className,
  style,
  ...props
}) => {
  const height = useWindowInnerHeight();

  const defaultButtonClasses = `${containerClasses} ${typographyClasses} ${extraClasses} bg-seeds-${
    color === 'light' ? 'green' : 'button-green'
  } ${
    height !== undefined && height < 760 ? 'text-xs' : 'text-sm'
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

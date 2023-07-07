import type { DefaultTFuncReturn } from 'i18next';

import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';

interface ButtonProps {
  label?: string | DefaultTFuncReturn;
  containerClasses?: string;
  typographyClasses?: string;
  extraClasses?: string;
  variant?: 'light' | 'dark' | 'outlined';
  className?: string;
  style?: object;
  props?: object;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Save',
  containerClasses = 'rounded-full py-3 px-6',
  typographyClasses = 'font-poppins font-semibold leading-4',
  extraClasses = '',
  variant = 'light',
  className,
  style,
  ...props
}) => {
  const height = useWindowInnerHeight();

  const defaultButtonClasses = `${containerClasses} ${typographyClasses} ${extraClasses} ${
    variant === 'light'
      ? 'bg-seeds-green text-white shadow-seeds-green/20 hover:shadow-seeds-green/40 focus:outline-seeds-button-green shadow-md hover:shadow-lg'
      : variant === 'dark'
      ? 'bg-seeds-button-green text-white shadow-seeds-green/20 hover:shadow-seeds-green/40 focus:outline-seeds-button-green shadow-md hover:shadow-lg'
      : 'bg-transparent text-warning-hard shadow-warning-hard/20 hover:shadow-warning-hard/40 focus:outline-warning-hard border border-warning-hard shadow-sm hover:shadow-md'
  } ${
    height !== undefined && height < 760 ? 'text-xs' : 'text-sm'
  } transition-all duration-300 active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`;

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

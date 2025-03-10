import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
}

export default function SeedsButton({
  href,
  onClick,
  onSubmit,
  children,
  className,
  bgColor = 'bg-seeds-button-green',
  textColor = 'text-white',
  width = 'w-full'
}: ButtonProps): JSX.Element {
  const baseStyles = clsx(
    'relative flex justify-center items-center px-6 py-2 rounded-full font-bold sm:text-lg text-sm transition-transform duration-300 transform hover:scale-[102%]',
    bgColor,
    textColor,
    width,
    className
  );

  if (typeof href === 'string' && href.trim() !== '') {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  if (onSubmit !== undefined) {
    return (
      <button type="submit" onClick={onSubmit} className={baseStyles}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
}

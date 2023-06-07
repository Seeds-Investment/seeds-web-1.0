import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface SubmenuButtonProps {
  startAdornment: StaticImageData;
  endAdornment: StaticImageData;
  alt?: string;
  label: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  className?: string;
  style?: object;
  onClick: () => void;
}

const animationClasses =
  'group-hover:translate-x-1 group-hover:transition group-hover:ease-in-out group-hover:duration-500 transition-all ml-auto';

const SubmenuButton: React.FC<SubmenuButtonProps> = ({
  startAdornment,
  endAdornment,
  alt = '',
  label,
  width = 'lg:w-1/2 md:w-2/3 sm:w-[80%] w-full',
  height = 'h-12',
  padding = 'py-4 px-6',
  margin = '',
  className,
  style,
  onClick
}) => {
  const buttonDefaultClasses = `z-10 group flex items-center ${width} ${height} ${padding} ${margin} text-sm text-neutral-500 hover:bg-gray-200 active:bg-gray-300 bg-white`;

  return (
    <button
      className={className ?? buttonDefaultClasses}
      style={style}
      onClick={onClick}
    >
      <Image src={startAdornment} alt={alt} className="mr-4" />
      {label}
      <Image src={endAdornment} alt={alt} className={animationClasses} />
    </button>
  );
};

export default SubmenuButton;

import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface SubmenuButtonProps {
  startAdornment: StaticImageData;
  endAdornment: StaticImageData;
  altStartAdornment?: string;
  altEndAdornment?: string;
  label?: string;
  extraClasses?: string;
  className?: string;
  style?: object;
  onClick: () => void;
}

const animationClasses =
  'group-hover:translate-x-1 group-hover:transition group-hover:ease-in-out group-hover:duration-500 transition-all ml-auto';

const SubmenuButton: React.FC<SubmenuButtonProps> = ({
  startAdornment,
  endAdornment,
  altStartAdornment = '',
  altEndAdornment = '',
  label = 'Submenu',
  extraClasses = 'lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 px-6',
  className,
  style,
  onClick
}) => {
  const defaultButtonClasses = `z-10 group flex items-center text-sm text-neutral-medium hover:bg-gray-200 active:bg-gray-300 bg-white ${extraClasses}`;

  return (
    <button
      className={className ?? defaultButtonClasses}
      style={style}
      onClick={onClick}
    >
      <Image src={startAdornment} alt={altStartAdornment} className="mr-4" />
      <span className="font-poppins">{label}</span>
      <Image
        src={endAdornment}
        alt={altEndAdornment}
        className={animationClasses}
      />
    </button>
  );
};

export default SubmenuButton;

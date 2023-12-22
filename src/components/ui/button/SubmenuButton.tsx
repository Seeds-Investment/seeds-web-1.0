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
  currencyLabel?: string;
}

const animationClasses =
  'group-hover:translate-x-1 group-hover:ease-in-out group-hover:duration-500 transition-all ml-auto';

const SubmenuButton: React.FC<SubmenuButtonProps> = ({
  startAdornment,
  endAdornment,
  altStartAdornment = '',
  altEndAdornment = '',
  label = 'Submenu',
  extraClasses = 'lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 px-6',
  className,
  style,
  onClick,
  currencyLabel
}) => {
  const defaultButtonClasses = `z-10 group flex items-center text-sm text-neutral-medium hover:bg-gray-200 active:bg-gray-300 rounded-md ${extraClasses}`;

  return (
    <button
      className={className ?? defaultButtonClasses}
      style={style}
      onClick={onClick}
    >
      <Image src={startAdornment} alt={altStartAdornment} className="mr-4" />
      <span className="font-poppins min-w-fit">{label}</span>
      {currencyLabel !== undefined && (
        <div className="flex justify-end w-full items-center pr-2">
          <span className="font-poppins text-[#BDBDBD]">{currencyLabel}</span>
        </div>
      )}
      <Image
        src={endAdornment}
        alt={altEndAdornment}
        className={animationClasses}
      />
    </button>
  );
};

export default SubmenuButton;

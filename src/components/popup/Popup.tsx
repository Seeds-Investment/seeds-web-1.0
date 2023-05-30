import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Email } from 'public/assets/images';

import Modal from '../ui/modal/Modal';

interface PopupProps {
  onClose: () => void;
  onClick: () => void;
  src?: StaticImageData;
  alt?: string;
  imageClasses?: string;
  titleClasses?: string;
  subtitleClasses?: string;
  buttonClasses?: string;
  title?: string;
  subtitle?: string;
  label?: string;
}

const Popup: React.FC<PopupProps> = ({
  onClose,
  onClick,
  src,
  alt,
  imageClasses,
  titleClasses,
  subtitleClasses,
  buttonClasses,
  title = 'Your Email : mar**i@gmail.com',
  subtitle = "We'll give you some information through email.",
  label = 'Change Email'
}) => {
  const imageDefaultClasses = 'mx-auto mb-6';

  const titleDefaultClasses = 'mb-1.5 font-semibold text-neutral-500';

  const subtitleDefaultClasses = 'mb-6 text-sm text-neutral-400';

  const buttonDefaultClasses =
    'w-full h-10 text-white bg-[#3AC4A0] hover:bg-[#3AC4A0]/[0.8] active:bg-[#3AC4A0] rounded-full';

  return (
    <Modal onClose={onClose}>
      <Image
        src={src ?? Email}
        alt={alt ?? 'email'}
        className={imageClasses ?? imageDefaultClasses}
      />
      <p className={titleClasses ?? titleDefaultClasses}>{title}</p>
      <p className={subtitleClasses ?? subtitleDefaultClasses}>{subtitle}</p>
      <button
        className={buttonClasses ?? buttonDefaultClasses}
        onClick={onClick}
      >
        {label}
      </button>
    </Modal>
  );
};

export default Popup;

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Email, XIcon } from 'public/assets/vector';

import Button from '../Button';
import Modal from '../ui/modal/Modal';

interface PopupProps {
  onClose: () => void;
  onClick: () => void;
  src?: StaticImageData;
  alt?: string;
  imageClasses?: string;
  titleClasses?: string;
  subtitleClasses?: string;
  title?: string;
  subtitle?: string;
  label?: string;
}

const imageDefaultClasses = 'mx-auto mb-6';

const titleDefaultClasses = 'mb-1.5 font-semibold text-neutral-500';

const subtitleDefaultClasses = 'mb-6 text-sm text-neutral-400';

const Popup: React.FC<PopupProps> = ({
  onClose,
  onClick,
  src,
  alt,
  imageClasses,
  titleClasses,
  subtitleClasses,
  title = 'Your Email : mar**i@gmail.com',
  subtitle = "We'll give you some information through email.",
  label = 'Change Email'
}) => {
  return (
    <Modal onClose={onClose}>
      <button
        className="absolute top-2 right-2 flex items-center justify-center rounded-full p-2 transition-colors duration-300 hover:bg-gray-300 active:bg-gray-400"
        data-ripple-dark="true"
        onClick={onClose}
      >
        <Image src={XIcon} alt="close" />
      </button>
      <Image
        src={src ?? Email}
        alt={alt ?? 'email'}
        className={imageClasses ?? imageDefaultClasses}
      />
      <p className={titleClasses ?? titleDefaultClasses}>{title}</p>
      <p className={subtitleClasses ?? subtitleDefaultClasses}>{subtitle}</p>
      <Button label={label} width="w-full" color="dark" props={{ onClick }} />
    </Modal>
  );
};

export default Popup;

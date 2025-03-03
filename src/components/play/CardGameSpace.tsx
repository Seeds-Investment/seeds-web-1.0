import Image from 'next/image';
import Link from 'next/link';

export interface GameSpaceI {
  name: string;
  image: string;
  link: string;
}

interface CardGameProps {
  data: GameSpaceI;
  maxWidth?: string; // Menentukan batas maksimal ukuran card, opsional
}

const CardGameSpace = ({
  data: { name, image, link },
  maxWidth = 'w-full'
}: CardGameProps): JSX.Element => {
  return (
    <Link href={link} className="group">
      <div
        className={`cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105  ${maxWidth}`}
      >
        <div className="relative w-full max-w-[180px] aspect-square">
          {' '}
          {/* Ukuran gambar fleksibel */}
          <Image
            alt={name}
            src={image}
            layout="fill" // Menjadikan gambar fleksibel sesuai container
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-[14px] sm:text-[16px] xl:text-[18px] font-semibold text-gray-800 font-poppins text-center mt-2">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CardGameSpace;

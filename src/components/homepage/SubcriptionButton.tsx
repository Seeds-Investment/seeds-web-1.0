import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import SeedsIcon from '../../assets/homepage/backrounds/icon-subcriptions-1.png';
import TagVector from '../../assets/homepage/backrounds/tag-vector.png';
import SubcriptionVector from '../../assets/homepage/backrounds/vektor-1.png';
import CButton from '../CButton';

interface SubcriptionButtonProps {
  onClick?: () => void;
  classname?: string;
  href: string;
  promoText: string;
  title: string;
  description: string;
}

export const SubcriptionButton: React.FC<SubcriptionButtonProps> = ({
  classname,
  onClick,
  href,
  promoText,
  title,
  description
}) => {
  return (
    <Link href={href} passHref>
      <div className="relative">
        {/* Tag Vector di pojok kanan atas */}
        <div className="bg-red-200 relative">
          <div className="absolute w-[200px] h-auto z-10 -right-[18px] top-0">
            {/* Image sebagai patokan posisi */}
            <Image src={TagVector} alt={'#'} className="w-full h-auto" />

            {/* Text di dalam div yang mengikuti ukuran Image */}
            <div className="absolute top-0 left-0 h-full gap-2 pb-4 text-white w-full flex items-center justify-center">
              <Typography className="font-extrabold sm:text-lg text-[16px]">
                {promoText}
              </Typography>
              <HiMiniCheckBadge size={24} />
            </div>
          </div>
        </div>

        <CButton
          onClick={onClick ?? (() => {})}
          className={`${
            classname ??
            'w-full min-h-[8rem] bg-gradient-to-r from-[#7555DA] to-[#6643d8] relative rounded-2xl overflow-hidden px-4 py-4'
          }`}
        >
          {/* Background Vector (akan tersembunyi jika overflow) */}
          <Image
            src={SubcriptionVector}
            alt={'#'}
            objectFit="cover"
            className="absolute left-0  2xl:w-[25%] xl:w-[40%]  lg:w-[60%] w-[70%] z-0"
          />

          <div className="relative flex flex-col justify-start items-start h-full w-full">
            <div className="flex flex-row justify-between ">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <Image src={SeedsIcon} alt={'#'} className="w-[60px]" />
              </div>
            </div>
            <div className="flex flex-row justify-between items-end w-full ">
              <div className="flex flex-col items-start justify-start text-start">
                <Typography className="font-bold xl:text-xl sm:text-lg text-sm">
                  {title}
                </Typography>
                <Typography className="font-medium sm:text-sm text-[11px] ">
                  {description}
                </Typography>
              </div>
              <div className="flex flex-col justify-end items-end h-full">
                <IoArrowForwardCircleOutline size={40} />
              </div>
            </div>
          </div>
        </CButton>
      </div>
    </Link>
  );
};

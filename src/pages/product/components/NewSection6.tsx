import AppStore from '@/assets/product/AppStore.svg';
import GooglePlay from '@/assets/product/GooglePlay.svg';
import MockiPhone from '@/assets/product/MockiPhone.png';
import StarRating from '@/assets/product/StarRating.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

const NewSection6: React.FC = () => {
  return (
    <section className="flex justify-center items-center m-20">
      <div className="flex flex-col gap-10">
        <Typography className="font-semibold font-poppins text-[64px] text-[#262626] leading-[64px]">
          <span className="bg-clip-text text-transparent bg-gradient-to-tr to-[#7555DA] from-[#4FE6AF]">
            Download Now!
          </span>
          <br />
          Start Your Investing Journey
        </Typography>
        <Typography className="font-normal font-poppins text-2xl text-[#262626] w-[693px]">
          Expand your connection, learn about finance and grow your portfolio
          together with Seeds.
        </Typography>
        <div className="flex gap-8">
          <Link
            target="blank"
            href={
              'https://apps.apple.com/id/app/seeds-investing-together/id6443659980'
            }
          >
            <Image src={AppStore} alt="AppStore" />
          </Link>
          <Link
            target="blank"
            href={
              'https://play.google.com/store/apps/details?id=com.seeds.investment'
            }
          >
            <Image src={GooglePlay} alt="GooglePlay" />
          </Link>
        </div>
        <div className="flex gap-[38px]">
          <div className="flex gap-5">
            <Typography className="font-semibold font-poppins text-5xl text-[#201B1C]">
              4.9
            </Typography>
            <div>
              <Image src={StarRating} alt="StarRating" />
              <Typography className="font-normal font-poppins text-base text-[#262626]">
                250+ reviews
              </Typography>
            </div>
          </div>
          <div className="flex gap-5">
            <Typography className="font-semibold font-poppins text-5xl text-[#201B1C]">
              5.0
            </Typography>
            <div>
              <Image src={StarRating} alt="StarRating" />
              <Typography className="font-normal font-poppins text-base text-[#262626]">
                1000k+ reviews
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Image src={MockiPhone} alt="MockiPhone" />
    </section>
  );
};

export default NewSection6;

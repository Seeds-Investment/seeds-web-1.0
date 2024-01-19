import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography
} from '@material-tailwind/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IAuthBoading {
  className: string;
}

const AuthBoarding: React.FC<IAuthBoading> = ({ className }: IAuthBoading) => {
  const { t } = useTranslation();
  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <Popover>
        <PopoverHandler>
          <Button className="font-semibold font-poppins text-base text-white bg-[#3AC4A0] rounded-full capitalize p-3.5 sm:px-24 sm:w-full w-full">
            {t('authBoarding.guest1')}
            <span className="lowercase">{t('authBoarding.guest2')}</span>
            {t('authBoarding.guest3')}
          </Button>
        </PopoverHandler>
        <PopoverContent className="font-normal font-poppins md:text-lg sm:text-base text-sm text-[#262626]">
          Sorry, under construction...
        </PopoverContent>
      </Popover>

      <Typography className="text-center font-normal font-poppins md:text-lg sm:text-base text-sm text-[#262626]">
        {t(`authBoarding.term`)}
        <br />
        <Link href={'/'} className="text-[#3AC4A0]">
          {t(`authBoarding.term2`)}
        </Link>
      </Typography>
      <div className="flex gap-4 justify-center">
        <Link href={'/auth2/login'}>
          <Button className="font-semibold font-poppins text-[#6750A3] text-sm bg-[#E0E0E091] rounded-full sm:w-[163.5px] w-[139.5px] capitalize">
            {t(`authBoarding.login`)}
          </Button>
        </Link>
        <Link href={'/auth2/register'}>
          <Button className="font-semibold font-poppins text-white text-sm bg-[#3AC4A0] rounded-full sm:w-[163.5px] w-[139.5px] capitalize">
            {t(`authBoarding.signup`).split(' ')[0]}{' '}
            <span className="lowercase">
              {t(`authBoarding.signup`).split(' ')?.[1]}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthBoarding;

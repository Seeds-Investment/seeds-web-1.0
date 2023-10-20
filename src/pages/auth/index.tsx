'use client';
import CButton from '@/components/CButton';
import AuthLayout from '@/components/layouts/AuthLayout';
import { OnBoardingType1 } from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const AuthIndex = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="px-8 pb-8 mt-4">
      <div className="flex flex-col justify-center">
        <Image
          className="md:shrink-10 mx-auto mb-5 w-auto h-auto object-contain object-[center_center]"
          quality={50}
          width={400}
          height={400}
          src={OnBoardingType1.src}
          alt={OnBoardingType1.alt}
        />
        <Typography variant="h4" color="black" className="text-center">
          {t('authPage.welcoming')}
        </Typography>
        <Typography variant="paragraph" className="text-center p-5">
          {t('authPage.description')}
        </Typography>
        <CButton fullWidth className="bg-[#7555DA] rounded-full p-4">
          {t('authPage.guest')}
        </CButton>
        <small className="text-center lg:mt-5 mt-2 text-black">
          {t('authPage.agreement')}
          <Link href={''} className="font-bold text-[#3AC4A0]">
            {t('authPage.tnC')}
          </Link>
        </small>
        <div className="flex justify-around gap-5 mt-5">
          <CButton
            onClick={() => {
              router.push('/connect/auth/login').catch(error => {
                console.log(error);
              });
            }}
            className="border bg-transparent w-1/2 text-[#3AC4A0] hover:bg-[#3AC4A0] hover:text-white border-[#3AC4A0] rounded-full"
          >
            {t('authPage.login')}
          </CButton>
          <CButton
            onClick={() => {
              router.push('/connect/auth/register').catch(error => {
                console.log(error);
              });
            }}
            className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0] w-1/2"
          >
            {t('authPage.register')}
          </CButton>
        </div>
      </div>
    </div>
  );
};

AuthIndex.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthIndex;
